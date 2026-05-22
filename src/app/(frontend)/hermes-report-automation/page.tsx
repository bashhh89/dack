import Link from 'next/link'
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  FileArchive,
  FileText,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react'

const testedFiles = [
  'NYPA_Q1_2026_Hermes_PDF_Test.docx',
  'NYPA_Q1_2026_Hermes_PDF_Test.pdf',
  'RWNYC_Q1_2026_DACK_PDF_Test.docx',
  'RWNYC_Q1_2026_DACK_PDF_Test.pdf',
]

const prompts = [
  'Hermes, turn the attached rough DACK report into a client-ready quarterly MWBE/EEO/Labor Word report using the NYPA Q1 2026 report style. Use only the attached source facts. Do not invent numbers or claims. Mark missing items as Needs confirmation. Send back the .docx file.',
  'Hermes, make this report Natalia-ready. Same facts, better DACK/NYPA compliance-report language, clean tables, executive tone, charts only from real data. Return both Word and PDF.',
  'Hermes, create a polished PDF version of the attached DACK compliance report. Follow the NYPA Q1 2026 structure: Executive Summary, Project Goals, Outreach, Utilization, Payments, Workforce Diversity, Labor Compliance, Attachments. Do not invent metrics. Send back the PDF.',
  'Hermes, rebuild this rough report into a final client-ready DACK quarterly report. I need both .docx and .pdf. Use the NYPA report style and section order. Anything missing should say Needs confirmation.',
  'Hermes, review the attached report for missing compliance data, then generate the polished client-ready Word and PDF versions. Separate confirmed facts from Needs confirmation items.',
]

export default function HermesReportAutomationPage() {
  return (
    <main className="automation-page">
      <div className="automation-shell">
        <nav className="automation-nav" aria-label="Back to DACK command center">
          <Link href="/" className="back-link">
            <ArrowLeft size={16} aria-hidden="true" />
            DACK Command Center
          </Link>
          <Link href="/report-automation">Open working module</Link>
        </nav>

        <section className="automation-hero">
          <div>
            <div className="automation-kicker">
              <Bot size={16} aria-hidden="true" />
              WhatsApp-ready DACK report workflow
            </div>
            <h1>Hermes can now turn rough DACK compliance material into Word and PDF reports.</h1>
            <p>
              The agent was trained against Natalia&apos;s NYPA Q1 2026 benchmark so recurring DACK reports follow the
              right section order, writing style, compliance caution, and file-delivery behavior.
            </p>
          </div>

          <div className="automation-status-panel">
            <div className="status-row">
              <span>Hermes skill</span>
              <strong>Installed</strong>
            </div>
            <div className="status-row">
              <span>Word export</span>
              <strong>Passed</strong>
            </div>
            <div className="status-row">
              <span>PDF export</span>
              <strong>Passed</strong>
            </div>
            <div className="status-row">
              <span>WhatsApp delivery</span>
              <strong>MEDIA ready</strong>
            </div>
          </div>
        </section>

        <section className="automation-grid">
          <article className="automation-card emphasis">
            <div className="automation-card-icon green">
              <Sparkles size={22} aria-hidden="true" />
            </div>
            <h2>What We Built</h2>
            <p>
              A Hermes skill named DACK Executive Compliance Report that converts rough notes, Word files, PDFs, and
              source reports into client-ready DACK compliance reports.
            </p>
            <ul>
              <li>Uses only provided facts and marks missing items as Needs confirmation.</li>
              <li>Follows NYPA-style executive report language and compliance section logic.</li>
              <li>Builds real Word documents instead of chat outlines.</li>
              <li>Builds clean PDFs through local headless Chrome.</li>
            </ul>
          </article>

          <article className="automation-card">
            <div className="automation-card-icon amber">
              <ShieldCheck size={22} aria-hidden="true" />
            </div>
            <h2>Compliance Guardrails</h2>
            <p>
              Hermes is instructed not to invent metrics, names, dates, percentages, utilization claims, payment totals,
              or workforce statements. Unsupported items remain visible as confirmation needs.
            </p>
            <div className="automation-pill-row">
              <span>MWBE</span>
              <span>SDVOB</span>
              <span>EEO</span>
              <span>Labor</span>
              <span>Payments</span>
            </div>
          </article>

          <article className="automation-card">
            <div className="automation-card-icon blue">
              <Workflow size={22} aria-hidden="true" />
            </div>
            <h2>Default Report Structure</h2>
            <ol>
              <li>Cover Page</li>
              <li>Table of Contents</li>
              <li>Executive Summary</li>
              <li>Project Goals</li>
              <li>MWBE / SDVOB Outreach</li>
              <li>Utilization, Payments, Workforce Diversity, Labor Compliance</li>
              <li>Needs Confirmation and Attachments</li>
            </ol>
          </article>
        </section>

        <section className="automation-section">
          <div className="automation-section-heading">
            <FileArchive size={20} aria-hidden="true" />
            <div>
              <h2>Validated Test Outputs</h2>
              <p>Generated in /root/anc-services/output/doc from the NYPA benchmark and RWNYC rough report.</p>
            </div>
          </div>
          <div className="file-proof-grid">
            {testedFiles.map((file) => (
              <div className="proof-file" key={file}>
                <FileText size={18} aria-hidden="true" />
                <span>{file}</span>
                <CheckCircle2 size={16} aria-hidden="true" />
              </div>
            ))}
          </div>
        </section>

        <section className="automation-section">
          <div className="automation-section-heading">
            <MessageSquareText size={20} aria-hidden="true" />
            <div>
              <h2>WhatsApp Test Prompts</h2>
              <p>Copy one of these into the Natalia group after uploading the rough report or notes.</p>
            </div>
          </div>
          <div className="prompt-list">
            {prompts.map((prompt, index) => (
              <div className="prompt-box" key={prompt}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{prompt}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="automation-section final">
          <h2>Operational Behavior</h2>
          <div className="behavior-grid">
            <div>
              <strong>When Natalia asks for Word</strong>
              <p>Hermes sends a .docx through WhatsApp using a native MEDIA file attachment.</p>
            </div>
            <div>
              <strong>When Natalia asks for PDF</strong>
              <p>Hermes creates the Word companion, renders the PDF locally, and sends the .pdf back.</p>
            </div>
            <div>
              <strong>When Natalia asks for both</strong>
              <p>Hermes returns two MEDIA attachments: one Word file and one PDF file.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
