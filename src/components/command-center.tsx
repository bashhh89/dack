'use client'

import Link from 'next/link'
import { useMemo, useState, type ReactNode } from 'react'
import {
  AlertTriangle,
  BarChart3,
  Bell,
  BookOpenCheck,
  Bot,
  Boxes,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  FileCog,
  FileSearch,
  FileStack,
  Globe2,
  LayoutDashboard,
  Library,
  LockKeyhole,
  Megaphone,
  PanelLeft,
  Plus,
  Search,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  UploadCloud,
  Users,
  type LucideIcon,
} from 'lucide-react'
import {
  activationChecklist,
  agencyMemory,
  alerts,
  inventory,
  marketingBudget,
  marketingRecommendations,
  projectSheets,
  proposalSections,
  proposals,
  rates,
  receiptLogPlaceholders,
  rfps,
  staffResumes,
  systemIntelligence,
  teamBuilder,
  type Agency,
  type Readiness,
  type Rfp,
  type Severity,
  type WebsiteStatus,
} from '../data/dummyData'

type SectionKey =
  | 'executive'
  | 'roadmap'
  | 'rfp'
  | 'assembly'
  | 'staffing'
  | 'projects'
  | 'pricing'
  | 'memory'
  | 'marketing'
  | 'actions'
  | 'activation'

const today = new Date('2026-05-21T12:00:00')

const navigation: { id: SectionKey; label: string; icon: LucideIcon }[] = [
  { id: 'executive', label: 'Executive Command Center', icon: LayoutDashboard },
  { id: 'roadmap', label: 'Enterprise Build Checklist', icon: ClipboardCheck },
  { id: 'rfp', label: 'RFP Intelligence Workspace', icon: FileSearch },
  { id: 'assembly', label: 'Proposal Assembly Room', icon: FileStack },
  { id: 'staffing', label: 'Resume & Staffing Intelligence', icon: Users },
  { id: 'projects', label: 'Project Sheet Matching', icon: Library },
  { id: 'pricing', label: 'Rate & Pricing Intelligence', icon: CircleDollarSign },
  { id: 'memory', label: 'Agency & Teaming Memory', icon: BookOpenCheck },
  { id: 'marketing', label: 'Marketing Operations', icon: Megaphone },
  { id: 'actions', label: 'Alerts & Action Center', icon: Bell },
  { id: 'activation', label: 'Ready for DACK Data', icon: FileCog },
]

const subtitles: Record<SectionKey, string> = {
  executive: 'Leadership visibility across pursuits, risk, value, staffing, compliance, and marketing readiness.',
  roadmap: 'The live path from polished prototype to enterprise-grade DACK proposal operating system.',
  rfp: 'A working RFP review environment that converts requirements into actions, gaps, team recommendations, and proposal structure.',
  assembly: 'A visual proposal builder that shows reusable content, current outline readiness, owners, and section-level recommendations.',
  staffing: 'Staffing fit, resume usage, certification risk, and teaming participation in one operating view.',
  projects: 'Project sheet matching with relevance scoring, website readiness, and pursuit-specific rationale.',
  pricing: 'Agency-specific rate intelligence with prime/sub relationships, expiration warnings, and restricted access signals.',
  memory: 'Institutional knowledge for agencies, teaming partners, recurring requirements, and proposal strategy.',
  marketing: 'Budget, inventory, website content gaps, and pursuit-driven marketing recommendations.',
  actions: 'Prioritized action center with owners, due dates, recommended actions, and related records.',
  activation: 'Working data model and file checklist for replacing sample data with DACK’s real materials.',
}

type BuildItem = {
  label: string
  status: 'Done' | 'Now' | 'Next' | 'Later'
  owner: string
}

type BuildPhase = {
  title: string
  outcome: string
  items: BuildItem[]
}

const enterpriseBuildPhases: BuildPhase[] = [
  {
    title: 'Foundation',
    outcome: 'A real Next.js product shell with visible project memory and build rules.',
    items: [
      { label: 'Next.js app router foundation', status: 'Done', owner: 'Platform' },
      { label: 'Modern DACK command center UI', status: 'Done', owner: 'Product' },
      { label: 'DACK skill with requirements, decisions, checklist, and rules', status: 'Done', owner: 'Platform' },
      { label: 'Repo implementation checklist', status: 'Done', owner: 'Product' },
    ],
  },
  {
    title: 'Enterprise Data Backbone',
    outcome: 'Payload, Postgres, tenant boundaries, collections, and admin control room.',
    items: [
      { label: 'Install and configure Payload', status: 'Done', owner: 'Platform' },
      { label: 'Configure Postgres adapter and environment', status: 'Done', owner: 'Platform' },
      { label: 'Create /admin and Payload route group', status: 'Done', owner: 'Platform' },
      { label: 'Define Organizations, Users, Agencies, Proposals, RFPs, Documents', status: 'Done', owner: 'Platform' },
      { label: 'Define Staff, Resumes, Projects, Rates, Subconsultants, Certifications', status: 'Done', owner: 'Platform' },
      { label: 'Boot admin against local Postgres', status: 'Done', owner: 'Platform' },
      { label: 'Create first admin user', status: 'Now', owner: 'Platform' },
      { label: 'Replace prototype data reads with Payload records', status: 'Next', owner: 'Product' },
    ],
  },
  {
    title: 'Governance and Permissions',
    outcome: 'No sensitive rates, contracts, or financial documents leak to the wrong people.',
    items: [
      { label: 'Admin, Proposal Manager, Contributor, Viewer roles', status: 'Next', owner: 'Security' },
      { label: 'Finance-sensitive rate access', status: 'Next', owner: 'Security' },
      { label: 'Tenant scoping on major collections', status: 'Next', owner: 'Security' },
      { label: 'Audit events for sensitive actions', status: 'Next', owner: 'Security' },
    ],
  },
  {
    title: 'RFP Intelligence',
    outcome: 'Upload RFPs, extract requirements, cite sources, and force human review.',
    items: [
      { label: 'RFP upload and original document storage', status: 'Next', owner: 'AI' },
      { label: 'Text extraction and document parsing queue', status: 'Next', owner: 'AI' },
      { label: 'Requirement, deadline, form, criteria extraction', status: 'Later', owner: 'AI' },
      { label: 'Citation/source storage', status: 'Later', owner: 'AI' },
      { label: 'Strong / Partial / No evidence states', status: 'Later', owner: 'AI' },
    ],
  },
  {
    title: 'Proposal Operating System',
    outcome: 'DACK-specific workspace for resumes, project sheets, rates, subs, templates, and proposal assembly.',
    items: [
      { label: 'Resume and project sheet libraries', status: 'Later', owner: 'Product' },
      { label: 'Subconsultant quota tracking', status: 'Later', owner: 'Product' },
      { label: 'Rate management with restricted views', status: 'Later', owner: 'Finance' },
      { label: 'Content library and agency templates', status: 'Later', owner: 'Product' },
      { label: 'Section-based proposal builder', status: 'Later', owner: 'Product' },
    ],
  },
  {
    title: 'Production Readiness',
    outcome: 'Reliable enterprise deployment with monitoring, backup, export, and recovery.',
    items: [
      { label: 'Background jobs for AI, ingestion, and batch exports', status: 'Later', owner: 'Ops' },
      { label: 'Logs, metrics, and alerting', status: 'Later', owner: 'Ops' },
      { label: 'Backup and restore procedure', status: 'Later', owner: 'Ops' },
      { label: 'Word/PDF export after templates stabilize', status: 'Later', owner: 'Product' },
      { label: 'Website readiness alerts for project sheets', status: 'Later', owner: 'Marketing' },
    ],
  },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: value >= 1_000_000 ? 'compact' : 'standard',
    maximumFractionDigits: value >= 1_000_000 ? 1 : 0,
  }).format(value)
}

function formatFullCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

function daysUntil(value: string) {
  return Math.ceil((new Date(`${value}T12:00:00`).getTime() - today.getTime()) / 86_400_000)
}

function slug(value: string) {
  return value.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')
}

function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: string }) {
  return <span className={`badge ${slug(tone)}`}>{children}</span>
}

function ReadinessBadge({ status }: { status: Readiness }) {
  return <Badge tone={status}>{status}</Badge>
}

function SeverityBadge({ severity }: { severity: Severity }) {
  return <Badge tone={severity}>{severity}</Badge>
}

function WebsiteBadge({ status }: { status: WebsiteStatus }) {
  return <Badge tone={status}>{status}</Badge>
}

function CardHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string
  title: string
  action?: ReactNode
}) {
  return (
    <div className="card-header">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  note,
  tone = 'blue',
}: {
  icon: LucideIcon
  label: string
  value: string | number
  note: string
  tone?: 'blue' | 'green' | 'amber' | 'red'
}) {
  return (
    <article className={`metric-card ${tone}`}>
      <div className="metric-card-top">
        <span>{label}</span>
        <div className="metric-icon">
          <Icon size={18} aria-hidden="true" />
        </div>
      </div>
      <strong>{value}</strong>
      <p>{note}</p>
    </article>
  )
}

function ExecutiveCommandCenter() {
  const activePursuits = rfps.length
  const dueThisWeek = rfps.filter((rfp) => daysUntil(rfp.dueDate) <= 8).length
  const highRisk = rfps.filter((rfp) => rfp.riskLevel === 'High Risk').length
  const proposedValue = proposals.reduce((total, proposal) => total + proposal.proposedValue, 0)
  const awardedValue = proposals.reduce((total, proposal) => total + proposal.awardedValue, 0)
  const won = proposals.filter((proposal) => proposal.outcome === 'Won').length
  const lost = proposals.filter((proposal) => proposal.outcome === 'Lost').length
  const winRate = Math.round((won / (won + lost)) * 100)
  const complianceRisks = alerts.filter((alert) => ['Compliance', 'Certification', 'Rates'].includes(alert.category)).length
  const staffRisks = staffResumes.filter((staff) => daysUntil(staff.certificationExpirationDate) < 45).length
  const websiteGaps = projectSheets.filter((sheet) => sheet.websiteStatus !== 'On Website').length
  const marketingActions = marketingRecommendations.filter((item) => item.priority !== 'Low').length

  return (
    <div className="section-stack">
      <div className="metrics-grid ten">
        <MetricCard icon={BriefcaseBusiness} label="Active Pursuits" value={activePursuits} note="RFPs currently tracked" />
        <MetricCard icon={CalendarClock} label="Due This Week" value={dueThisWeek} note="Submission pressure" tone="amber" />
        <MetricCard icon={ShieldAlert} label="High-Risk Submissions" value={highRisk} note="Needs leadership attention" tone="red" />
        <MetricCard icon={TrendingUp} label="Proposal Win Rate" value={`${winRate}%`} note="Won vs. lost outcomes" tone="green" />
        <MetricCard icon={BarChart3} label="Total Proposed Value" value={formatCurrency(proposedValue)} note="Open and recent pursuit value" />
        <MetricCard icon={CheckCircle2} label="Total Awarded Value" value={formatCurrency(awardedValue)} note="Recent wins" tone="green" />
        <MetricCard icon={ClipboardCheck} label="Open Compliance Risks" value={complianceRisks} note="Forms, rates, certifications" tone="red" />
        <MetricCard icon={Users} label="Staff / Certification Risks" value={staffRisks} note="Expiring before pursuit close" tone="amber" />
        <MetricCard icon={Megaphone} label="Marketing Action Items" value={marketingActions} note="Website and collateral priorities" />
        <MetricCard icon={Globe2} label="Website Content Gaps" value={websiteGaps} note="Missing or stale project sheets" tone="amber" />
      </div>

      <div className="control-grid">
        <section className="card wide">
          <CardHeader eyebrow="System Intelligence" title="Recommendations From the Working Data Model" action={<Badge tone="Platform Preview">Platform Preview</Badge>} />
          <div className="intelligence-list">
            {systemIntelligence.map((item) => (
              <article key={item}>
                <Sparkles size={17} aria-hidden="true" />
                <span>{item}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="card">
          <CardHeader eyebrow="Leadership Queue" title="Pursuits Requiring Attention" />
          <div className="pursuit-list">
            {rfps.slice(0, 4).map((rfp) => (
              <article key={rfp.id}>
                <div>
                  <h3>{rfp.name}</h3>
                  <span>{rfp.agency} · Due {formatDate(rfp.dueDate)}</span>
                </div>
                <Badge tone={rfp.riskLevel}>{rfp.riskLevel}</Badge>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="card">
        <CardHeader eyebrow="Pursuit Value" title="Active and Recent Proposal Portfolio" />
        <DataTable
          headers={['Proposal', 'Agency', 'Lead', 'Due Date', 'Status', 'Risk', 'Proposed Value', 'Awarded Value']}
          rows={proposals.map((proposal) => [
            <strong>{proposal.title}</strong>,
            proposal.agency,
            proposal.lead,
            formatDate(proposal.dueDate),
            <Badge tone={proposal.status}>{proposal.status}</Badge>,
            <Badge tone={proposal.riskLevel}>{proposal.riskLevel}</Badge>,
            formatFullCurrency(proposal.proposedValue),
            proposal.awardedValue ? formatFullCurrency(proposal.awardedValue) : 'Pending',
          ])}
        />
      </section>
    </div>
  )
}

function EnterpriseBuildChecklist() {
  const allItems = enterpriseBuildPhases.flatMap((phase) => phase.items)
  const done = allItems.filter((item) => item.status === 'Done').length
  const now = allItems.filter((item) => item.status === 'Now').length
  const next = allItems.filter((item) => item.status === 'Next').length
  const later = allItems.filter((item) => item.status === 'Later').length
  const progress = Math.round((done / allItems.length) * 100)
  const activePhase = enterpriseBuildPhases.find((phase) => phase.items.some((item) => item.status === 'Now'))

  return (
    <div className="section-stack">
      <section className="card build-hero">
        <div>
          <span className="eyebrow">Enterprise path</span>
          <h2>No-bullshit checklist to finished product</h2>
          <p>
            This is the operating scoreboard: foundation first, AI second, export third. Every checked item should represent something real,
            verified, and useful to DACK.
          </p>
        </div>
        <div className="build-progress">
          <strong>{progress}%</strong>
          <span>foundation progress</span>
        </div>
      </section>

      <div className="metrics-grid roadmap-metrics">
        <MetricCard icon={CheckCircle2} label="Done" value={done} note="Completed and verified" tone="green" />
        <MetricCard icon={ClipboardCheck} label="In Motion" value={now} note={activePhase ? activePhase.title : 'Ready to choose'} tone="blue" />
        <MetricCard icon={FileStack} label="Next Up" value={next} note="Near-term build scope" tone="amber" />
        <MetricCard icon={ShieldAlert} label="Enterprise Gates" value={4} note="RBAC, audit, tenants, backups" tone="red" />
        <MetricCard icon={Globe2} label="Later" value={later} note="Phase-gated, not forgotten" />
      </div>

      <section className="card">
        <CardHeader eyebrow="Phase Gates" title="Build Sequence We Are Holding Ourselves To" action={<Badge tone="Working Data Model">Live Checklist</Badge>} />
        <div className="phase-roadmap">
          {enterpriseBuildPhases.map((phase, index) => {
            const phaseDone = phase.items.filter((item) => item.status === 'Done').length
            const phaseProgress = Math.round((phaseDone / phase.items.length) * 100)

            return (
              <article className="phase-card" key={phase.title}>
                <div className="phase-number">{index + 1}</div>
                <div className="phase-content">
                  <div className="phase-head">
                    <div>
                      <h3>{phase.title}</h3>
                      <p>{phase.outcome}</p>
                    </div>
                    <Badge tone={phaseProgress === 100 ? 'Complete' : phase.items.some((item) => item.status === 'Now') ? 'In Progress' : 'Needs Review'}>
                      {phaseProgress}% complete
                    </Badge>
                  </div>
                  <div className="score-track"><span style={{ width: `${phaseProgress}%` }} /></div>
                  <div className="build-list">
                    {phase.items.map((item) => (
                      <article className={`build-item ${slug(item.status)}`} key={item.label}>
                        <span className="build-check">{item.status === 'Done' ? 'OK' : item.status === 'Now' ? 'GO' : ''}</span>
                        <div>
                          <strong>{item.label}</strong>
                          <span>{item.owner}</span>
                        </div>
                        <Badge tone={item.status}>{item.status}</Badge>
                      </article>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="card">
        <CardHeader eyebrow="Rules" title="Enterprise Grade Means These Cannot Be Faked" />
        <div className="rule-grid">
          <Panel title="Data Foundation" items={['Real Payload collections replace prototype data.', 'Every major record is tenant-scoped.', 'Payload admin is the data control room, not the main UX.']} />
          <Panel title="Security" items={['Rates and contracts are restricted from day one.', 'RBAC is required before live client data.', 'Sensitive actions create audit events.']} emphasis />
          <Panel title="AI" items={['AI outputs require citations.', 'Human review is mandatory before confirmation.', 'Use Strong / Partial / No evidence states.']} />
          <Panel title="Operations" items={['Background jobs handle heavy work.', 'Logs, metrics, backups, and restore checks are production requirements.', 'Export waits until templates and data model are stable.']} />
        </div>
      </section>
    </div>
  )
}

function RfpWorkspace() {
  const [selectedId, setSelectedId] = useState(rfps[0].id)
  const selectedRfp = rfps.find((rfp) => rfp.id === selectedId) ?? rfps[0]

  return (
    <div className="rfp-workspace">
      <section className="card rfp-selector">
        <CardHeader eyebrow="Analyzed RFPs" title="Intelligence Queue" />
        <div className="selector-list">
          {rfps.map((rfp) => (
            <button className={rfp.id === selectedId ? 'selector-card active' : 'selector-card'} key={rfp.id} type="button" onClick={() => setSelectedId(rfp.id)}>
              <span className="selector-title">
                <strong>{rfp.name}</strong>
                <ChevronRight size={18} aria-hidden="true" />
              </span>
              <span>{rfp.agency} · {formatCurrency(rfp.estimatedValue)} · Due {formatDate(rfp.dueDate)}</span>
              <span className="inline-badges">
                <Badge tone={rfp.recommendation}>{rfp.recommendation}</Badge>
                <Badge tone={rfp.riskLevel}>{rfp.riskLevel}</Badge>
              </span>
            </button>
          ))}
        </div>
      </section>

      <RfpDetail rfp={selectedRfp} />
    </div>
  )
}

function RfpDetail({ rfp }: { rfp: Rfp }) {
  return (
    <section className="card rfp-detail">
      <CardHeader
        eyebrow={`${rfp.agency} RFP Intelligence`}
        title={rfp.name}
        action={<Badge tone={rfp.recommendation}>{rfp.recommendation}</Badge>}
      />
      <p className="lead-copy">{rfp.summary}</p>

      <div className="summary-strip">
        <InfoTile label="Due Date" value={formatDate(rfp.dueDate)} />
        <InfoTile label="Questions Due" value={formatDate(rfp.questionDeadline)} />
        <InfoTile label="Internal Review" value={formatDate(rfp.internalReviewDate)} />
        <InfoTile label="Interview Window" value={rfp.interviewWindow} />
      </div>

      <div className="detail-grid">
        <Panel title="Go / No-Go Recommendation">
          <p>{rfp.recommendationReason}</p>
        </Panel>
        <Panel title="Key Requirements" items={rfp.keyRequirements} />
        <ChecklistPanel title="Required Forms" items={rfp.requiredForms} />
        <ChecklistPanel title="Compliance Checklist" items={rfp.complianceChecklist} />
        <TeamPanel title="Suggested Team" team={rfp.suggestedTeam} />
        <Panel title="Suggested Resumes" items={rfp.suggestedResumes} />
        <Panel title="Suggested Project Sheets" items={rfp.suggestedProjectSheets} />
        <Panel title="Gaps and Risks" items={rfp.gapsAndRisks} emphasis />
        <Panel title="Draft Proposal Outline" items={rfp.draftOutline} ordered />
        <Panel title="Next Recommended Actions" items={rfp.nextActions} emphasis />
      </div>
    </section>
  )
}

function ProposalAssemblyRoom() {
  const [selectedSectionId, setSelectedSectionId] = useState(proposalSections[2].id)
  const selected = proposalSections.find((section) => section.id === selectedSectionId) ?? proposalSections[0]

  return (
    <div className="assembly-room">
      <section className="card content-blocks">
        <CardHeader eyebrow="Available Content" title="Section Library" />
        {proposalSections.map((section) => (
          <button className={selected.id === section.id ? 'content-block active' : 'content-block'} key={section.id} type="button" onClick={() => setSelectedSectionId(section.id)}>
            <span>
              <strong>{section.title}</strong>
              <small>{section.type} · {section.source}</small>
            </span>
            <ReadinessBadge status={section.status} />
          </button>
        ))}
      </section>

      <section className="card outline-board">
        <CardHeader eyebrow="Assembly" title="Proposal Outline" action={<Badge tone="Working Data Model">Working Data Model</Badge>} />
        <div className="outline-list">
          {proposalSections.map((section, index) => (
            <button className={selected.id === section.id ? 'outline-item active' : 'outline-item'} key={section.id} type="button" onClick={() => setSelectedSectionId(section.id)}>
              <span className="outline-number">{index + 1}</span>
              <span>
                <strong>{section.title}</strong>
                <small>Owner: {section.owner}</small>
              </span>
              <ReadinessBadge status={section.status} />
            </button>
          ))}
        </div>
      </section>

      <section className="card section-detail">
        <CardHeader eyebrow="Selected Section" title={selected.title} action={<ReadinessBadge status={selected.status} />} />
        <div className="section-meta">
          <InfoTile label="Owner" value={selected.owner} />
          <InfoTile label="Content Type" value={selected.type} />
          <InfoTile label="Source" value={selected.source} />
        </div>
        <Panel title="Content Preview">
          <p>{selected.preview}</p>
        </Panel>
        <Panel title="System Recommendations" items={selected.recommendations} emphasis />
      </section>
    </div>
  )
}

function StaffingIntelligence() {
  return (
    <div className="section-stack">
      <section className="card">
        <CardHeader eyebrow="Team Builder" title="Selected Team, Coverage, and Fit" action={<div className="score-pill">{teamBuilder.fitScore}% Fit Score</div>} />
        <div className="team-builder">
          <Panel title="Selected Team">
            <div className="mini-records">
              {teamBuilder.selectedTeam.map((member) => (
                <article key={member.name}>
                  <strong>{member.name}</strong>
                  <span>{member.role} · {member.fit}% fit</span>
                  <p>{member.reason}</p>
                </article>
              ))}
            </div>
          </Panel>
          <Panel title="Missing Roles" items={teamBuilder.missingRoles} emphasis />
          <ChecklistPanel title="Certification Coverage" items={teamBuilder.certificationCoverage} />
          <Panel title="MWBE / WBE / SDVOB Participation">
            <div className="coverage-list">
              {teamBuilder.participationView.map((item) => (
                <article key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <ReadinessBadge status={item.status} />
                </article>
              ))}
            </div>
          </Panel>
        </div>
      </section>

      <div className="staff-grid">
        {staffResumes.map((staff) => {
          const expiring = daysUntil(staff.certificationExpirationDate) < 45
          const bestFit = Object.entries(staff.agencyFit).sort((a, b) => b[1] - a[1])[0]

          return (
            <article className="card staff-card" key={staff.id}>
              <div className="staff-heading">
                <div className="avatar">{staff.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</div>
                <div>
                  <h2>{staff.name}</h2>
                  <p>{staff.role} · {staff.yearsExperience} years</p>
                </div>
              </div>
              <div className="record-row">
                <span>Agency fit</span>
                <strong>{bestFit ? `${bestFit[0]} ${bestFit[1]}%` : 'Not scored'}</strong>
              </div>
              <div className="record-row">
                <span>Participation</span>
                <strong>{staff.participation}</strong>
              </div>
              <div className="record-row">
                <span>Availability</span>
                <strong>{staff.availability}</strong>
              </div>
              {expiring && (
                <div className="warning-inline">
                  <AlertTriangle size={16} aria-hidden="true" />
                  Certification expires {formatDate(staff.certificationExpirationDate)}
                </div>
              )}
              <TagGroup label="Certifications" tags={staff.certifications} />
              <TagGroup label="Resume Versions" tags={staff.resumeVersions} />
              <p className="recommendation-copy">{staff.recommendedUsage}</p>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function ProjectSheetMatching() {
  return (
    <section className="card">
      <CardHeader eyebrow="Selected RFP Match Set" title="Project Sheets Matched to Queens Courthouse Renovation" />
      <div className="project-grid">
        {projectSheets.map((sheet) => (
          <article className="project-card" key={sheet.id}>
            <div className="project-card-head">
              <div>
                <span className="eyebrow">{sheet.agency}</span>
                <h2>{sheet.projectName}</h2>
                <p>{sheet.projectType}</p>
              </div>
              <div className="relevance">{sheet.relevanceScore}%</div>
            </div>
            <p className="match-reason">{sheet.whyItMatches}</p>
            <div className="fact-row">
              <span>{sheet.year}</span>
              <span>{formatFullCurrency(sheet.value)}</span>
              <WebsiteBadge status={sheet.websiteStatus} />
            </div>
            <TagGroup label="Tags" tags={sheet.tags} />
            <div className="score-track">
              <span style={{ width: `${sheet.relevanceScore}%` }} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function PricingIntelligence() {
  return (
    <section className="card">
      <CardHeader eyebrow="Sensitive Pricing" title="Rate & Pricing Intelligence" action={<Badge tone="Sensitive Data Restricted">Sensitive Data Restricted</Badge>} />
      <div className="warning-banner">
        <LockKeyhole size={18} aria-hidden="true" />
        Rates, multipliers, and prime/sub pricing should be permission-controlled before live DACK deployment.
      </div>
      <DataTable
        headers={['Employee', 'Title', 'Agency', 'Bare Rate', 'Multiplier', 'Loaded Rate', 'Prime/Sub', 'Effective', 'Expiration', 'Access', 'Warning']}
        rows={rates.map((rate) => [
          <strong>{rate.employee}</strong>,
          rate.title,
          rate.agency,
          `$${rate.bareRate.toFixed(2)}`,
          `${rate.multiplier.toFixed(2)}x`,
          `$${rate.loadedRate.toFixed(2)}`,
          rate.primeSubRelationship,
          formatDate(rate.effectiveDate),
          formatDate(rate.expirationDate),
          <Badge tone={rate.accessLevel}>{rate.accessLevel}</Badge>,
          <Badge tone={rate.warning}>{rate.warning}</Badge>,
        ])}
      />
    </section>
  )
}

function AgencyAndTeamingMemory() {
  const [selectedAgency, setSelectedAgency] = useState<Agency>('DDC')
  const selected = agencyMemory.find((memory) => memory.agency === selectedAgency) ?? agencyMemory[0]

  return (
    <div className="memory-layout">
      <section className="card agency-tabs">
        <CardHeader eyebrow="Institutional Knowledge" title="Agency Memory" />
        {agencyMemory.map((memory) => (
          <button className={memory.agency === selectedAgency ? 'agency-tab active' : 'agency-tab'} key={memory.agency} type="button" onClick={() => setSelectedAgency(memory.agency)}>
            <Building2 size={18} aria-hidden="true" />
            {memory.agency}
          </button>
        ))}
      </section>

      <section className="card">
        <CardHeader eyebrow={`${selected.agency} Playbook`} title="Requirements, Outcomes, Teaming, and Strategy" />
        <div className="detail-grid">
          <Panel title="Agency Notes" items={selected.notes} />
          <Panel title="Recurring Requirements" items={selected.recurringRequirements} />
          <Panel title="Past Proposal Outcomes" items={selected.pastOutcomes} />
          <Panel title="Teaming Partner Notes" items={selected.teamingPartnerNotes} />
          <Panel title="Internal Warnings" items={selected.internalWarnings} emphasis />
          <Panel title="Proposal Strategy Reminders" items={selected.strategyReminders} />
        </div>
      </section>
    </div>
  )
}

function MarketingOperations() {
  const missingWebsite = projectSheets.filter((sheet) => sheet.websiteStatus !== 'On Website')
  const homepageProjects = projectSheets.filter((sheet) => sheet.relevanceScore >= 87)

  return (
    <div className="section-stack">
      <div className="marketing-grid">
        <section className="card">
          <CardHeader eyebrow="Budget" title="Marketing Budget Tracker" />
          <div className="budget-list">
            {marketingBudget.map((item) => {
              const used = Math.round(((item.spent + item.committed) / item.budget) * 100)
              return (
                <article key={item.category}>
                  <div className="budget-head">
                    <strong>{item.category}</strong>
                    <span>{used}% used / committed</span>
                  </div>
                  <div className="score-track"><span style={{ width: `${used}%` }} /></div>
                  <p>{formatFullCurrency(item.spent)} spent · {formatFullCurrency(item.committed)} committed · {item.note}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="card">
          <CardHeader eyebrow="Inventory" title="Collateral Inventory" />
          <div className="inventory-list">
            {inventory.map((item) => (
              <article key={item.item}>
                <Boxes size={18} aria-hidden="true" />
                <div>
                  <strong>{item.item}</strong>
                  <span>{item.onHand} on hand · reorder at {item.reorderPoint} · Owner: {item.owner}</span>
                </div>
                {item.onHand < item.reorderPoint && <Badge tone="Medium">Reorder</Badge>}
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="marketing-grid">
        <section className="card">
          <CardHeader eyebrow="Receipts" title="Receipt Log Placeholder" />
          <Panel title="Pending Receipt Workflow" items={receiptLogPlaceholders} />
        </section>

        <section className="card">
          <CardHeader eyebrow="Website" title="Website Recommendations" />
          <div className="recommendation-list">
            {marketingRecommendations.map((item) => (
              <article key={item.title}>
                <SeverityBadge severity={item.priority} />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.reason}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="card">
        <CardHeader eyebrow="Pursuit-Driven Content" title="Project Sheets Missing From Website and Homepage Feature Candidates" />
        <div className="two-column">
          <Panel title="Missing or Needs Update" items={missingWebsite.map((sheet) => `${sheet.projectName} - ${sheet.websiteStatus}`)} emphasis />
          <Panel title="Suggested Homepage Feature Projects" items={homepageProjects.map((sheet) => `${sheet.projectName} - supports ${sheet.agency} pursuits`)} />
        </div>
      </section>
    </div>
  )
}

function AlertsActionCenter() {
  return (
    <section className="card">
      <CardHeader eyebrow="Action Center" title="Prioritized Alerts With Recommended Actions" />
      <div className="alert-table">
        {alerts.map((alert) => (
          <article className="action-alert" key={alert.id}>
            <SeverityBadge severity={alert.severity} />
            <div>
              <div className="alert-heading">
                <h3>{alert.title}</h3>
                <Badge tone={alert.category}>{alert.category}</Badge>
              </div>
              <p>{alert.recommendedAction}</p>
              <span>Owner: {alert.owner} · Due {formatDate(alert.dueDate)} · Related: {alert.relatedRecord}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ActivationPanel() {
  return (
    <div className="section-stack">
      <section className="card activation-hero">
        <div>
          <span className="eyebrow">Ready for DACK Data</span>
          <h2>Platform Preview Using a Working Data Model</h2>
          <p>
            Current data is sample data and remains local in this platform preview. The structure is prepared to replace these examples with
            DACK’s real proposal tracker, resumes, project sheets, rate sheets, active RFPs, reusable content, website inventory, and
            marketing records.
          </p>
        </div>
        <Badge tone="Ready for DACK Data">Ready for DACK Data</Badge>
      </section>

      <section className="card">
        <CardHeader eyebrow="Activation Checklist" title="Files Needed to Replace Sample Data" />
        <DataTable
          headers={['Data Area', 'Files Needed', 'Status', 'Activation Notes']}
          rows={activationChecklist.map((item) => [
            <strong>{item.source}</strong>,
            item.filesNeeded,
            <Badge tone={item.status}>{item.status}</Badge>,
            item.notes,
          ])}
        />
      </section>
    </div>
  )
}

function InfoTile({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="info-tile">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function Panel({
  title,
  children,
  items,
  emphasis = false,
  ordered = false,
}: {
  title: string
  children?: ReactNode
  items?: string[]
  emphasis?: boolean
  ordered?: boolean
}) {
  const ListTag = ordered ? 'ol' : 'ul'
  return (
    <div className={emphasis ? 'panel emphasis' : 'panel'}>
      <h3>{title}</h3>
      {children}
      {items && (
        <ListTag>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ListTag>
      )}
    </div>
  )
}

function ChecklistPanel({ title, items }: { title: string; items: { item: string; status: Readiness; owner: string }[] }) {
  return (
    <div className="panel">
      <h3>{title}</h3>
      <div className="checklist-list">
        {items.map((item) => (
          <article key={item.item}>
            <ReadinessBadge status={item.status} />
            <div>
              <strong>{item.item}</strong>
              <span>Owner: {item.owner}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function TeamPanel({ title, team }: { title: string; team: { name: string; role: string; fit: number; reason: string }[] }) {
  return (
    <div className="panel">
      <h3>{title}</h3>
      <div className="mini-records">
        {team.map((member) => (
          <article key={member.name}>
            <strong>{member.name}</strong>
            <span>{member.role} · {member.fit}% fit</span>
            <p>{member.reason}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

function TagGroup({ label, tags }: { label: string; tags: string[] }) {
  return (
    <div className="tag-group">
      <span>{label}</span>
      <div>
        {tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </div>
  )
}

function DataTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function CommandCenter() {
  const [activeSection, setActiveSection] = useState<SectionKey>('roadmap')
  const activeNav = useMemo(
    () => navigation.find((item) => item.id === activeSection) ?? navigation[0],
    [activeSection],
  )

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-box">DACK</div>
          <div>
            <strong>Proposal Command Center</strong>
            <span>Marketing workspace</span>
          </div>
        </div>
        <div className="workspace-status">
          <span>Live workspace</span>
          <strong>12 modules mapped</strong>
        </div>
        <nav aria-label="Primary navigation">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <button className={item.id === activeSection ? 'nav-item active' : 'nav-item'} key={item.id} type="button" onClick={() => setActiveSection(item.id)}>
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
        <div className="sidebar-note">
          <PanelLeft size={18} aria-hidden="true" />
          <span>Working Data Model structured for DACK proposal, rate, resume, project, and marketing files.</span>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <span className="eyebrow">DACK Consulting Solutions</span>
            <h1>{activeNav.label}</h1>
            <p>{subtitles[activeSection]}</p>
          </div>
          <div className="topbar-actions">
            <div className="search-control">
              <Search size={16} aria-hidden="true" />
              <span>Search pursuits, staff, rates, forms, project sheets</span>
            </div>
            <Link className="toolbar-button amber" href="/report-automation">
              <Bot size={16} aria-hidden="true" />
              Report automation
            </Link>
            <button className="toolbar-button" type="button">
              <UploadCloud size={16} aria-hidden="true" />
              Import RFP
            </button>
            <button className="toolbar-button primary" type="button">
              <Plus size={16} aria-hidden="true" />
              New proposal
            </button>
          </div>
        </header>

        <div className="content">
          {activeSection === 'executive' && <ExecutiveCommandCenter />}
          {activeSection === 'roadmap' && <EnterpriseBuildChecklist />}
          {activeSection === 'rfp' && <RfpWorkspace />}
          {activeSection === 'assembly' && <ProposalAssemblyRoom />}
          {activeSection === 'staffing' && <StaffingIntelligence />}
          {activeSection === 'projects' && <ProjectSheetMatching />}
          {activeSection === 'pricing' && <PricingIntelligence />}
          {activeSection === 'memory' && <AgencyAndTeamingMemory />}
          {activeSection === 'marketing' && <MarketingOperations />}
          {activeSection === 'actions' && <AlertsActionCenter />}
          {activeSection === 'activation' && <ActivationPanel />}
        </div>
      </main>
    </div>
  )
}
