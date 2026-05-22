'use client'

import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import {
  AlertTriangle,
  ArrowUpRight,
  Bell,
  BookOpenCheck,
  Bot,
  Check,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  FileSearch,
  FileStack,
  Gauge,
  LayoutDashboard,
  Library,
  LockKeyhole,
  PanelLeft,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Users,
  type LucideIcon,
} from 'lucide-react'

import {
  activationChecklist,
  agencyMemory,
  alerts,
  projectSheets,
  proposalSections,
  rates,
  rfps,
  staffResumes,
  systemIntelligence,
  teamBuilder,
  type Rfp,
  type Severity,
} from '../data/dummyData'

type ViewKey = 'command' | 'rfp' | 'assembly' | 'library' | 'governance' | 'roadmap'

const today = new Date('2026-05-21T12:00:00')

const views: { id: ViewKey; label: string; icon: LucideIcon }[] = [
  { id: 'command', label: 'Command', icon: LayoutDashboard },
  { id: 'rfp', label: 'RFP Review', icon: FileSearch },
  { id: 'assembly', label: 'Assembly', icon: FileStack },
  { id: 'library', label: 'Library', icon: Library },
  { id: 'governance', label: 'Governance', icon: ShieldCheck },
  { id: 'roadmap', label: 'Build Plan', icon: ClipboardCheck },
]

const buildPlan = [
  { label: 'Payload collections', status: 'Done', owner: 'Platform' },
  { label: 'First admin user', status: 'Now', owner: 'Platform' },
  { label: 'RBAC and finance gates', status: 'Next', owner: 'Security' },
  { label: 'Replace sample data', status: 'Next', owner: 'Product' },
  { label: 'RFP upload and parsing jobs', status: 'Next', owner: 'AI' },
  { label: 'Citation review queue', status: 'Later', owner: 'AI' },
  { label: 'Proposal builder persistence', status: 'Later', owner: 'Product' },
  { label: 'Word and PDF export', status: 'Later', owner: 'Delivery' },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 0,
    notation: value >= 1_000_000 ? 'compact' : 'standard',
    style: 'currency',
  }).format(value)
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(`${value}T12:00:00`))
}

function daysUntil(value: string) {
  return Math.ceil((new Date(`${value}T12:00:00`).getTime() - today.getTime()) / 86_400_000)
}

function slug(value: string) {
  return value.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')
}

function Pill({ children, tone = 'neutral' }: { children: ReactNode; tone?: string }) {
  return <span className={`dack-pill ${slug(tone)}`}>{children}</span>
}

function IconButton({ children, label }: { children: ReactNode; label: string }) {
  return (
    <button className="dack-icon-button" type="button" aria-label={label} title={label}>
      {children}
    </button>
  )
}

function Stat({
  label,
  value,
  note,
  tone = 'neutral',
}: {
  label: string
  value: string | number
  note: string
  tone?: string
}) {
  return (
    <article className={`dack-stat ${slug(tone)}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{note}</p>
    </article>
  )
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
  const [activeView, setActiveView] = useState<ViewKey>('command')
  const [selectedRfpId, setSelectedRfpId] = useState(rfps[1]?.id ?? rfps[0].id)
  const selectedRfp = rfps.find((rfp) => rfp.id === selectedRfpId) ?? rfps[0]
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
          <p>Custom workflow shell. Payload is the control room; this is where proposal teams work.</p>
        </div>
      </aside>

      <main className="dack-main">
        <header className="dack-topbar">
          <div className="dack-title-block">
            <span>DACK Consulting Solutions</span>
            <h1>{active.label}</h1>
            <p>Proposal operations, RFP intelligence, document control, rates, staffing, and project evidence in one command workspace.</p>
          </div>

          <div className="dack-toolbar" aria-label="Workspace actions">
            <div className="dack-search">
              <Search size={16} aria-hidden="true" />
              <span>Search pursuits, resumes, rates, forms, citations</span>
            </div>
            <IconButton label="Upload RFP">
              <UploadCloud size={17} aria-hidden="true" />
            </IconButton>
            <Link className="dack-toolbar-link" href="/report-automation">
              <Bot size={16} aria-hidden="true" />
              Reports
            </Link>
            <button className="dack-primary-action" type="button">
              <Plus size={16} aria-hidden="true" />
              New pursuit
            </button>
          </div>
        </header>

        <div className="dack-workspace">
          {activeView === 'command' && <CommandView setActiveView={setActiveView} setSelectedRfpId={setSelectedRfpId} />}
          {activeView === 'rfp' && <RfpReview selectedRfp={selectedRfp} setSelectedRfpId={setSelectedRfpId} />}
          {activeView === 'assembly' && <AssemblyView />}
          {activeView === 'library' && <LibraryView />}
          {activeView === 'governance' && <GovernanceView />}
          {activeView === 'roadmap' && <RoadmapView />}
        </div>
      </main>
    </div>
  )
}

function CommandView({
  setActiveView,
  setSelectedRfpId,
}: {
  setActiveView: (view: ViewKey) => void
  setSelectedRfpId: (id: string) => void
}) {
  const dueSoon = rfps.filter((rfp) => daysUntil(rfp.dueDate) <= 10).length
  const highSeverity = alerts.filter((alert) => alert.severity === 'High').length
  const openValue = rfps.reduce((total, rfp) => total + rfp.estimatedValue, 0)
  const restrictedRates = rates.filter((rate) => rate.accessLevel === 'Finance Only' || rate.accessLevel === 'Restricted').length
  const websiteGaps = projectSheets.filter((project) => project.websiteStatus !== 'On Website').length

  return (
    <div className="dack-command-grid">
      <section className="dack-briefing">
        <div>
          <span className="dack-kicker">Morning operating brief</span>
          <h2>Three pursuits need decisions before the proposal team burns time.</h2>
          <p>
            The workspace should make DACK faster at deciding what to chase, what evidence supports the response,
            and what cannot move forward without a human sign-off.
          </p>
        </div>
        <div className="dack-briefing-actions">
          <button type="button" onClick={() => setActiveView('rfp')}>
            Review RFP queue
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => setActiveView('governance')}>
            Check restrictions
            <LockKeyhole size={16} aria-hidden="true" />
          </button>
        </div>
      </section>

      <div className="dack-stat-grid">
        <Stat label="Active RFPs" value={rfps.length} note={`${dueSoon} due inside 10 days`} tone="info" />
        <Stat label="Open pursuit value" value={formatCurrency(openValue)} note="Analyzed opportunity value" tone="money" />
        <Stat label="High alerts" value={highSeverity} note="Deadline, compliance, certification" tone="danger" />
        <Stat label="Restricted rates" value={restrictedRates} note="Hidden from broad users" tone="locked" />
        <Stat label="Website gaps" value={websiteGaps} note="Project sheets missing or stale" tone="warning" />
      </div>

      <section className="dack-surface dack-priority-surface">
        <SectionHeader eyebrow="Pursuit triage" title="Work that should move today" action={<Pill tone="live">Live sample data</Pill>} />
        <div className="dack-pursuit-table" role="table" aria-label="Priority pursuits">
          <div className="dack-table-head" role="row">
            <span>Opportunity</span>
            <span>Due</span>
            <span>Risk</span>
            <span>Decision</span>
            <span>Value</span>
          </div>
          {rfps.map((rfp) => (
            <button
              className="dack-pursuit-row"
              key={rfp.id}
              type="button"
              onClick={() => {
                setSelectedRfpId(rfp.id)
                setActiveView('rfp')
              }}
            >
              <span>
                <strong>{rfp.name}</strong>
                <small>{rfp.agency} · {rfp.status}</small>
              </span>
              <span>{formatDate(rfp.dueDate)}</span>
              <span><Pill tone={rfp.riskLevel}>{rfp.riskLevel}</Pill></span>
              <span><Pill tone={rfp.recommendation}>{rfp.recommendation}</Pill></span>
              <span>{formatCurrency(rfp.estimatedValue)}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="dack-surface">
        <SectionHeader eyebrow="AI evidence rules" title="Extraction queue must stay reviewable" />
        <div className="dack-evidence-list">
          {systemIntelligence.slice(0, 5).map((item, index) => (
            <article key={item}>
              <div className="dack-evidence-index">{index + 1}</div>
              <p>{item}</p>
              <Pill tone={index < 2 ? 'partial evidence' : 'needs review'}>{index < 2 ? 'Partial evidence' : 'Needs review'}</Pill>
            </article>
          ))}
        </div>
      </section>

      <section className="dack-surface">
        <SectionHeader eyebrow="Critical alerts" title="Do not let these drift" />
        <div className="dack-alert-stack">
          {alerts.slice(0, 4).map((alert) => (
            <AlertCard alert={alert} key={alert.id} />
          ))}
        </div>
      </section>
    </div>
  )
}

function RfpReview({
  selectedRfp,
  setSelectedRfpId,
}: {
  selectedRfp: Rfp
  setSelectedRfpId: (id: string) => void
}) {
  return (
    <div className="dack-rfp-layout">
      <section className="dack-rfp-list">
        <SectionHeader eyebrow="RFP inbox" title="Intake queue" />
        {rfps.map((rfp) => (
          <button
            className={rfp.id === selectedRfp.id ? 'dack-rfp-button active' : 'dack-rfp-button'}
            key={rfp.id}
            type="button"
            onClick={() => setSelectedRfpId(rfp.id)}
          >
            <span>
              <strong>{rfp.name}</strong>
              <small>{rfp.agency} · {formatCurrency(rfp.estimatedValue)}</small>
            </span>
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        ))}
      </section>

      <section className="dack-surface dack-rfp-detail">
        <div className="dack-rfp-hero">
          <div>
            <span className="dack-kicker">{selectedRfp.agency} intelligence packet</span>
            <h2>{selectedRfp.name}</h2>
            <p>{selectedRfp.summary}</p>
          </div>
          <div className="dack-rfp-status">
            <Pill tone={selectedRfp.recommendation}>{selectedRfp.recommendation}</Pill>
            <Pill tone={selectedRfp.riskLevel}>{selectedRfp.riskLevel}</Pill>
          </div>
        </div>

        <div className="dack-date-strip">
          <Info label="Due" value={formatDate(selectedRfp.dueDate)} />
          <Info label="Questions" value={formatDate(selectedRfp.questionDeadline)} />
          <Info label="Internal review" value={formatDate(selectedRfp.internalReviewDate)} />
          <Info label="Interview" value={selectedRfp.interviewWindow} />
        </div>

        <div className="dack-review-grid">
          <RecordPanel title="Decision basis" icon={Gauge}>
            <p>{selectedRfp.recommendationReason}</p>
          </RecordPanel>
          <RecordPanel title="Key requirements" icon={BookOpenCheck} items={selectedRfp.keyRequirements} />
          <Checklist title="Required forms" items={selectedRfp.requiredForms} />
          <Checklist title="Compliance checks" items={selectedRfp.complianceChecklist} />
          <RecordPanel title="Suggested team" icon={Users}>
            <div className="dack-team-list">
              {selectedRfp.suggestedTeam.map((member) => (
                <article key={member.name}>
                  <strong>{member.name}</strong>
                  <span>{member.role} · {member.fit}% fit</span>
                  <p>{member.reason}</p>
                </article>
              ))}
            </div>
          </RecordPanel>
          <RecordPanel title="Gaps and risks" icon={AlertTriangle} items={selectedRfp.gapsAndRisks} tone="danger" />
          <RecordPanel title="Proposal outline" icon={FileStack} items={selectedRfp.draftOutline} ordered />
          <RecordPanel title="Next actions" icon={Bell} items={selectedRfp.nextActions} tone="warning" />
        </div>
      </section>
    </div>
  )
}

function AssemblyView() {
  const [selectedSectionId, setSelectedSectionId] = useState(proposalSections[2].id)
  const selected = proposalSections.find((section) => section.id === selectedSectionId) ?? proposalSections[0]

  return (
    <div className="dack-assembly-layout">
      <section className="dack-surface">
        <SectionHeader eyebrow="Proposal assembly" title="Current package" action={<Pill tone="in progress">In progress</Pill>} />
        <div className="dack-outline">
          {proposalSections.map((section, index) => (
            <button
              className={selected.id === section.id ? 'dack-outline-row active' : 'dack-outline-row'}
              key={section.id}
              type="button"
              onClick={() => setSelectedSectionId(section.id)}
            >
              <span className="dack-number">{index + 1}</span>
              <span>
                <strong>{section.title}</strong>
                <small>{section.owner} · {section.type}</small>
              </span>
              <Pill tone={section.status}>{section.status}</Pill>
            </button>
          ))}
        </div>
      </section>

      <section className="dack-surface dack-section-reader">
        <SectionHeader eyebrow="Selected section" title={selected.title} action={<Pill tone={selected.status}>{selected.status}</Pill>} />
        <div className="dack-date-strip compact">
          <Info label="Owner" value={selected.owner} />
          <Info label="Type" value={selected.type} />
          <Info label="Source" value={selected.source} />
        </div>
        <p className="dack-reader-copy">{selected.preview}</p>
        <div className="dack-callout-list">
          {selected.recommendations.map((item) => (
            <article key={item}>
              <Sparkles size={16} aria-hidden="true" />
              <span>{item}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="dack-surface">
        <SectionHeader eyebrow="Team coverage" title={`${teamBuilder.fitScore}% fit score`} />
        <div className="dack-team-list">
          {teamBuilder.selectedTeam.map((member) => (
            <article key={member.name}>
              <strong>{member.name}</strong>
              <span>{member.role} · {member.fit}% fit</span>
              <p>{member.reason}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function LibraryView() {
  const expiringStaff = staffResumes.filter((staff) => daysUntil(staff.certificationExpirationDate) < 45)

  return (
    <div className="dack-library-grid">
      <section className="dack-surface">
        <SectionHeader eyebrow="Resume library" title="People, fit, and certification exposure" action={<Pill tone="needs review">{expiringStaff.length} at risk</Pill>} />
        <div className="dack-record-grid">
          {staffResumes.map((staff) => {
            const topFit = Object.entries(staff.agencyFit).sort((a, b) => b[1] - a[1])[0]
            return (
              <article className="dack-person-card" key={staff.id}>
                <div className="dack-avatar">{staff.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</div>
                <div>
                  <h3>{staff.name}</h3>
                  <p>{staff.role}</p>
                </div>
                <dl>
                  <div><dt>Fit</dt><dd>{topFit ? `${topFit[0]} ${topFit[1]}%` : 'Unscored'}</dd></div>
                  <div><dt>Availability</dt><dd>{staff.availability}</dd></div>
                  <div><dt>Cert expires</dt><dd>{formatDate(staff.certificationExpirationDate)}</dd></div>
                </dl>
              </article>
            )
          })}
        </div>
      </section>

      <section className="dack-surface">
        <SectionHeader eyebrow="Project sheets" title="Evidence worth reusing" />
        <div className="dack-project-stack">
          {projectSheets.map((project) => (
            <article className="dack-project-row" key={project.id}>
              <div>
                <strong>{project.projectName}</strong>
                <p>{project.whyItMatches}</p>
                <span>{project.agency} · {project.year} · {formatCurrency(project.value)}</span>
              </div>
              <div>
                <strong>{project.relevanceScore}%</strong>
                <Pill tone={project.websiteStatus}>{project.websiteStatus}</Pill>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function GovernanceView() {
  return (
    <div className="dack-governance-grid">
      <section className="dack-surface">
        <SectionHeader eyebrow="Sensitive rate control" title="Finance data cannot be decorative" action={<Pill tone="restricted">Restricted</Pill>} />
        <div className="dack-rate-table">
          <div className="dack-table-head">
            <span>Name</span>
            <span>Agency</span>
            <span>Access</span>
            <span>Status</span>
          </div>
          {rates.map((rate) => (
            <article className="dack-rate-row" key={rate.id}>
              <span>
                <strong>{rate.employee}</strong>
                <small>{rate.title}</small>
              </span>
              <span>{rate.agency}</span>
              <span><Pill tone={rate.accessLevel}>{rate.accessLevel}</Pill></span>
              <span><Pill tone={rate.warning}>{rate.warning}</Pill></span>
            </article>
          ))}
        </div>
      </section>

      <section className="dack-surface">
        <SectionHeader eyebrow="Agency memory" title="Rules teams should not relearn" />
        <div className="dack-agency-stack">
          {agencyMemory.slice(0, 4).map((agency) => (
            <article key={agency.agency}>
              <strong>{agency.agency}</strong>
              <p>{agency.strategyReminders[0]}</p>
              <small>{agency.internalWarnings[0]}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="dack-surface">
        <SectionHeader eyebrow="Data activation" title="Real DACK files still needed" />
        <div className="dack-activation-list">
          {activationChecklist.map((item) => (
            <article key={item.source}>
              <div>
                <strong>{item.source}</strong>
                <p>{item.filesNeeded}</p>
              </div>
              <Pill tone={item.status}>{item.status}</Pill>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function RoadmapView() {
  const done = buildPlan.filter((item) => item.status === 'Done').length
  const progress = Math.round((done / buildPlan.length) * 100)

  return (
    <div className="dack-roadmap-layout">
      <section className="dack-briefing">
        <div>
          <span className="dack-kicker">Build discipline</span>
          <h2>Custom DACK platform first. AI as workflow muscle, not the product.</h2>
          <p>Foundation, permissions, data, ingestion, evidence review, builder, export. This order keeps the system serious.</p>
        </div>
        <div className="dack-progress-dial">
          <strong>{progress}%</strong>
          <span>foundation path</span>
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

function AlertCard({ alert }: { alert: { severity: Severity; category: string; title: string; owner: string; dueDate: string; recommendedAction: string } }) {
  return (
    <article className={`dack-alert-card ${slug(alert.severity)}`}>
      <div>
        <span>{alert.category}</span>
        <strong>{alert.title}</strong>
        <p>{alert.recommendedAction}</p>
      </div>
      <div>
        <Pill tone={alert.severity}>{alert.severity}</Pill>
        <small>{alert.owner} · {formatDate(alert.dueDate)}</small>
      </div>
    </article>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="dack-info">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function RecordPanel({
  title,
  icon: Icon,
  children,
  items,
  ordered = false,
  tone = 'neutral',
}: {
  title: string
  icon: LucideIcon
  children?: ReactNode
  items?: string[]
  ordered?: boolean
  tone?: string
}) {
  const List = ordered ? 'ol' : 'ul'
  return (
    <article className={`dack-record-panel ${slug(tone)}`}>
      <header>
        <Icon size={17} aria-hidden="true" />
        <h3>{title}</h3>
      </header>
      {items ? (
        <List>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </List>
      ) : children}
    </article>
  )
}

function Checklist({ title, items }: { title: string; items: { item: string; status: string; owner: string }[] }) {
  return (
    <article className="dack-record-panel">
      <header>
        <FileCheck2 size={17} aria-hidden="true" />
        <h3>{title}</h3>
      </header>
      <div className="dack-checklist">
        {items.map((item) => (
          <div key={item.item}>
            <span><Check size={14} aria-hidden="true" /></span>
            <p>{item.item}</p>
            <Pill tone={item.status}>{item.status}</Pill>
            <small>{item.owner}</small>
          </div>
        ))}
      </div>
    </article>
  )
}

export default CommandCenter
