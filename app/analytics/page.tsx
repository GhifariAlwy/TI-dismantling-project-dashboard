"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Area,
  AreaChart,
} from "recharts"
import {
  Building2,
  ArrowLeft,
  TrendingUp,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  Activity,
} from "lucide-react"

// Mock data for S-Curve
const sCurveData = [
  { week: "Week 1", planned: 5, actual: 3, cumulativePlanned: 5, cumulativeActual: 3 },
  { week: "Week 2", planned: 12, actual: 8, cumulativePlanned: 17, cumulativeActual: 11 },
  { week: "Week 3", planned: 18, actual: 15, cumulativePlanned: 35, cumulativeActual: 26 },
  { week: "Week 4", planned: 22, actual: 20, cumulativePlanned: 57, cumulativeActual: 46 },
  { week: "Week 5", planned: 25, actual: 23, cumulativePlanned: 82, cumulativeActual: 69 },
  { week: "Week 6", planned: 18, actual: 21, cumulativePlanned: 100, cumulativeActual: 90 },
]

// Mock data for weekly quantities
const weeklyQuantities = [
  { week: "Week 1", planned: 15, actual: 12 },
  { week: "Week 2", planned: 22, actual: 18 },
  { week: "Week 3", planned: 28, actual: 25 },
  { week: "Week 4", planned: 35, actual: 32 },
  { week: "Week 5", planned: 30, actual: 28 },
  { week: "Week 6", planned: 25, actual: 27 },
]

// Mock data for activity breakdown
const activityData = [
  { activity: "KKST Release", planned: 85, actual: 78, weight: 15 },
  { activity: "CAF Release", planned: 92, actual: 88, weight: 10 },
  { activity: "Permit Release", planned: 75, actual: 32, weight: 2 },
  { activity: "Site Visit", planned: 95, actual: 92, weight: 8 },
  { activity: "Asset Tagging", planned: 68, actual: 65, weight: 25 },
  { activity: "Dismantling NE", planned: 45, actual: 42, weight: 20 },
  { activity: "Dismantling FE", planned: 95, actual: 92, weight: 8 },
  { activity: "Material Packaging & Inbound Scheduling", planned: 95, actual: 92, weight: 8 },
  { activity: "Inbound Material", planned: 30, actual: 28, weight: 12 },
  { activity: "Rekon & BAST", planned: 88, actual: 85, weight: 10 },
]

const regions = [
  "All Regions",
  "Sumbagut",
  "Sumbagteng",
  "Sumbangsel",
  "Jabodetabek Inner",
  "Jabodetabe Outer",
  "Jawa Barat",
  "Jawa Tengah",
  "Jawa Timur",
  "Bali Nusa",
]

export default function AnalyticsPage() {
  const [selectedRegion, setSelectedRegion] = useState("All Regions")
  const [selectedTimeframe, setSelectedTimeframe] = useState("6weeks")
  const [activeTab, setActiveTab] = useState("scurve")

  const handleBack = () => {
    window.location.href = "/dashboard"
  }

  const handleRefresh = () => {
    // Simulate data refresh
    console.log("Refreshing data...")
  }

  const handleExport = () => {
    // Simulate export functionality
    console.log("Exporting data...")
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
              <BarChart3 className="h-5 w-5 text-primary" />
              <h1 className="text-lg font-semibold">S-Curve Analytics</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Badge variant="secondary">Real-time Data</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-balance">Project Progress Analytics</h2>
            <p className="text-muted-foreground">
              Real-time S-Curve dashboard with planned vs actual progress tracking for all weighted activities.
            </p>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters & Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Region</label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Time Period</label>
                  <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4weeks">Last 4 Weeks</SelectItem>
                      <SelectItem value="6weeks">Last 6 Weeks</SelectItem>
                      <SelectItem value="8weeks">Last 8 Weeks</SelectItem>
                      <SelectItem value="12weeks">Last 12 Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <DatePickerWithRange />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
                    <p className="text-2xl font-bold text-primary">90%</p>
                    <p className="text-xs text-muted-foreground">vs 100% planned</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Schedule Variance</p>
                    <p className="text-2xl font-bold text-destructive">-10%</p>
                    <p className="text-xs text-muted-foreground">Behind schedule</p>
                  </div>
                  <Calendar className="h-8 w-8 text-destructive" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Sites</p>
                    <p className="text-2xl font-bold text-accent">34</p>
                    <p className="text-xs text-muted-foreground">Currently in progress</p>
                  </div>
                  <Building2 className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Efficiency</p>
                    <p className="text-2xl font-bold text-chart-4">92%</p>
                    <p className="text-xs text-muted-foreground">Actual vs planned</p>
                  </div>
                  <Activity className="h-8 w-8 text-chart-4" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="scurve">S-Curve Analysis</TabsTrigger>
              <TabsTrigger value="weekly">Weekly Quantities</TabsTrigger>
              <TabsTrigger value="activities">Activity Breakdown</TabsTrigger>
            </TabsList>

            <TabsContent value="scurve" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cumulative S-Curve Progress</CardTitle>
                  <CardDescription>
                    Planned vs actual cumulative progress over time with weighted activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={sCurveData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="week" className="text-muted-foreground" />
                        <YAxis
                          className="text-muted-foreground"
                          label={{ value: "Progress (%)", angle: -90, position: "insideLeft" }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="cumulativePlanned"
                          stackId="1"
                          stroke="hsl(var(--primary))"
                          fill="hsl(var(--primary))"
                          fillOpacity={0.1}
                          name="Planned Progress"
                        />
                        <Area
                          type="monotone"
                          dataKey="cumulativeActual"
                          stackId="2"
                          stroke="hsl(var(--chart-2))"
                          fill="hsl(var(--chart-2))"
                          fillOpacity={0.1}
                          name="Actual Progress"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="weekly" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Dismantling Quantities</CardTitle>
                  <CardDescription>Comparison of planned vs actual weekly dismantling quantities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyQuantities}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="week" className="text-muted-foreground" />
                        <YAxis
                          className="text-muted-foreground"
                          label={{ value: "Quantity", angle: -90, position: "insideLeft" }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Legend />
                        <Bar
                          dataKey="planned"
                          fill="hsl(var(--primary))"
                          name="Planned Quantity"
                          radius={[2, 2, 0, 0]}
                        />
                        <Bar dataKey="actual" fill="hsl(var(--chart-2))" name="Actual Quantity" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activities" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Progress Breakdown</CardTitle>
                  <CardDescription>Progress by activity type with weighted importance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activityData.map((activity, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{activity.activity}</span>
                            <Badge variant="outline" className="text-xs">
                              Weight: {activity.weight}%
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {activity.actual}% / {activity.planned}%
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex gap-2">
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${activity.planned}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground w-12">Planned</span>
                          </div>
                          <div className="flex gap-2">
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div
                                className="bg-chart-2 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${activity.actual}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground w-12">Actual</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
