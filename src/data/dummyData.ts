export type Agency = 'DDC' | 'DASNY' | 'MTA' | 'OGS' | 'NYCHA'
export type Severity = 'High' | 'Medium' | 'Low'
export type RiskLevel = 'High Risk' | 'Medium Risk' | 'Low Risk'
export type WebsiteStatus = 'On Website' | 'Missing From Website' | 'Needs Update'
export type Readiness = 'Complete' | 'In Progress' | 'Needs Review' | 'Missing'

export interface ChecklistItem {
  item: string
  status: Readiness
  owner: string
}

export interface TeamSuggestion {
  name: string
  role: string
  fit: number
  reason: string
}

export interface Rfp {
  id: string
  name: string
  agency: Agency
  dueDate: string
  questionDeadline: string
  internalReviewDate: string
  interviewWindow: string
  status: 'New Intake' | 'Analyzed' | 'Leadership Review' | 'In Assembly' | 'Submission Review'
  riskLevel: RiskLevel
  estimatedValue: number
  recommendation: 'Go' | 'Go With Conditions' | 'No-Go Review'
  recommendationReason: string
  summary: string
  keyRequirements: string[]
  requiredForms: ChecklistItem[]
  complianceChecklist: ChecklistItem[]
  suggestedTeam: TeamSuggestion[]
  suggestedResumes: string[]
  suggestedProjectSheets: string[]
  gapsAndRisks: string[]
  draftOutline: string[]
  nextActions: string[]
  intelligenceNotes: string[]
}

export interface ProposalRecord {
  id: string
  number: string
  title: string
  agency: Agency
  lead: string
  dueDate: string
  status: 'Planning' | 'Drafting' | 'Internal Review' | 'Submitted' | 'Shortlisted' | 'Awarded' | 'Not Selected'
  outcome: 'Pending' | 'Won' | 'Lost' | 'Shortlisted'
  proposedValue: number
  awardedValue: number
  riskLevel: RiskLevel
}

export interface ProposalSection {
  id: string
  title: string
  type: 'Narrative' | 'Compliance' | 'Pricing' | 'Appendix'
  status: Readiness
  owner: string
  source: string
  preview: string
  recommendations: string[]
}

export interface StaffResume {
  id: string
  name: string
  role: string
  yearsExperience: number
  certifications: string[]
  certificationExpirationDate: string
  agencyFit: Partial<Record<Agency, number>>
  resumeVersions: string[]
  recommendedUsage: string
  participation: 'Prime Staff' | 'MBE Partner' | 'WBE Partner' | 'SDVOB Partner' | 'Subconsultant'
  availability: 'Available' | 'Limited' | 'Needs Confirmation'
}

export interface TeamBuilder {
  selectedTeam: TeamSuggestion[]
  missingRoles: string[]
  certificationCoverage: ChecklistItem[]
  participationView: { label: string; value: string; status: Readiness }[]
  fitScore: number
}

export interface ProjectSheet {
  id: string
  projectName: string
  agency: Agency
  projectType: string
  year: number
  value: number
  relevanceScore: number
  whyItMatches: string
  tags: string[]
  websiteStatus: WebsiteStatus
}

export interface RateRecord {
  id: string
  employee: string
  title: string
  agency: Agency
  bareRate: number
  multiplier: number
  loadedRate: number
  primeSubRelationship: 'Prime' | 'Subconsultant' | 'Teaming Partner'
  effectiveDate: string
  expirationDate: string
  accessLevel: 'Leadership' | 'Proposal Leads' | 'Finance Only' | 'Restricted'
  warning: 'Current' | 'Expired rate' | 'Rate review needed' | 'Sensitive data restricted'
}

export interface AgencyMemory {
  agency: Agency
  notes: string[]
  recurringRequirements: string[]
  pastOutcomes: string[]
  teamingPartnerNotes: string[]
  internalWarnings: string[]
  strategyReminders: string[]
}

export interface MarketingBudgetItem {
  category: string
  budget: number
  spent: number
  committed: number
  note: string
}

export interface InventoryItem {
  item: string
  onHand: number
  reorderPoint: number
  owner: string
}

export interface MarketingRecommendation {
  title: string
  reason: string
  priority: Severity
}

export interface AlertItem {
  id: string
  severity: Severity
  category: string
  title: string
  owner: string
  dueDate: string
  recommendedAction: string
  relatedRecord: string
}

export interface ActivationItem {
  source: string
  filesNeeded: string
  status: 'Ready to Map' | 'Needs Owner' | 'Optional Later'
  notes: string
}

export const rfps: Rfp[] = [
  {
    id: 'rfp-ddc-courthouse',
    name: 'Queens Courthouse Renovation CM Services',
    agency: 'DDC',
    dueDate: '2026-06-05',
    questionDeadline: '2026-05-27',
    internalReviewDate: '2026-06-02',
    interviewWindow: 'Late June 2026',
    status: 'In Assembly',
    riskLevel: 'Medium Risk',
    estimatedValue: 4200000,
    recommendation: 'Go',
    recommendationReason:
      'Strong alignment with DACK public-building renovation experience and several reusable courthouse-adjacent project sheets.',
    summary:
      'The RFP appears to request construction management services for a phased courthouse renovation in an occupied public building. The response should emphasize agency reporting, phasing, MEP coordination, public access controls, and certified participation commitments.',
    keyRequirements: [
      'Occupied civic facility renovation experience',
      'DDC reporting, scheduling, and project controls',
      'MWBE participation plan with clear subconsultant roles',
      'Key staff resumes showing courthouse or public-building experience',
    ],
    requiredForms: [
      { item: 'Acknowledgement of Addenda', status: 'Complete', owner: 'Proposal Ops' },
      { item: 'MWBE Utilization Plan', status: 'Needs Review', owner: 'Maya Patel' },
      { item: 'Staffing Matrix', status: 'In Progress', owner: 'Jordan Lee' },
      { item: 'Insurance Certification', status: 'Missing', owner: 'Finance' },
      { item: 'Iran Divestment Certification', status: 'Complete', owner: 'Proposal Ops' },
    ],
    complianceChecklist: [
      { item: 'Confirm DDC form package matches latest addendum', status: 'Needs Review', owner: 'Proposal Ops' },
      { item: 'Validate pre-approved rate candidates', status: 'In Progress', owner: 'Finance' },
      { item: 'Attach WBE/MBE commitment letters', status: 'Missing', owner: 'Maya Patel' },
      { item: 'Confirm required insurance language', status: 'Missing', owner: 'Finance' },
    ],
    suggestedTeam: [
      { name: 'Maya Patel', role: 'Principal-in-Charge', fit: 94, reason: 'DDC executive oversight and public building QA history' },
      { name: 'Jordan Lee', role: 'Senior Construction Manager', fit: 91, reason: 'Occupied renovation and DDC controls experience' },
      { name: 'Nina Thompson', role: 'Historic Preservation Specialist', fit: 87, reason: 'Historic interiors and public-access renovation background' },
      { name: 'Brightline Estimating', role: 'WBE Cost Estimating Partner', fit: 82, reason: 'Adds WBE coverage and estimating capacity' },
    ],
    suggestedResumes: ['Maya Patel - DDC Executive Resume', 'Jordan Lee - Public Buildings Resume', 'Nina Thompson - Historic Renovation Resume'],
    suggestedProjectSheets: [
      'Queens Family Court MEP Modernization',
      'Brooklyn Civic Center Envelope Renewal',
      'Bronx Borough Hall Historic Interior Repairs',
    ],
    gapsAndRisks: [
      'Insurance certification wording is not yet confirmed.',
      'WBE participation may need a stronger named role.',
      'Courthouse phasing narrative should be tailored before internal review.',
    ],
    draftOutline: [
      'Cover Letter',
      'Understanding of the Assignment',
      'Occupied Courthouse Phasing Plan',
      'Project Controls and Reporting',
      'Staffing and Subconsultant Plan',
      'Relevant Public Building Experience',
      'Required Forms and Certifications',
    ],
    nextActions: [
      'Request updated insurance wording from Finance.',
      'Confirm WBE cost estimating partner availability.',
      'Insert courthouse-specific phasing language into technical approach.',
    ],
    intelligenceNotes: [
      'DDC proposals should use pre-approved rate candidates where available.',
      'This RFP may require additional WBE participation.',
    ],
  },
  {
    id: 'rfp-mta-transit',
    name: 'MTA Transit Station Accessibility Upgrade',
    agency: 'MTA',
    dueDate: '2026-05-29',
    questionDeadline: '2026-05-23',
    internalReviewDate: '2026-05-27',
    interviewWindow: 'Mid June 2026',
    status: 'Submission Review',
    riskLevel: 'High Risk',
    estimatedValue: 9100000,
    recommendation: 'Go With Conditions',
    recommendationReason:
      'High strategic value and strong transit references, but certification and key-personnel commitments must be resolved before submission.',
    summary:
      'The RFP appears focused on station accessibility improvements, vertical circulation, safety planning, track access coordination, and construction communication in active transit environments.',
    keyRequirements: [
      'Transit facility construction management',
      'Track access and night-work controls',
      'ADA accessibility upgrade experience',
      'Safety record and public communication plan',
    ],
    requiredForms: [
      { item: 'Safety Record Form', status: 'Complete', owner: 'Alex Rivera' },
      { item: 'DBE Participation Schedule', status: 'In Progress', owner: 'Proposal Ops' },
      { item: 'Key Personnel Commitment', status: 'Needs Review', owner: 'Leadership' },
      { item: 'Cost Proposal Template', status: 'Complete', owner: 'Finance' },
    ],
    complianceChecklist: [
      { item: 'Track Safety certification valid through RFP period', status: 'Needs Review', owner: 'Alex Rivera' },
      { item: 'DBE partner role clearly described', status: 'In Progress', owner: 'Proposal Ops' },
      { item: 'Night-work staffing coverage confirmed', status: 'Needs Review', owner: 'Leadership' },
      { item: 'Rate sheet matches MTA format', status: 'Complete', owner: 'Finance' },
    ],
    suggestedTeam: [
      { name: 'Alex Rivera', role: 'Transit Construction Lead', fit: 96, reason: 'Station renewal and track-access leadership' },
      { name: 'Priya Shah', role: 'Safety Manager', fit: 90, reason: 'Transit safety planning and field audits' },
      { name: 'Jordan Lee', role: 'Project Controls Lead', fit: 86, reason: 'Reporting discipline and schedule controls' },
      { name: 'Metro Access Partners', role: 'DBE Accessibility Advisor', fit: 84, reason: 'Adds DBE participation and ADA specialty depth' },
    ],
    suggestedResumes: ['Alex Rivera - Transit Resume', 'Priya Shah - Safety Resume', 'Jordan Lee - Controls Resume'],
    suggestedProjectSheets: [
      'Lexington Avenue Station Platform Renewal',
      'Jamaica Station Vertical Circulation Improvements',
      'Canarsie Line Signal Room Upgrade',
    ],
    gapsAndRisks: [
      'Alex Rivera certification expires before the current RFP deadline.',
      'DBE participation percentage needs final confirmation.',
      'Final proposal needs a stronger night-work logistics graphic.',
    ],
    draftOutline: [
      'Cover Letter',
      'Project Understanding',
      'Transit Safety and Access Plan',
      'ADA Upgrade Approach',
      'Staffing Plan',
      'Relevant Station Experience',
      'Required Forms',
      'Rate Sheet',
    ],
    nextActions: [
      'Confirm Alex Rivera certification renewal by May 24.',
      'Request final DBE commitment percentage.',
      'Move rate sheet to final finance review.',
    ],
    intelligenceNotes: [
      'One certification expires before a current RFP deadline.',
      'MTA pursuits should lead with safety, access, and disruption control.',
    ],
  },
  {
    id: 'rfp-dasny-school',
    name: 'SUNY Residence Hall Capital Program Support',
    agency: 'DASNY',
    dueDate: '2026-06-18',
    questionDeadline: '2026-06-03',
    internalReviewDate: '2026-06-14',
    interviewWindow: 'July 2026',
    status: 'Leadership Review',
    riskLevel: 'Medium Risk',
    estimatedValue: 6800000,
    recommendation: 'Go With Conditions',
    recommendationReason:
      'Good program-management fit, but the library needs a stronger residence hall project sheet and DASNY rate format confirmation.',
    summary:
      'The RFP appears to seek program support across multiple campus capital projects, with emphasis on planning, budget controls, constructability review, and stakeholder coordination.',
    keyRequirements: [
      'Higher education and campus housing experience',
      'Multi-project capital program controls',
      'Constructability and cost review',
      'DASNY form package compliance',
    ],
    requiredForms: [
      { item: 'Technical Proposal Forms', status: 'Complete', owner: 'Elena Brooks' },
      { item: 'Cost Proposal Forms', status: 'Needs Review', owner: 'Finance' },
      { item: 'Procurement Lobbying Certification', status: 'Complete', owner: 'Proposal Ops' },
      { item: 'Vendor Responsibility Questionnaire', status: 'Missing', owner: 'Operations' },
    ],
    complianceChecklist: [
      { item: 'Residence hall reference included', status: 'Needs Review', owner: 'Marketing' },
      { item: 'DASNY rate template validated', status: 'Needs Review', owner: 'Finance' },
      { item: 'Senior scheduler availability confirmed', status: 'Missing', owner: 'Leadership' },
    ],
    suggestedTeam: [
      { name: 'Elena Brooks', role: 'Program Manager', fit: 88, reason: 'Campus capital program background' },
      { name: 'Morgan Chen', role: 'Cost Controls Lead', fit: 85, reason: 'Budget controls and reporting strength' },
      { name: 'Samir Grant', role: 'Scheduler', fit: 80, reason: 'Multi-project scheduling experience' },
    ],
    suggestedResumes: ['Elena Brooks - Campus Program Resume', 'Morgan Chen - Cost Controls Resume', 'Samir Grant - Scheduler Resume'],
    suggestedProjectSheets: [
      'SUNY Dormitory HVAC Replacement',
      'Albany Campus Science Building Renewal',
      'State University Library Swing Space Program',
    ],
    gapsAndRisks: [
      'Vendor responsibility questionnaire is not yet assembled.',
      'Residence hall experience should be strengthened in relevant experience.',
      'Scheduler availability is not confirmed.',
    ],
    draftOutline: [
      'Cover Letter',
      'Program Management Approach',
      'Campus Coordination Plan',
      'Budget and Schedule Controls',
      'Relevant Higher Education Experience',
      'Staffing Plan',
      'DASNY Forms',
    ],
    nextActions: [
      'Confirm scheduler availability.',
      'Add residence hall content to project sheet library.',
      'Validate DASNY rate format with Finance.',
    ],
    intelligenceNotes: [
      'DASNY responses should include clear stakeholder coordination language.',
      'A residence hall project sheet needs update before final assembly.',
    ],
  },
  {
    id: 'rfp-ogs-historic',
    name: 'Historic State Office Building CM Term Agreement',
    agency: 'OGS',
    dueDate: '2026-07-02',
    questionDeadline: '2026-06-12',
    internalReviewDate: '2026-06-27',
    interviewWindow: 'Late July 2026',
    status: 'Analyzed',
    riskLevel: 'Low Risk',
    estimatedValue: 3500000,
    recommendation: 'Go',
    recommendationReason:
      'Strong historic-building alignment, manageable deadline, and clear reuse path from existing project sheets.',
    summary:
      'The RFP appears to request term construction management support for historic state office facilities, including task-order controls, accessibility upgrades, code compliance, and tenant coordination.',
    keyRequirements: [
      'Historic preservation sensitivity',
      'Task-order management',
      'Accessibility and code compliance',
      'Public-sector CM references',
    ],
    requiredForms: [
      { item: 'Firm Experience Matrix', status: 'Complete', owner: 'Nina Thompson' },
      { item: 'SDVOB Participation Form', status: 'Needs Review', owner: 'Proposal Ops' },
      { item: 'References', status: 'In Progress', owner: 'Marketing' },
      { item: 'Non-Collusive Bidding Certification', status: 'Complete', owner: 'Proposal Ops' },
    ],
    complianceChecklist: [
      { item: 'SDVOB partner confirmed', status: 'Needs Review', owner: 'Leadership' },
      { item: 'Historic specialist resume updated', status: 'Complete', owner: 'Nina Thompson' },
      { item: 'Term agreement controls narrative drafted', status: 'In Progress', owner: 'Maya Patel' },
    ],
    suggestedTeam: [
      { name: 'Nina Thompson', role: 'Historic Preservation Lead', fit: 95, reason: 'Direct historic building renovation experience' },
      { name: 'Maya Patel', role: 'QA Principal', fit: 89, reason: 'Public agency executive oversight' },
      { name: 'Empire Veteran Services', role: 'SDVOB Partner', fit: 78, reason: 'Potential SDVOB compliance support' },
    ],
    suggestedResumes: ['Nina Thompson - Historic Resume', 'Maya Patel - Agency CM Resume'],
    suggestedProjectSheets: [
      'Bronx Borough Hall Historic Interior Repairs',
      'Brooklyn Civic Center Envelope Renewal',
      'State Capitol Annex Accessibility Improvements',
    ],
    gapsAndRisks: [
      'SDVOB partner role requires confirmation.',
      'Term agreement controls language needs sharpening.',
    ],
    draftOutline: [
      'Cover Letter',
      'Term Agreement Management',
      'Historic Building Approach',
      'Task Order Controls',
      'Quality Assurance',
      'Relevant Experience',
      'Forms and Certifications',
    ],
    nextActions: [
      'Confirm SDVOB partner availability.',
      'Feature historic project sheets on website before shortlist period.',
      'Draft task-order workflow language.',
    ],
    intelligenceNotes: [
      'Two project sheets related to historic buildings are missing from the website.',
      'OGS term agreements should show task-order discipline early in the proposal.',
    ],
  },
]

export const proposals: ProposalRecord[] = [
  { id: 'p1', number: 'DACK-26031', title: 'Queens Courthouse Renovation CM Services', agency: 'DDC', lead: 'Maya Patel', dueDate: '2026-06-05', status: 'Drafting', outcome: 'Pending', proposedValue: 4200000, awardedValue: 0, riskLevel: 'Medium Risk' },
  { id: 'p2', number: 'DACK-26027', title: 'MTA Transit Station Accessibility Upgrade', agency: 'MTA', lead: 'Alex Rivera', dueDate: '2026-05-29', status: 'Internal Review', outcome: 'Pending', proposedValue: 9100000, awardedValue: 0, riskLevel: 'High Risk' },
  { id: 'p3', number: 'DACK-26022', title: 'Brooklyn School Capital Improvements', agency: 'DDC', lead: 'Morgan Chen', dueDate: '2026-05-08', status: 'Shortlisted', outcome: 'Shortlisted', proposedValue: 3100000, awardedValue: 0, riskLevel: 'Low Risk' },
  { id: 'p4', number: 'DACK-26016', title: 'State Office Building Envelope Repairs', agency: 'OGS', lead: 'Nina Thompson', dueDate: '2026-04-17', status: 'Awarded', outcome: 'Won', proposedValue: 1850000, awardedValue: 1850000, riskLevel: 'Low Risk' },
  { id: 'p5', number: 'DACK-26011', title: 'Housing Development HVAC Renovation', agency: 'NYCHA', lead: 'Lena Ortiz', dueDate: '2026-03-26', status: 'Not Selected', outcome: 'Lost', proposedValue: 2400000, awardedValue: 0, riskLevel: 'Medium Risk' },
  { id: 'p6', number: 'DACK-26009', title: 'DASNY Campus Laboratory Upgrade', agency: 'DASNY', lead: 'Elena Brooks', dueDate: '2026-03-14', status: 'Awarded', outcome: 'Won', proposedValue: 2600000, awardedValue: 2600000, riskLevel: 'Low Risk' },
]

export const proposalSections: ProposalSection[] = [
  { id: 'cover', title: 'Cover Letter', type: 'Narrative', status: 'In Progress', owner: 'Maya Patel', source: 'Reusable leadership letter + RFP-specific value points', preview: 'Positions DACK as a practical construction management partner with direct public-agency renovation experience and a disciplined submission plan.', recommendations: ['Add named principal commitment.', 'Mention courthouse phasing and agency reporting in the opening paragraph.'] },
  { id: 'firm', title: 'Firm Overview', type: 'Narrative', status: 'Complete', owner: 'Marketing', source: 'Approved firm profile library', preview: 'Concise DACK profile, market focus, proposal controls, and public-sector experience summary.', recommendations: ['Keep to one page for DDC.', 'Use current headcount and certification language.'] },
  { id: 'understanding', title: 'Project Understanding', type: 'Narrative', status: 'Needs Review', owner: 'Jordan Lee', source: 'RFP intelligence summary', preview: 'Explains occupied-building constraints, public access, court operations, MEP interfaces, and expected stakeholder coordination.', recommendations: ['Add two courthouse-specific risks.', 'Reference addendum language before final review.'] },
  { id: 'approach', title: 'Technical Approach', type: 'Narrative', status: 'In Progress', owner: 'Jordan Lee', source: 'Approach block library', preview: 'Phased CM approach covering kickoff, controls, logistics, QA, safety, and closeout.', recommendations: ['Insert schedule-control graphic.', 'Add issue escalation workflow.'] },
  { id: 'staffing', title: 'Staffing Plan', type: 'Narrative', status: 'Needs Review', owner: 'Maya Patel', source: 'Team builder', preview: 'Proposed team structure with DACK leadership, field CM coverage, historic specialist, and WBE estimating partner.', recommendations: ['Confirm WBE partner hours.', 'Attach key personnel availability statements.'] },
  { id: 'experience', title: 'Relevant Experience', type: 'Narrative', status: 'In Progress', owner: 'Marketing', source: 'Project sheet matching engine', preview: 'Uses courthouse, civic center, and historic public-building projects as the primary relevant experience set.', recommendations: ['Update website status for historic sheets.', 'Use DDC project first.'] },
  { id: 'forms', title: 'Required Forms', type: 'Compliance', status: 'Missing', owner: 'Proposal Ops', source: 'RFP form checklist', preview: 'Form package includes addenda, MWBE plan, staffing matrix, insurance, and procurement certifications.', recommendations: ['Resolve insurance certificate language.', 'Attach MWBE commitment letters.'] },
  { id: 'rates', title: 'Rate Sheet', type: 'Pricing', status: 'Needs Review', owner: 'Finance', source: 'Rate & Pricing Intelligence', preview: 'Draft rate sheet uses DDC candidate rates and flags restricted finance-only data.', recommendations: ['Confirm pre-approved rate candidates.', 'Hide restricted staff rates from general users.'] },
  { id: 'appendices', title: 'Appendices', type: 'Appendix', status: 'In Progress', owner: 'Proposal Ops', source: 'Resume and certificate library', preview: 'Appendices collect resumes, certifications, insurance, subconsultant letters, and project references.', recommendations: ['Refresh expiring certificates.', 'Use only current resume versions.'] },
]

export const staffResumes: StaffResume[] = [
  { id: 's1', name: 'Maya Patel', role: 'Principal-in-Charge', yearsExperience: 22, certifications: ['PMP', 'MWBE participation planning'], certificationExpirationDate: '2027-02-15', agencyFit: { DDC: 94, OGS: 89, DASNY: 82 }, resumeVersions: ['Executive', 'DDC Public Buildings', 'Historic CM'], recommendedUsage: 'Use for executive oversight, quality assurance, and public agency confidence.', participation: 'Prime Staff', availability: 'Available' },
  { id: 's2', name: 'Jordan Lee', role: 'Senior Construction Manager', yearsExperience: 18, certifications: ['OSHA 30', 'CMIT'], certificationExpirationDate: '2026-06-20', agencyFit: { DDC: 91, MTA: 86, NYCHA: 78 }, resumeVersions: ['Public Buildings', 'Transit Controls', 'Short Form'], recommendedUsage: 'Use for occupied-building delivery, project controls, and field management.', participation: 'Prime Staff', availability: 'Available' },
  { id: 's3', name: 'Alex Rivera', role: 'Transit Construction Lead', yearsExperience: 16, certifications: ['OSHA 30', 'Track Safety'], certificationExpirationDate: '2026-05-31', agencyFit: { MTA: 96, DDC: 76 }, resumeVersions: ['Transit', 'Safety', 'Station Renewal'], recommendedUsage: 'Use for transit station work, track access coordination, and safety narratives.', participation: 'Prime Staff', availability: 'Needs Confirmation' },
  { id: 's4', name: 'Nina Thompson', role: 'Historic Preservation Specialist', yearsExperience: 14, certifications: ['LEED AP', 'Historic masonry training'], certificationExpirationDate: '2026-07-09', agencyFit: { OGS: 95, DDC: 87 }, resumeVersions: ['Historic Buildings', 'Envelope', 'Public Agency'], recommendedUsage: 'Use for historic building pursuits and preservation-sensitive renovation scopes.', participation: 'Prime Staff', availability: 'Limited' },
  { id: 's5', name: 'Brightline Estimating', role: 'Cost Estimating Partner', yearsExperience: 12, certifications: ['WBE', 'Cost estimating'], certificationExpirationDate: '2026-12-31', agencyFit: { DDC: 82, DASNY: 80 }, resumeVersions: ['WBE Cost Lead', 'Public Agency Estimating'], recommendedUsage: 'Use where WBE participation and estimating depth are both needed.', participation: 'WBE Partner', availability: 'Available' },
  { id: 's6', name: 'Empire Veteran Services', role: 'Field Support Partner', yearsExperience: 10, certifications: ['SDVOB'], certificationExpirationDate: '2026-10-15', agencyFit: { OGS: 78, DASNY: 72 }, resumeVersions: ['SDVOB Partner Profile', 'Field Support'], recommendedUsage: 'Use for OGS and state pursuits where SDVOB participation is scored.', participation: 'SDVOB Partner', availability: 'Needs Confirmation' },
]

export const teamBuilder: TeamBuilder = {
  selectedTeam: rfps[0].suggestedTeam,
  missingRoles: ['Insurance certificate owner', 'WBE commitment signatory', 'Backup scheduler'],
  certificationCoverage: [
    { item: 'OSHA 30 coverage', status: 'Complete', owner: 'Jordan Lee' },
    { item: 'WBE participation', status: 'Needs Review', owner: 'Brightline Estimating' },
    { item: 'Historic specialist', status: 'Complete', owner: 'Nina Thompson' },
    { item: 'Insurance documentation', status: 'Missing', owner: 'Finance' },
  ],
  participationView: [
    { label: 'Prime DACK staff', value: '3 named roles', status: 'Complete' },
    { label: 'WBE participation', value: 'Cost estimating partner proposed', status: 'Needs Review' },
    { label: 'MBE participation', value: 'To be confirmed', status: 'Missing' },
    { label: 'SDVOB participation', value: 'Not required for selected DDC pursuit', status: 'Complete' },
  ],
  fitScore: 88,
}

export const projectSheets: ProjectSheet[] = [
  { id: 'ps1', projectName: 'Queens Family Court MEP Modernization', agency: 'DDC', projectType: 'Courthouse MEP upgrade', year: 2023, value: 18800000, relevanceScore: 96, whyItMatches: 'Direct courthouse environment, phased MEP upgrades, and occupied public access controls.', tags: ['Courthouse', 'MEP', 'Phasing', 'DDC'], websiteStatus: 'Needs Update' },
  { id: 'ps2', projectName: 'Brooklyn Civic Center Envelope Renewal', agency: 'DDC', projectType: 'Historic public building renovation', year: 2024, value: 12500000, relevanceScore: 93, whyItMatches: 'Strong public-building renovation story with occupied operations and agency reporting.', tags: ['Historic', 'Occupied building', 'Envelope'], websiteStatus: 'On Website' },
  { id: 'ps3', projectName: 'Bronx Borough Hall Historic Interior Repairs', agency: 'OGS', projectType: 'Historic interior renovation', year: 2021, value: 7800000, relevanceScore: 89, whyItMatches: 'Shows preservation sensitivity and phased interior work in a civic facility.', tags: ['Historic', 'Interiors', 'Preservation'], websiteStatus: 'Missing From Website' },
  { id: 'ps4', projectName: 'Lexington Avenue Station Platform Renewal', agency: 'MTA', projectType: 'Transit station construction', year: 2025, value: 22600000, relevanceScore: 87, whyItMatches: 'Best transit safety and access-control example for active station work.', tags: ['Transit', 'Night work', 'Accessibility'], websiteStatus: 'On Website' },
  { id: 'ps5', projectName: 'SUNY Dormitory HVAC Replacement', agency: 'DASNY', projectType: 'Campus housing renovation', year: 2022, value: 9600000, relevanceScore: 81, whyItMatches: 'Useful for campus housing program language but needs stronger program-level framing.', tags: ['Higher education', 'Housing', 'HVAC'], websiteStatus: 'Needs Update' },
  { id: 'ps6', projectName: 'State Capitol Annex Accessibility Improvements', agency: 'OGS', projectType: 'Accessibility and code upgrades', year: 2020, value: 6400000, relevanceScore: 78, whyItMatches: 'Supports accessibility and historic state facility narratives.', tags: ['Accessibility', 'Code', 'State facility'], websiteStatus: 'Missing From Website' },
]

export const rates: RateRecord[] = [
  { id: 'r1', employee: 'Maya Patel', title: 'Principal-in-Charge', agency: 'DDC', bareRate: 108, multiplier: 2.72, loadedRate: 293.76, primeSubRelationship: 'Prime', effectiveDate: '2026-01-01', expirationDate: '2026-12-31', accessLevel: 'Leadership', warning: 'Sensitive data restricted' },
  { id: 'r2', employee: 'Jordan Lee', title: 'Senior Construction Manager', agency: 'DDC', bareRate: 86, multiplier: 2.85, loadedRate: 245.1, primeSubRelationship: 'Prime', effectiveDate: '2026-01-01', expirationDate: '2026-12-31', accessLevel: 'Proposal Leads', warning: 'Current' },
  { id: 'r3', employee: 'Alex Rivera', title: 'Transit Construction Lead', agency: 'MTA', bareRate: 92, multiplier: 2.95, loadedRate: 271.4, primeSubRelationship: 'Prime', effectiveDate: '2026-01-15', expirationDate: '2026-06-30', accessLevel: 'Finance Only', warning: 'Rate review needed' },
  { id: 'r4', employee: 'Lena Ortiz', title: 'Resident Coordination Manager', agency: 'NYCHA', bareRate: 68, multiplier: 2.55, loadedRate: 173.4, primeSubRelationship: 'Prime', effectiveDate: '2025-01-01', expirationDate: '2026-05-01', accessLevel: 'Restricted', warning: 'Expired rate' },
  { id: 'r5', employee: 'Brightline Estimating', title: 'WBE Cost Estimating Partner', agency: 'DDC', bareRate: 74, multiplier: 2.35, loadedRate: 173.9, primeSubRelationship: 'Teaming Partner', effectiveDate: '2026-03-01', expirationDate: '2026-11-30', accessLevel: 'Finance Only', warning: 'Sensitive data restricted' },
]

export const agencyMemory: AgencyMemory[] = [
  {
    agency: 'DDC',
    notes: ['Prefers clear phasing, controls, and form compliance over broad marketing claims.', 'Pre-approved rates should be used where available.'],
    recurringRequirements: ['MWBE plan', 'Addenda acknowledgement', 'Detailed staffing matrix', 'Insurance language'],
    pastOutcomes: ['Won OGS-like public building pursuit with strong QA lead.', 'Shortlisted on Brooklyn school capital work after improving DDC controls narrative.'],
    teamingPartnerNotes: ['Brightline Estimating is a useful WBE partner for cost-heavy pursuits.', 'Confirm commitment letters early.'],
    internalWarnings: ['Do not leave insurance wording for final day.', 'Avoid generic public-building project sheets when courthouse examples exist.'],
    strategyReminders: ['Lead with occupied-building logistics and public access continuity.'],
  },
  {
    agency: 'DASNY',
    notes: ['Values capital program discipline, campus coordination, and budget controls.', 'Residence hall examples should be specific and current.'],
    recurringRequirements: ['Vendor responsibility questionnaire', 'Procurement lobbying certification', 'Cost proposal form package'],
    pastOutcomes: ['Won campus laboratory upgrade with cost-control-heavy narrative.'],
    teamingPartnerNotes: ['Scheduler availability often determines credibility.', 'Cost estimating partners should show higher education familiarity.'],
    internalWarnings: ['Rate template must be checked before pricing review.'],
    strategyReminders: ['Frame DACK as a program stabilizer across stakeholders, budgets, and schedules.'],
  },
  {
    agency: 'MTA',
    notes: ['Safety, access, and active-facility coordination are the core story.', 'Interviews often pressure-test staffing commitments.'],
    recurringRequirements: ['DBE participation', 'Safety record form', 'Key personnel commitments', 'Rate sheet format'],
    pastOutcomes: ['Transit station work performs well when night-work controls are specific.'],
    teamingPartnerNotes: ['Metro Access Partners adds DBE and accessibility credibility.'],
    internalWarnings: ['Track Safety certification must be current before submission.'],
    strategyReminders: ['Show disruption control, not just technical capability.'],
  },
  {
    agency: 'OGS',
    notes: ['Historic sensitivity and task-order discipline matter.', 'Term agreements should show repeatable workflows.'],
    recurringRequirements: ['SDVOB participation form', 'References', 'Non-collusive bidding certification'],
    pastOutcomes: ['Awarded state office envelope repairs with preservation specialist featured early.'],
    teamingPartnerNotes: ['Empire Veteran Services may support SDVOB scoring.'],
    internalWarnings: ['Do not understate task-order controls.'],
    strategyReminders: ['Pair historic expertise with practical field execution.'],
  },
  {
    agency: 'NYCHA',
    notes: ['Resident coordination and field issue tracking need to be concrete.', 'Budget pressure can make staffing levels difficult.'],
    recurringRequirements: ['Section 3 plan', 'MWBE forms', 'Resident communication plan'],
    pastOutcomes: ['Lost HVAC renovation where resident-liaison resume was weak.'],
    teamingPartnerNotes: ['Use community outreach partners only when role and hours are clear.'],
    internalWarnings: ['No-Go review is appropriate when staffing budget cannot support the requested coverage.'],
    strategyReminders: ['Make resident communication operational, not generic.'],
  },
]

export const marketingBudget: MarketingBudgetItem[] = [
  { category: 'Website updates', budget: 18000, spent: 7200, committed: 4100, note: 'Historic and transit project pages should be prioritized for active pursuits.' },
  { category: 'Proposal collateral', budget: 12000, spent: 6800, committed: 2300, note: 'Qualifications folders and interview boards need June replenishment.' },
  { category: 'Photography and project closeout assets', budget: 10000, spent: 3900, committed: 2800, note: 'Two missing website sheets need photography review.' },
]

export const inventory = [
  { item: 'Printed qualifications folders', onHand: 18, reorderPoint: 30, owner: 'Marketing' },
  { item: 'Interview boards', onHand: 9, reorderPoint: 12, owner: 'Marketing' },
  { item: 'USB closeout archive drives', onHand: 22, reorderPoint: 10, owner: 'Operations' },
]

export const receiptLogPlaceholders = [
  'Upload website vendor invoice',
  'Attach proposal printing receipts',
  'Match photography invoice to project sheet updates',
]

export const marketingRecommendations: MarketingRecommendation[] = [
  { title: 'Publish Bronx Borough Hall Historic Interior Repairs', reason: 'Supports active OGS and DDC historic-building pursuits.', priority: 'High' },
  { title: 'Refresh Queens Family Court MEP Modernization page', reason: 'Directly supports the current DDC courthouse proposal.', priority: 'High' },
  { title: 'Feature Lexington Avenue Station on homepage', reason: 'Active MTA accessibility pursuit needs a strong transit proof point.', priority: 'Medium' },
  { title: 'Update SUNY Dormitory HVAC Replacement framing', reason: 'DASNY capital program pursuit needs stronger housing-language alignment.', priority: 'Medium' },
]

export const systemIntelligence = [
  'DDC proposals should use pre-approved rate candidates where available.',
  'Two project sheets related to historic buildings are missing from the website.',
  'One certification expires before a current RFP deadline.',
  'This RFP may require additional WBE participation.',
  'The MTA pursuit should be reviewed by leadership before the key personnel commitment is finalized.',
]

export const alerts: AlertItem[] = [
  { id: 'a1', severity: 'High', category: 'Deadline', title: 'MTA accessibility proposal due this week', owner: 'Alex Rivera', dueDate: '2026-05-29', recommendedAction: 'Finalize certification renewal and key personnel commitment before internal review.', relatedRecord: 'MTA Transit Station Accessibility Upgrade' },
  { id: 'a2', severity: 'High', category: 'Certification', title: 'Track Safety certification expires before submission window closes', owner: 'Proposal Operations', dueDate: '2026-05-31', recommendedAction: 'Request renewal documentation or assign backup certified lead.', relatedRecord: 'Alex Rivera' },
  { id: 'a3', severity: 'High', category: 'Compliance', title: 'DDC courthouse insurance certification missing', owner: 'Finance', dueDate: '2026-06-02', recommendedAction: 'Confirm required wording and attach current certificate to forms package.', relatedRecord: 'Queens Courthouse Renovation CM Services' },
  { id: 'a4', severity: 'Medium', category: 'Website', title: 'Historic project sheet missing from website', owner: 'Marketing', dueDate: '2026-06-07', recommendedAction: 'Publish Bronx Borough Hall project sheet and connect it to OGS pursuit language.', relatedRecord: 'Bronx Borough Hall Historic Interior Repairs' },
  { id: 'a5', severity: 'Medium', category: 'Rates', title: 'NYCHA resident coordination rate is expired', owner: 'Finance', dueDate: '2026-05-24', recommendedAction: 'Refresh rate before any new NYCHA pricing is issued.', relatedRecord: 'Lena Ortiz NYCHA Rate' },
  { id: 'a6', severity: 'Low', category: 'Inventory', title: 'Qualifications folders below reorder point', owner: 'Marketing', dueDate: '2026-06-03', recommendedAction: 'Reorder folders before June shortlist interviews.', relatedRecord: 'Marketing inventory' },
]

export const activationChecklist: ActivationItem[] = [
  { source: 'Proposal tracker', filesNeeded: 'Current Excel tracker with proposal number, title, agency, due date, lead, status, outcome, and value columns', status: 'Ready to Map', notes: 'Direct replacement for the sample proposal records.' },
  { source: 'RFP files', filesNeeded: 'Active RFP PDFs, addenda, Q&A files, and form packages', status: 'Ready to Map', notes: 'Used to populate RFP intelligence, forms, deadlines, and compliance risks.' },
  { source: 'Resume library', filesNeeded: 'Current staff resumes, versions, certifications, and expiration dates', status: 'Needs Owner', notes: 'Enables staffing fit, certification alerts, and resume recommendations.' },
  { source: 'Project sheets', filesNeeded: 'Reusable project sheets, tags, agency/client, value, year, and website status', status: 'Ready to Map', notes: 'Powers matching, website gaps, and relevant experience assembly.' },
  { source: 'Rate sheets', filesNeeded: 'Agency-specific rates, multipliers, prime/sub relationships, effective dates, and access rules', status: 'Needs Owner', notes: 'Should be loaded with restricted permissions in the real platform.' },
  { source: 'Reusable content', filesNeeded: 'Firm overview, cover letter language, technical approach blocks, forms, appendices, and standard narratives', status: 'Optional Later', notes: 'Improves proposal assembly once core records are in place.' },
]
