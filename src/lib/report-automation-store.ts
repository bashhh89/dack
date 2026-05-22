import { promises as fs } from 'fs'
import path from 'path'

export type ReportAutomationOutputFormat = 'docx' | 'pdf' | 'both'
export type ReportAutomationStatus = 'ready_for_hermes' | 'processing' | 'completed' | 'failed'

export type ReportAutomationFile = {
  name: string
  size: number
  role: 'rough-report' | 'reference-report' | 'supporting-document' | 'generated-output' | 'handoff'
  path: string
}

export type ReportAutomationJob = {
  id: string
  client: string
  project: string
  period: string
  preparedBy: string
  outputFormat: ReportAutomationOutputFormat
  reportPattern: string
  status: ReportAutomationStatus
  createdAt: string
  updatedAt: string
  sourceFiles: ReportAutomationFile[]
  outputFiles: ReportAutomationFile[]
  needsConfirmation: string[]
  runnerMessage: string
  hermesPrompt: string
}

export const REPORT_AUTOMATION_ROOT =
  process.env.REPORT_AUTOMATION_DIR || '/tmp/dack-report-automation'

export function safeName(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]+/g, '_').replace(/^_+|_+$/g, '') || 'file'
}

export function jobDir(jobId: string) {
  return path.join(REPORT_AUTOMATION_ROOT, safeName(jobId))
}

export function manifestPath(jobId: string) {
  return path.join(jobDir(jobId), 'manifest.json')
}

export async function ensureJobDirs(jobId: string) {
  await fs.mkdir(path.join(jobDir(jobId), 'sources'), { recursive: true })
  await fs.mkdir(path.join(jobDir(jobId), 'outputs'), { recursive: true })
}

export async function writeJob(job: ReportAutomationJob) {
  await ensureJobDirs(job.id)
  await fs.writeFile(manifestPath(job.id), JSON.stringify(job, null, 2))
}

export async function readJob(jobId: string): Promise<ReportAutomationJob | null> {
  try {
    const raw = await fs.readFile(manifestPath(jobId), 'utf8')
    return JSON.parse(raw) as ReportAutomationJob
  } catch {
    return null
  }
}

export async function listJobs(): Promise<ReportAutomationJob[]> {
  try {
    const entries = await fs.readdir(REPORT_AUTOMATION_ROOT, { withFileTypes: true })
    const jobs = await Promise.all(
      entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => readJob(entry.name)),
    )

    return jobs
      .filter((job): job is ReportAutomationJob => Boolean(job))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  } catch {
    return []
  }
}

export async function fileExists(filePath: string) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}
