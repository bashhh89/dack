import { execFile } from 'child_process'
import { promises as fs } from 'fs'
import path from 'path'
import { promisify } from 'util'
import { NextResponse } from 'next/server'

import {
  ensureJobDirs,
  fileExists,
  jobDir,
  listJobs,
  safeName,
  type ReportAutomationFile,
  type ReportAutomationJob,
  type ReportAutomationOutputFormat,
  writeJob,
} from '../../../../lib/report-automation-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const execFileAsync = promisify(execFile)

const fallbackConfirmationItems = [
  'Final contract dollar goals',
  'Final MWBE/SDVOB/LBE utilization percentages',
  'Worker-hour and demographic totals',
  'Payment verification totals',
  'Final exhibit list and sign-off owner',
]

function buildHermesPrompt(job: {
  client: string
  project: string
  period: string
  outputFormat: ReportAutomationOutputFormat
  reportPattern: string
}) {
  const formatText =
    job.outputFormat === 'both' ? 'both Word and PDF' : job.outputFormat === 'pdf' ? 'PDF' : 'Word'

  return `Hermes, rebuild this DACK report packet into a client-ready ${formatText} report. Use the ${job.reportPattern} structure and writing style. Client/project: ${job.client || job.project}. Reporting period: ${job.period}. Use only the uploaded source facts. Do not invent metrics, dates, names, percentages, or compliance claims. Mark missing items as Needs confirmation. Return the generated file${job.outputFormat === 'both' ? 's' : ''}.`
}

function getDackReportCommand() {
  const candidates = ['/root/.local/bin/dack-report', '/usr/local/bin/dack-report', 'dack-report']
  return candidates
}

async function saveIncomingFile(file: File, jobId: string, role: ReportAutomationFile['role']) {
  const bytes = Buffer.from(await file.arrayBuffer())
  const filename = safeName(file.name)
  const target = path.join(jobDir(jobId), 'sources', filename)
  await fs.writeFile(target, bytes)

  return {
    name: filename,
    size: bytes.byteLength,
    role,
    path: target,
  } satisfies ReportAutomationFile
}

async function writeHandoff(job: ReportAutomationJob) {
  const target = path.join(jobDir(job.id), 'outputs', 'Hermes_Report_Automation_Handoff.txt')
  const lines = [
    'DACK Report Automation Handoff',
    '',
    `Client: ${job.client || 'Needs confirmation'}`,
    `Project: ${job.project || 'Needs confirmation'}`,
    `Reporting Period: ${job.period || 'Needs confirmation'}`,
    `Prepared By: ${job.preparedBy}`,
    `Requested Output: ${job.outputFormat}`,
    '',
    'Prompt:',
    job.hermesPrompt,
    '',
    'Source Files:',
    ...job.sourceFiles.map((file) => `- ${file.name} (${file.role})`),
    '',
    'Needs Confirmation:',
    ...job.needsConfirmation.map((item) => `- ${item}`),
  ]

  await fs.writeFile(target, lines.join('\n'))

  return {
    name: path.basename(target),
    size: Buffer.byteLength(lines.join('\n')),
    role: 'handoff',
    path: target,
  } satisfies ReportAutomationFile
}

async function tryRunDackReport(job: ReportAutomationJob, roughReport: ReportAutomationFile | undefined) {
  if (!roughReport) {
    return {
      status: 'ready_for_hermes' as const,
      message: 'No rough report was uploaded. The job is ready for Hermes once source material is attached.',
      outputs: [] as ReportAutomationFile[],
    }
  }

  const availableCommand =
    (await Promise.all(
      getDackReportCommand().map(async (candidate) => ({
        candidate,
        exists: candidate.includes('/') ? await fileExists(candidate) : true,
      })),
    )).find((candidate) => candidate.exists)?.candidate

  if (!availableCommand) {
    return {
      status: 'ready_for_hermes' as const,
      message:
        'Report packet saved. The web container does not yet have the Hermes dack-report runner installed, so this job is ready for Hermes handoff.',
      outputs: [] as ReportAutomationFile[],
    }
  }

  const baseName = `${safeName(job.project || job.client || 'DACK_Report')}_${safeName(job.period || 'Reporting_Period')}`
  const outputDocx = path.join(jobDir(job.id), 'outputs', `${baseName}.docx`)
  const outputPdf = path.join(jobDir(job.id), 'outputs', `${baseName}.pdf`)
  const args = [
    '--source',
    roughReport.path,
    '--output',
    outputDocx,
    '--title',
    `${job.project || job.client || 'DACK'} Compliance Report`,
    '--client',
    job.client || job.project || 'DACK Consulting Solutions',
    '--period',
    job.period || 'Needs confirmation',
    '--prepared-by',
    job.preparedBy,
  ]

  if (job.outputFormat === 'pdf' || job.outputFormat === 'both') {
    args.push('--pdf-output', outputPdf)
  }

  try {
    await execFileAsync(availableCommand, args, { timeout: 120_000 })
    const outputs: ReportAutomationFile[] = []
    if (job.outputFormat === 'docx' || job.outputFormat === 'both') {
      const stat = await fs.stat(outputDocx)
      outputs.push({ name: path.basename(outputDocx), size: stat.size, role: 'generated-output', path: outputDocx })
    }
    if (job.outputFormat === 'pdf' || job.outputFormat === 'both') {
      const stat = await fs.stat(outputPdf)
      outputs.push({ name: path.basename(outputPdf), size: stat.size, role: 'generated-output', path: outputPdf })
    }

    return {
      status: 'completed' as const,
      message: 'Generated through the local Hermes dack-report runner.',
      outputs,
    }
  } catch (error) {
    return {
      status: 'failed' as const,
      message: error instanceof Error ? error.message : 'Unknown report generation failure.',
      outputs: [] as ReportAutomationFile[],
    }
  }
}

export async function GET() {
  return NextResponse.json({ jobs: await listJobs() })
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const now = new Date().toISOString()
  const jobId = `report-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  await ensureJobDirs(jobId)

  const outputFormat = (formData.get('outputFormat')?.toString() || 'both') as ReportAutomationOutputFormat
  const client = formData.get('client')?.toString() || ''
  const project = formData.get('project')?.toString() || ''
  const period = formData.get('period')?.toString() || ''
  const preparedBy = formData.get('preparedBy')?.toString() || 'DACK Consulting Solutions, Inc.'
  const reportPattern = formData.get('reportPattern')?.toString() || 'NYPA Q1 2026 MWBE/EEO/Labor report'

  const sourceFiles: ReportAutomationFile[] = []
  const roughReport = formData.get('roughReport')
  const referenceReport = formData.get('referenceReport')

  if (roughReport instanceof File && roughReport.size > 0) {
    sourceFiles.push(await saveIncomingFile(roughReport, jobId, 'rough-report'))
  }

  if (referenceReport instanceof File && referenceReport.size > 0) {
    sourceFiles.push(await saveIncomingFile(referenceReport, jobId, 'reference-report'))
  }

  for (const supportingFile of formData.getAll('supportingFiles')) {
    if (supportingFile instanceof File && supportingFile.size > 0) {
      sourceFiles.push(await saveIncomingFile(supportingFile, jobId, 'supporting-document'))
    }
  }

  const initialJob: ReportAutomationJob = {
    id: jobId,
    client,
    project,
    period,
    preparedBy,
    outputFormat,
    reportPattern,
    status: 'processing',
    createdAt: now,
    updatedAt: now,
    sourceFiles,
    outputFiles: [],
    needsConfirmation: fallbackConfirmationItems,
    runnerMessage: 'Report packet received.',
    hermesPrompt: buildHermesPrompt({ client, project, period, outputFormat, reportPattern }),
  }

  const result = await tryRunDackReport(
    initialJob,
    sourceFiles.find((file) => file.role === 'rough-report'),
  )

  const job: ReportAutomationJob = {
    ...initialJob,
    status: result.status,
    updatedAt: new Date().toISOString(),
    outputFiles: result.outputs,
    runnerMessage: result.message,
  }

  const handoff = await writeHandoff(job)
  job.outputFiles = [...job.outputFiles, handoff]
  await writeJob(job)

  return NextResponse.json({ job }, { status: 201 })
}
