'use client'

import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import {
  Bot,
  ClipboardCheck,
  FileCheck2,
  FileSearch,
  FileStack,
  LayoutDashboard,
  Library,
  LockKeyhole,
  PanelLeft,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  type LucideIcon,
} from 'lucide-react'

type ViewKey = 'today' | 'rfps' | 'builder' | 'library' | 'compliance' | 'plan'

const views: { id: ViewKey; label: string; icon: LucideIcon }[] = [
  { id: 'today', label: 'Today', icon: LayoutDashboard },
  { id: 'rfps', label: 'RFPs', icon: FileSearch },
  { id: 'builder', label: 'Proposal Builder', icon: FileStack },
  { id: 'library', label: 'People & Projects', icon: Library },
  { id: 'compliance', label: 'Compliance', icon: ShieldCheck },
  { id: 'plan', label: 'Exports & Plan', icon: ClipboardCheck },
]

const journey = [
  {
    title: 'RFP in',
    description: 'Upload PDF or Word RFPs, preserve originals, and extract requirements, deadlines, forms, and constraints for review.',
    icon: UploadCloud,
  },
  {
    title: 'Report out',
    description: 'Generate compliance and quarterly report packets from verified attachments, logs, payments, payrolls, and site records.',
    icon: ClipboardCheck,
  },
  {
    title: 'Proposal with AI',
    description: 'Use reviewed RFP requirements to suggest teams, resumes, project sheets, content blocks, and draft sections.',
    icon: Sparkles,
  },
  {
    title: 'Format out',
    description: 'Export clean Word, PDF, and Excel files only after human review clears missing forms, restricted rates, and AI-sourced text.',
    icon: FileCheck2,
  },
]

const ragReuse = [
  'Borrow upload, extraction, export, and AI guardrail patterns from rag2.',
  'Do not borrow ANC-specific pricing, LED product logic, or stakeholder-only workflows.',
  'Keep DACK centered on RFPs, reports, proposals, people, projects, rates, and compliance.',
]

const buildPlan = [
  { label: 'Connect real RFP upload records', status: 'Next', owner: 'Platform' },
  { label: 'Persist extracted requirements and forms', status: 'Next', owner: 'RFPs' },
  { label: 'Wire report packet jobs to documents', status: 'Next', owner: 'Reports' },
  { label: 'Add proposal builder records', status: 'Later', owner: 'Proposals' },
  { label: 'Add Word, PDF, and Excel exports', status: 'Later', owner: 'Exports' },
  { label: 'Enforce RBAC for rates and contracts', status: 'Later', owner: 'Compliance' },
]

function slug(value: string) {
  return value.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')
}

function Pill({ children, tone = 'neutral' }: { children: ReactNode; tone?: string }) {
  return <span className={`dack-pill ${slug(tone)}`}>{children}</span>
}

function SectionHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string
  title: string
  action?: ReactNode
}) {
  return (
    <div className="dack-section-header">
      <div>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  )
}

function CommandCenter() {
  const [activeView, setActiveView] = useState<ViewKey>('today')
  const active = views.find((view) => view.id === activeView) ?? views[0]

  return (
    <div className="dack-shell">
      <aside className="dack-rail">
        <div className="dack-brand-lockup">
          <div className="dack-mark">D</div>
          <div>
            <strong>DACK</strong>
            <span>Proposal Command</span>
          </div>
        </div>

        <nav className="dack-nav" aria-label="DACK workspace">
          {views.map((view) => {
            const Icon = view.icon
            return (
              <button
                className={view.id === activeView ? 'dack-nav-item active' : 'dack-nav-item'}
                key={view.id}
                type="button"
                onClick={() => setActiveView(view.id)}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{view.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="dack-rail-brief">
          <PanelLeft size={18} aria-hidden="true" />
          <p>Real records only. Payload is the control room; this is where proposal teams work.</p>
        </div>
      </aside>

      <main className="dack-main">
        <header className="dack-topbar">
          <div className="dack-title-block">
            <span>DACK Consulting Solutions</span>
            <h1>{active.label}</h1>
            <p>RFP in, report or proposal out. No sample pursuits, no fake owners, no made-up values.</p>
          </div>

          <div className="dack-toolbar" aria-label="Workspace actions">
            <div className="dack-search">
              <Search size={16} aria-hidden="true" />
              <span>Search will cover RFPs, forms, resumes, project sheets, and rates</span>
            </div>
            <button className="dack-toolbar-link" type="button" disabled>
              <UploadCloud size={17} aria-hidden="true" />
              Upload RFP
            </button>
            <Link className="dack-toolbar-link" href="/report-automation">
              <Bot size={16} aria-hidden="true" />
              Reports
            </Link>
            <button className="dack-primary-action" type="button" disabled>
              <Plus size={16} aria-hidden="true" />
              New RFP
            </button>
          </div>
        </header>

        <div className="dack-workspace">
          {activeView === 'today' && <TodayView />}
          {activeView === 'rfps' && (
            <EmptyModuleView
              eyebrow="RFPs"
              title="No RFP packet yet."
              body="Upload will create the checklist, deadlines, required forms, team suggestions, project matches, and export readiness."
            />
          )}
          {activeView === 'builder' && (
            <EmptyModuleView
              eyebrow="Proposal builder"
              title="No proposal packet yet."
              body="Proposal drafting starts after a real RFP has reviewed requirements, selected sections, suggested people, and project proof."
            />
          )}
          {activeView === 'library' && (
            <EmptyModuleView
              eyebrow="People and projects"
              title="No library records loaded yet."
              body="Resumes, certifications, project sheets, and content blocks should come from real DACK records, not demo entries."
            />
          )}
          {activeView === 'compliance' && (
            <EmptyModuleView
              eyebrow="Compliance"
              title="No compliance queue yet."
              body="Forms, rate restrictions, contract documents, and certification alerts will appear once real records are connected."
            />
          )}
          {activeView === 'plan' && <PlanView />}
        </div>
      </main>
    </div>
  )
}

function TodayView() {
  return (
    <div className="dack-empty-workspace">
      <section className="dack-empty-hero">
        <div>
          <span className="dack-kicker">No demo data loaded</span>
          <h2>RFP in. Report or proposal out.</h2>
          <p>
            This is the real starting state. The product journey is simple: bring in an RFP or report package,
            review the extracted work, then export the right Word, PDF, or Excel file.
          </p>
        </div>
        <div className="dack-empty-actions">
          <button type="button" disabled>
            <UploadCloud size={16} aria-hidden="true" />
            Upload RFP
          </button>
          <Link href="/report-automation">
            <Bot size={16} aria-hidden="true" />
            Open Reports
          </Link>
        </div>
      </section>

      <section className="dack-journey-grid" aria-label="DACK workflow journey">
        {journey.map((item, index) => {
          const Icon = item.icon
          return (
            <article key={item.title}>
              <div className="dack-journey-index">
                <span>{index + 1}</span>
                <Icon size={18} aria-hidden="true" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          )
        })}
      </section>

      <div className="dack-empty-layout">
        <section className="dack-surface">
          <SectionHeader eyebrow="Work queue" title="No RFPs uploaded yet" />
          <div className="dack-empty-box">
            <FileSearch size={22} aria-hidden="true" />
            <div>
              <strong>The queue stays empty until a real RFP or report package is uploaded.</strong>
              <p>Once connected, this becomes active pursuits, report jobs, missing items, owners, and export readiness.</p>
            </div>
          </div>
        </section>

        <section className="dack-surface">
          <SectionHeader eyebrow="Borrow from rag2" title="Reuse the engine pattern, not the ANC product" />
          <div className="dack-evidence-list compact">
            {ragReuse.map((item, index) => (
              <article key={item}>
                <div className="dack-evidence-index">{index + 1}</div>
                <p>{item}</p>
                <Pill tone={index === 0 ? 'complete' : 'needs review'}>{index === 0 ? 'Reuse' : 'Adapt'}</Pill>
              </article>
            ))}
          </div>
        </section>

        <section className="dack-surface dack-control-note">
          <LockKeyhole size={18} aria-hidden="true" />
          <div>
            <strong>Nothing fake should appear here</strong>
            <p>Rates, contracts, AI text, and client-ready exports should display only after they come from actual uploads or Payload records.</p>
          </div>
        </section>
      </div>
    </div>
  )
}

function EmptyModuleView({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <section className="dack-empty-hero">
      <div>
        <span className="dack-kicker">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    </section>
  )
}

function PlanView() {
  return (
    <div className="dack-roadmap-layout">
      <section className="dack-empty-hero">
        <div>
          <span className="dack-kicker">Build plan</span>
          <h2>Connect the real pipeline before adding more screens.</h2>
          <p>
            DACK should borrow proven rag2 mechanics for upload, extraction, guardrails, and exports,
            while keeping the product model specific to proposals, reports, compliance, rates, people, and project proof.
          </p>
        </div>
      </section>

      <section className="dack-surface">
        <SectionHeader eyebrow="Implementation gates" title="What has to happen next" />
        <div className="dack-build-list">
          {buildPlan.map((item, index) => (
            <article className={`dack-build-row ${slug(item.status)}`} key={item.label}>
              <span className="dack-number">{index + 1}</span>
              <div>
                <strong>{item.label}</strong>
                <small>{item.owner}</small>
              </div>
              <Pill tone={item.status}>{item.status}</Pill>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default CommandCenter
