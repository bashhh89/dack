'use client'

import Link from 'next/link'
import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  Clipboard,
  Download,
  FileText,
  Loader2,
  RefreshCw,
  UploadCloud,
} from 'lucide-react'

type OutputFormat = 'docx' | 'pdf' | 'both'
type JobStatus = 'ready_for_hermes' | 'processing' | 'completed' | 'failed'

type AutomationFile = {
  name: string
  size: number
  role: 'rough-report' | 'reference-report' | 'supporting-document' | 'generated-output' | 'handoff'
}

type AutomationJob = {
  id: string
  client: string
  project: string
  period: string
  preparedBy: string
  outputFormat: OutputFormat
  reportPattern: string
  status: JobStatus
  createdAt: string
  updatedAt: string
  sourceFiles: AutomationFile[]
  outputFiles: AutomationFile[]
  needsConfirmation: string[]
  runnerMessage: string
  hermesPrompt: string
}

function formatBytes(value: number) {
  if (value < 1024) return `${value} B`
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`
  return `${(value / 1024 / 1024).toFixed(1)} MB`
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function statusLabel(status: JobStatus) {
  if (status === 'completed') return 'Completed'
  if (status === 'failed') return 'Failed'
  if (status === 'processing') return 'Processing'
  return 'Ready for Hermes'
}

function FilePicker({
  id,
  label,
  hint,
  multiple,
  files,
  onChange,
}: {
  id: string
  label: string
  hint: string
  multiple?: boolean
  files: File[]
  onChange: (files: File[]) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Array.from(event.target.files || []))
  }

  return (
    <button className="report-file-picker" type="button" onClick={() => inputRef.current?.click()}>
      <input
        ref={inputRef}
        id={id}
        className="visually-hidden-input"
        type="file"
        multiple={multiple}
        onChange={handleInput}
      />
      <UploadCloud size={22} aria-hidden="true" />
      <strong>{label}</strong>
      <span>{files.length > 0 ? files.map((file) => file.name).join(', ') : hint}</span>
    </button>
  )
}

export default function ReportAutomationWorkspace({ initialJobs = [] }: { initialJobs?: AutomationJob[] }) {
  const [client, setClient] = useState('DACK Consulting Solutions')
  const [project, setProject] = useState('NYPA Headquarters Project')
  const [period, setPeriod] = useState('Q1 2026')
  const [preparedBy, setPreparedBy] = useState('DACK Consulting Solutions, Inc.')
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('both')
  const [reportPattern, setReportPattern] = useState('NYPA Q1 2026 MWBE/EEO/Labor report')
  const [roughReport, setRoughReport] = useState<File[]>([])
  const [referenceReport, setReferenceReport] = useState<File[]>([])
  const [supportingFiles, setSupportingFiles] = useState<File[]>([])
  const [jobs, setJobs] = useState<AutomationJob[]>(initialJobs)
  const [selectedJobId, setSelectedJobId] = useState<string>(initialJobs[0]?.id || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedPrompt, setCopiedPrompt] = useState(false)

  const selectedJob = useMemo(
    () => jobs.find((job) => job.id === selectedJobId) || jobs[0],
    [jobs, selectedJobId],
  )

  async function refreshJobs() {
    const response = await fetch('/report-automation/jobs', { cache: 'no-store' })
    const data = (await response.json()) as { jobs: AutomationJob[] }
    setJobs(data.jobs)
    if (!selectedJobId && data.jobs[0]) {
      setSelectedJobId(data.jobs[0].id)
    }
  }

  async function submitJob(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setCopiedPrompt(false)

    if (roughReport.length === 0) {
      setError('Attach a rough report before creating the job.')
      return
    }

    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('client', client)
      formData.append('project', project)
      formData.append('period', period)
      formData.append('preparedBy', preparedBy)
      formData.append('outputFormat', outputFormat)
      formData.append('reportPattern', reportPattern)
      formData.append('roughReport', roughReport[0])

      if (referenceReport[0]) {
        formData.append('referenceReport', referenceReport[0])
      }

      for (const file of supportingFiles) {
        formData.append('supportingFiles', file)
      }

      const response = await fetch('/report-automation/jobs', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Report automation job failed to save.')
      }

      const data = (await response.json()) as { job: AutomationJob }
      setJobs((current) => [data.job, ...current.filter((job) => job.id !== data.job.id)])
      setSelectedJobId(data.job.id)
      setRoughReport([])
      setReferenceReport([])
      setSupportingFiles([])
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unknown report automation error.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function copyPrompt() {
    if (!selectedJob) return
    await navigator.clipboard.writeText(selectedJob.hermesPrompt)
    setCopiedPrompt(true)
    window.setTimeout(() => setCopiedPrompt(false), 1600)
  }

  return (
    <main className="report-automation-page">
      <div className="report-automation-shell">
        <nav className="report-automation-nav" aria-label="Back to DACK command center">
          <Link href="/" className="back-link">
            <ArrowLeft size={16} aria-hidden="true" />
            DACK Command Center
          </Link>
          <Link href="/hermes-report-automation">Read Hermes brief</Link>
        </nav>

        <section className="report-automation-hero">
          <div>
            <span className="eyebrow">DACK Report Automation</span>
            <h1>Upload a report packet, create a generation job, and return Word/PDF outputs.</h1>
            <p>
              This workspace captures the source files, output format, Hermes handoff prompt, generated files, and
              Needs confirmation list for every Natalia-style DACK compliance report.
            </p>
          </div>
          <div className="report-hero-status">
            <Bot size={22} aria-hidden="true" />
            <strong>Hermes-ready intake</strong>
            <span>Word, PDF, or both</span>
          </div>
        </section>

        <div className="report-automation-layout">
          <form className="report-builder-panel" onSubmit={submitJob}>
            <div className="report-panel-header">
              <div>
                <span className="eyebrow">New job</span>
                <h2>Create report packet</h2>
              </div>
              <button className="toolbar-button" type="button" onClick={() => refreshJobs()}>
                <RefreshCw size={15} aria-hidden="true" />
                Refresh
              </button>
            </div>

            <div className="report-form-grid">
              <label>
                Client
                <input value={client} onChange={(event) => setClient(event.target.value)} />
              </label>
              <label>
                Project
                <input value={project} onChange={(event) => setProject(event.target.value)} />
              </label>
              <label>
                Reporting period
                <input value={period} onChange={(event) => setPeriod(event.target.value)} />
              </label>
              <label>
                Prepared by
                <input value={preparedBy} onChange={(event) => setPreparedBy(event.target.value)} />
              </label>
              <label>
                Report pattern
                <select value={reportPattern} onChange={(event) => setReportPattern(event.target.value)}>
                  <option>NYPA Q1 2026 MWBE/EEO/Labor report</option>
                  <option>DACK Year in Review compliance report</option>
                  <option>Quarterly outreach and utilization report</option>
                </select>
              </label>
              <label>
                Output
                <select value={outputFormat} onChange={(event) => setOutputFormat(event.target.value as OutputFormat)}>
                  <option value="both">Word and PDF</option>
                  <option value="docx">Word only</option>
                  <option value="pdf">PDF only</option>
                </select>
              </label>
            </div>

            <div className="report-file-grid">
              <FilePicker
                id="rough-report"
                label="Rough report"
                hint="Required source .docx, .pdf, or .txt"
                files={roughReport}
                onChange={(files) => setRoughReport(files.slice(0, 1))}
              />
              <FilePicker
                id="reference-report"
                label="Reference report"
                hint="Optional style benchmark"
                files={referenceReport}
                onChange={(files) => setReferenceReport(files.slice(0, 1))}
              />
              <FilePicker
                id="supporting-files"
                label="Supporting files"
                hint="Optional notes, PDFs, screenshots, spreadsheets"
                multiple
                files={supportingFiles}
                onChange={setSupportingFiles}
              />
            </div>

            {error && <div className="report-error">{error}</div>}

            <button className="report-submit-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 size={18} className="spin" aria-hidden="true" /> : <CheckCircle2 size={18} aria-hidden="true" />}
              {isSubmitting ? 'Creating job...' : 'Create report job'}
            </button>
          </form>

          <aside className="report-status-panel">
            <div className="report-panel-header">
              <div>
                <span className="eyebrow">Current job</span>
                <h2>{selectedJob ? statusLabel(selectedJob.status) : 'No jobs yet'}</h2>
              </div>
              {selectedJob && <span className={`report-status ${selectedJob.status}`}>{statusLabel(selectedJob.status)}</span>}
            </div>

            {selectedJob ? (
              <>
                <div className="job-summary">
                  <strong>{selectedJob.project || selectedJob.client || 'DACK report'}</strong>
                  <span>{selectedJob.period || 'Needs confirmation'} - {formatDate(selectedJob.createdAt)}</span>
                  <p>{selectedJob.runnerMessage}</p>
                </div>

                <div className="output-list">
                  <h3>Files</h3>
                  {selectedJob.outputFiles.map((file) => (
                    <a
                      className="output-file"
                      href={`/report-automation/jobs/${selectedJob.id}/files/${file.name}`}
                      key={`${selectedJob.id}-${file.name}`}
                    >
                      <FileText size={16} aria-hidden="true" />
                      <span>{file.name}</span>
                      <small>{formatBytes(file.size)}</small>
                      <Download size={15} aria-hidden="true" />
                    </a>
                  ))}
                </div>

                <div className="needs-confirmation-list">
                  <h3>Needs confirmation</h3>
                  {selectedJob.needsConfirmation.map((item) => (
                    <div key={item}>
                      <CheckCircle2 size={15} aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="handoff-prompt">
                  <div className="report-panel-header compact">
                    <h3>Hermes prompt</h3>
                    <button className="toolbar-button" type="button" onClick={copyPrompt}>
                      <Clipboard size={14} aria-hidden="true" />
                      {copiedPrompt ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p>{selectedJob.hermesPrompt}</p>
                </div>
              </>
            ) : (
              <div className="empty-report-state">
                <FileText size={36} aria-hidden="true" />
                <p>Create a report job to see outputs, handoff text, and confirmation items.</p>
              </div>
            )}
          </aside>
        </div>

        <section className="report-history-panel">
          <div className="report-panel-header">
            <div>
              <span className="eyebrow">History</span>
              <h2>Report automation jobs</h2>
            </div>
          </div>
          <div className="job-history-list">
            {jobs.length === 0 ? (
              <p>No report automation jobs have been created yet.</p>
            ) : (
              jobs.map((job) => (
                <button
                  className={job.id === selectedJob?.id ? 'job-history-item active' : 'job-history-item'}
                  key={job.id}
                  type="button"
                  onClick={() => setSelectedJobId(job.id)}
                >
                  <span className={`report-status ${job.status}`}>{statusLabel(job.status)}</span>
                  <strong>{job.project || job.client || 'DACK report'}</strong>
                  <small>{job.period || 'Needs confirmation'} - {job.sourceFiles.length} source files - {job.outputFiles.length} outputs</small>
                </button>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
