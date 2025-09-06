"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  FileText,
  ArrowLeft,
  Download,
  Calendar,
  Clock,
  Send,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Building2,
  Users,
  TrendingUp,
} from "lucide-react"

// Define types for our data structures
interface DailyPlanSummary {
  totalSites: number;
  activeSites: number;
  plannedActivities: number;
  regions: number;
}

interface DailyActualSummary {
  totalSites: number;
  completedSites: number;
  completedActivities: number;
  regions: number;
  efficiency: number;
}

interface Activity {
  activity: string;
  planned: number;
  sites: number;
  region?: string;
  actual?: number;
  variance?: number;
}

interface Issue {
  site: string;
  issue: string;
  impact: string;
  status: string;
}

interface RegionalSummary {
  region: string;
  sites: number;
  activities: number;
  progress: number;
}

interface ReportHistory {
  date: string;
  type: string;
  status: string;
  time: string;
}

interface ReportData {
  date: string;
  type: string;
  summary: DailyPlanSummary | DailyActualSummary;
  activities: Activity[];
  issues?: Issue[];
  regionalSummary?: RegionalSummary[];
}

// Mock data for reports
const dailyPlanData: ReportData = {
  date: "2024-01-15",
  type: "Daily Plan Report",
  summary: {
    totalSites: 15,
    activeSites: 12,
    plannedActivities: 45,
    regions: 6,
  },
  activities: [
    { activity: "KKST Release", planned: 8, sites: 3, region: "Sumbagut" },
    { activity: "CAF Release", planned: 5, sites: 2, region: "Jabo Inner" },
    { activity: "Permit Release", planned: 12, sites: 4, region: "Bali Nusa" },
    { activity: "Site Visit", planned: 15, sites: 5, region: "Sumbagsel" },
    { activity: "Dismantling NE & FE", planned: 3, sites: 2, region: "Jabar" },
    { activity: "Asset Tagging", planned: 2, sites: 1, region: "Jatim" },
  ],
  regionalSummary: [
    { region: "Jatim", sites: 4, activities: 23, progress: 85 },
    { region: "Jateng", sites: 3, activities: 7, progress: 92 },
    { region: "Jabar", sites: 2, activities: 12, progress: 78 },
    { region: "Bali Nusa", sites: 3, activities: 3, progress: 65 },
  ],
}

const dailyActualData: ReportData = {
  date: "2024-01-15",
  type: "Daily Actual Report",
  summary: {
    totalSites: 15,
    completedSites: 10,
    completedActivities: 38,
    regions: 6,
    efficiency: 84.4,
  },
  activities: [
    { activity: "KKST Release", planned: 8, actual: 7, variance: -1, sites: 3 },
    { activity: "CAF Release", planned: 5, actual: 5, variance: 0, sites: 2 },
    { activity: "Site Survey", planned: 12, actual: 10, variance: -2, sites: 4 },
    { activity: "Equipment Removal", planned: 15, actual: 13, variance: -2, sites: 5 },
    { activity: "Tower Dismantling", planned: 3, actual: 2, variance: -1, sites: 2 },
    { activity: "Site Restoration", planned: 2, actual: 1, variance: -1, sites: 1 },
  ],
  issues: [
    { site: "Jabar - BDG009", issue: "Weather delay - high winds", impact: "Medium", status: "Monitoring" },
    { site: "Jatim - CDK971", issue: "Equipment malfunction", impact: "High", status: "Resolved" },
    { site: "Sumbagut - PMR667", issue: "Permit clarification needed", impact: "Low", status: "In Progress" },
  ],
}

const reportHistory: ReportHistory[] = [
  { date: "2024-01-15", type: "Daily Actual", status: "Generated", time: "18:30" },
  { date: "2024-01-15", type: "Daily Plan", status: "Generated", time: "08:00" },
  { date: "2024-01-14", type: "Daily Actual", status: "Generated", time: "18:45" },
  { date: "2024-01-14", type: "Daily Plan", status: "Generated", time: "08:00" },
  { date: "2024-01-13", type: "Daily Actual", status: "Generated", time: "19:00" },
  { date: "2024-01-13", type: "Daily Plan", status: "Generated", time: "08:00" },
]

export default function ReportsPage() {
  const [selectedReportType, setSelectedReportType] = useState<"plan" | "actual">("plan")
  const [selectedDate, setSelectedDate] = useState("2024-01-15")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)

  const currentData = selectedReportType === "plan" ? dailyPlanData : dailyActualData

  // Type guard to check if summary is DailyPlanSummary
  const isPlanSummary = (summary: DailyPlanSummary | DailyActualSummary): summary is DailyPlanSummary => {
    return (summary as DailyPlanSummary).activeSites !== undefined;
  }

  const handleBack = () => {
    window.location.href = "/dashboard"
  }

  const handleGenerateReport = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setReportGenerated(true)
      setTimeout(() => setReportGenerated(false), 3000)
    }, 2000)
  }

  const handleExportPDF = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      // Simulate PDF download
      console.log("Exporting PDF...")
    }, 1500)
  }

  const handleEmailReport = () => {
    console.log("Sending email report...")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h1 className="text-lg font-semibold">Automated Reports</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleGenerateReport} disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Generate Report"}
            </Button>
            <Badge variant="secondary">Auto-Generated</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-balance">Daily Project Reports</h2>
            <p className="text-muted-foreground">
              Automated daily morning plan and evening actual reports with export capabilities.
            </p>
          </div>

          {/* Success Alert */}
          {reportGenerated && (
            <Alert className="border-primary/20 bg-primary/5">
              <CheckCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-primary">
                Report generated successfully! Ready for export and distribution.
              </AlertDescription>
            </Alert>
          )}

          {/* Report Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Report Configuration
              </CardTitle>
              <CardDescription>Select report type and date for generation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Report Type</label>
                  <Select value={selectedReportType} onValueChange={(value: "plan" | "actual") => setSelectedReportType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plan">Daily Plan Report (Morning)</SelectItem>
                      <SelectItem value="actual">Daily Actual Report (Evening)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Report Date</label>
                  <Select value={selectedDate} onValueChange={setSelectedDate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-01-15">January 15, 2024</SelectItem>
                      <SelectItem value="2024-01-14">January 14, 2024</SelectItem>
                      <SelectItem value="2024-01-13">January 13, 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Actions</label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleExportPDF} disabled={isExporting}>
                      <Download className="h-4 w-4 mr-2" />
                      {isExporting ? "Exporting..." : "Export PDF"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleEmailReport}>
                      <Send className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Report Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Report */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        {currentData.type}
                      </CardTitle>
                      <CardDescription>Generated for {new Date(currentData.date).toLocaleDateString()}</CardDescription>
                    </div>
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      {selectedReportType === "plan" ? "08:00" : "18:30"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <Building2 className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{currentData.summary.totalSites}</p>
                      <p className="text-xs text-muted-foreground">Total Sites</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <TrendingUp className="h-6 w-6 mx-auto mb-2 text-accent" />
                      <p className="text-2xl font-bold">
                        {isPlanSummary(currentData.summary)
                          ? currentData.summary.activeSites
                          : currentData.summary.completedSites}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isPlanSummary(currentData.summary) ? "Active Sites" : "Completed Sites"}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <BarChart3 className="h-6 w-6 mx-auto mb-2 text-chart-2" />
                      <p className="text-2xl font-bold">
                        {isPlanSummary(currentData.summary)
                          ? currentData.summary.plannedActivities
                          : currentData.summary.completedActivities}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isPlanSummary(currentData.summary) ? "Planned Activities" : "Completed Activities"}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <Users className="h-6 w-6 mx-auto mb-2 text-chart-4" />
                      <p className="text-2xl font-bold">
                        {isPlanSummary(currentData.summary)
                          ? currentData.summary.regions
                          : `${currentData.summary.efficiency}%`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isPlanSummary(currentData.summary) ? "Active Regions" : "Efficiency"}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Activities Table */}
                  <div>
                    <h3 className="font-semibold mb-4">Activity Details</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Activity</TableHead>
                          <TableHead>Planned</TableHead>
                          {selectedReportType === "actual" && <TableHead>Actual</TableHead>}
                          {selectedReportType === "actual" && <TableHead>Variance</TableHead>}
                          <TableHead>Sites</TableHead>
                          {selectedReportType === "plan" && <TableHead>Region</TableHead>}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentData.activities.map((activity, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{activity.activity}</TableCell>
                            <TableCell>{activity.planned}</TableCell>
                            {selectedReportType === "actual" && <TableCell>{activity.actual}</TableCell>}
                            {selectedReportType === "actual" && (
                              <TableCell>
                                <span
                                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                    activity.variance && activity.variance >= 0
                                      ? "bg-primary/10 text-primary"
                                      : "bg-destructive/10 text-destructive"
                                  }`}
                                >
                                  {activity.variance && activity.variance >= 0 ? "+" : ""}
                                  {activity.variance}
                                </span>
                              </TableCell>
                            )}
                            <TableCell>{activity.sites}</TableCell>
                            {selectedReportType === "plan" && <TableCell>{activity.region}</TableCell>}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Issues Section (Actual Reports Only) */}
                  {selectedReportType === "actual" && currentData.issues && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Issues & Observations
                        </h3>
                        <div className="space-y-3">
                          {currentData.issues.map((issue, index) => (
                            <div key={index} className="p-3 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-sm">{issue.site}</span>
                                <div className="flex gap-2">
                                  <Badge
                                    variant={
                                      issue.impact === "High"
                                        ? "destructive"
                                        : issue.impact === "Medium"
                                          ? "secondary"
                                          : "outline"
                                    }
                                    className="text-xs"
                                  >
                                    {issue.impact}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {issue.status}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">{issue.issue}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Regional Summary */}
              {selectedReportType === "plan" && dailyPlanData.regionalSummary && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Regional Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dailyPlanData.regionalSummary.map((region, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{region.region}</span>
                            <span className="text-sm text-muted-foreground">{region.progress}%</span>
                          </div>
                          <div className="bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${region.progress}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{region.sites} sites</span>
                            <span>{region.activities} activities</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Report History */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {reportHistory.map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div>
                          <p className="text-sm font-medium">{report.type}</p>
                          <p className="text-xs text-muted-foreground">{report.date}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs mb-1">
                            {report.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{report.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Automation Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Automation Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Morning Reports</span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Evening Reports</span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email Distribution</span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Enabled
                      </Badge>
                    </div>
                    <Separator />
                    <div className="text-xs text-muted-foreground">
                      <p>Next Plan Report: Tomorrow 08:00</p>
                      <p>Next Actual Report: Today 18:30</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}