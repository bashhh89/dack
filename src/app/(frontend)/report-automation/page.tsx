import ReportAutomationWorkspace from '../../../components/report-automation-workspace'
import { listJobs } from '../../../lib/report-automation-store'

export const dynamic = 'force-dynamic'

export default async function ReportAutomationPage() {
  const jobs = await listJobs()

  return <ReportAutomationWorkspace initialJobs={jobs} />
}
