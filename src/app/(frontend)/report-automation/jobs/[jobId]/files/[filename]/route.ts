import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

import { readJob, safeName } from '../../../../../../../lib/report-automation-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const contentTypes: Record<string, string> = {
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ jobId: string; filename: string }> },
) {
  const { jobId, filename } = await params
  const job = await readJob(jobId)

  if (!job) {
    return NextResponse.json({ error: 'Report automation job not found.' }, { status: 404 })
  }

  const safeFilename = safeName(filename)
  const file = job.outputFiles.find((output) => output.name === safeFilename)

  if (!file) {
    return NextResponse.json({ error: 'Output file not found.' }, { status: 404 })
  }

  const bytes = await fs.readFile(file.path)
  const ext = path.extname(file.name).toLowerCase()

  return new Response(bytes, {
    headers: {
      'content-disposition': `attachment; filename="${file.name}"`,
      'content-type': contentTypes[ext] || 'application/octet-stream',
    },
  })
}
