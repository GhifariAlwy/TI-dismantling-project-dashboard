"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Database,
  ArrowLeft,
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle,
  History,
  Trash2,
  RefreshCw,
  Shield,
  User,
  Settings,
} from "lucide-react"

// Mock data for demonstration
const masterData = {
  sites: [
    { id: "SITE-001", name: "Site Alpha", region: "Region 1 - North", status: "Active", lastUpdated: "2024-01-15" },
    { id: "SITE-002", name: "Site Beta", region: "Region 2 - South", status: "Active", lastUpdated: "2024-01-14" },
    { id: "SITE-003", name: "Site Gamma", region: "Region 3 - East", status: "Completed", lastUpdated: "2024-01-13" },
    { id: "SITE-004", name: "Site Delta", region: "Region 1 - North", status: "Planned", lastUpdated: "2024-01-12" },
    { id: "SITE-005", name: "Site Epsilon", region: "Region 4 - West", status: "Active", lastUpdated: "2024-01-15" },
  ],
  planTargets: [
    { activity: "KKST Release", target: 150, completed: 128, percentage: 85.3 },
    { activity: "CAF Release", target: 100, completed: 92, percentage: 92.0 },
    { activity: "Site Survey", target: 200, completed: 185, percentage: 92.5 },
    { activity: "Equipment Removal", target: 180, completed: 125, percentage: 69.4 },
    { activity: "Tower Dismantling", target: 120, completed: 54, percentage: 45.0 },
    { activity: "Site Restoration", target: 80, completed: 25, percentage: 31.3 },
    { activity: "Inbound Material", target: 160, completed: 140, percentage: 87.5 },
  ],
}

const auditLog = [
  {
    id: 1,
    timestamp: "2024-01-15 14:30:22",
    user: "John Smith",
    action: "Data Import",
    details: "Imported 25 sites from Excel template",
    type: "Import",
  },
  {
    id: 2,
    timestamp: "2024-01-15 10:15:45",
    user: "Sarah Johnson",
    action: "Site Update",
    details: "Updated SITE-003 status to Completed",
    type: "Update",
  },
  {
    id: 3,
    timestamp: "2024-01-14 16:22:10",
    user: "Mike Wilson",
    action: "Plan Target Adjustment",
    details: "Adjusted Equipment Removal target from 200 to 180",
    type: "Update",
  },
  {
    id: 4,
    timestamp: "2024-01-14 09:05:33",
    user: "Admin",
    action: "Data Backup",
    details: "Automated daily backup completed successfully",
    type: "Backup",
  },
  {
    id: 5,
    timestamp: "2024-01-13 11:45:18",
    user: "Sarah Johnson",
    action: "Data Export",
    details: "Exported site data for Region 1 - North",
    type: "Export",
  },
]

const importHistory = [
  { date: "2024-01-15", file: "sites_master_v2.xlsx", records: 25, status: "Success", user: "John Smith" },
  { date: "2024-01-10", file: "plan_targets_q1.xlsx", records: 7, status: "Success", user: "Admin" },
  { date: "2024-01-08", file: "sites_update.xlsx", records: 15, status: "Partial", user: "Sarah Johnson" },
  { date: "2024-01-05", file: "initial_data.xlsx", records: 50, status: "Success", user: "Admin" },
]

export default function DataManagementPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isImporting, setIsImporting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [importSuccess, setImportSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("import")

  const handleBack = () => {
    window.location.href = "/dashboard"
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleImport = () => {
    if (!selectedFile) return

    setIsImporting(true)
    setTimeout(() => {
      setIsImporting(false)
      setImportSuccess(true)
      setSelectedFile(null)
      setTimeout(() => setImportSuccess(false), 3000)
    }, 2000)
  }

  const handleExport = (type: string) => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      console.log(`Exporting ${type} data...`)
    }, 1500)
  }

  const handleBackup = () => {
    console.log("Creating backup...")
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
              <Database className="h-5 w-5 text-primary" />
              <h1 className="text-lg font-semibold">Data Management</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleBackup}>
              <Shield className="h-4 w-4 mr-2" />
              Create Backup
            </Button>
            <Badge variant="secondary">Administrator</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-balance">Master Data Management</h2>
            <p className="text-muted-foreground">
              Import master data from Excel templates, manage project configurations, and maintain audit logs.
            </p>
          </div>

          {/* Success Alert */}
          {importSuccess && (
            <Alert className="border-primary/20 bg-primary/5">
              <CheckCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-primary">
                Data imported successfully! {selectedFile?.name} has been processed and integrated.
              </AlertDescription>
            </Alert>
          )}

          {/* Data Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Sites</p>
                    <p className="text-2xl font-bold">{masterData.sites.length}</p>
                  </div>
                  <Database className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Sites</p>
                    <p className="text-2xl font-bold text-accent">
                      {masterData.sites.filter((s) => s.status === "Active").length}
                    </p>
                  </div>
                  <Settings className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Plan Targets</p>
                    <p className="text-2xl font-bold text-chart-2">{masterData.planTargets.length}</p>
                  </div>
                  <FileSpreadsheet className="h-8 w-8 text-chart-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Backup</p>
                    <p className="text-2xl font-bold text-chart-4">Today</p>
                  </div>
                  <Shield className="h-8 w-8 text-chart-4" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="import">Data Import</TabsTrigger>
              <TabsTrigger value="export">Data Export</TabsTrigger>
              <TabsTrigger value="master">Master Data</TabsTrigger>
              <TabsTrigger value="audit">Audit Log</TabsTrigger>
            </TabsList>

            {/* Data Import Tab */}
            <TabsContent value="import" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Import Excel Data
                    </CardTitle>
                    <CardDescription>Upload Excel files to import site lists and plan targets</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="file-upload">Select Excel File (.xlsx)</Label>
                      <Input
                        id="file-upload"
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleFileSelect}
                        disabled={isImporting}
                      />
                    </div>

                    {selectedFile && (
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">{selectedFile.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Size: {(selectedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    )}

                    <Button onClick={handleImport} disabled={!selectedFile || isImporting} className="w-full">
                      {isImporting ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Importing...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Import Data
                        </>
                      )}
                    </Button>

                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>• Supported formats: .xlsx, .xls</p>
                      <p>• Maximum file size: 10MB</p>
                      <p>• Data will be validated before import</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Import History</CardTitle>
                    <CardDescription>Recent data import activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {importHistory.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileSpreadsheet className="h-4 w-4 text-primary" />
                            <div>
                              <p className="text-sm font-medium">{item.file}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.records} records • {item.user}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={
                                item.status === "Success"
                                  ? "secondary"
                                  : item.status === "Partial"
                                    ? "outline"
                                    : "destructive"
                              }
                              className="mb-1"
                            >
                              {item.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Data Export Tab */}
            <TabsContent value="export" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Site Data</CardTitle>
                    <CardDescription>Export all site information and status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => handleExport("sites")}
                      disabled={isExporting}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Sites
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Plan Targets</CardTitle>
                    <CardDescription>Export activity targets and progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => handleExport("targets")}
                      disabled={isExporting}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Targets
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Complete Dataset</CardTitle>
                    <CardDescription>Export all project data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => handleExport("complete")}
                      disabled={isExporting}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {isExporting ? "Exporting..." : "Export All"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Master Data Tab */}
            <TabsContent value="master" className="space-y-4">
              <div className="space-y-6">
                {/* Sites Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Site Master Data</CardTitle>
                    <CardDescription>Manage site information and status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Site ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Region</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Updated</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {masterData.sites.map((site) => (
                          <TableRow key={site.id}>
                            <TableCell className="font-medium">{site.id}</TableCell>
                            <TableCell>{site.name}</TableCell>
                            <TableCell>{site.region}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  site.status === "Active"
                                    ? "secondary"
                                    : site.status === "Completed"
                                      ? "outline"
                                      : "destructive"
                                }
                              >
                                {site.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{site.lastUpdated}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Plan Targets */}
                <Card>
                  <CardHeader>
                    <CardTitle>Plan Targets</CardTitle>
                    <CardDescription>Activity targets and current progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {masterData.planTargets.map((target, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{target.activity}</span>
                            <span className="text-sm text-muted-foreground">
                              {target.completed} / {target.target} ({target.percentage.toFixed(1)}%)
                            </span>
                          </div>
                          <Progress value={target.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Audit Log Tab */}
            <TabsContent value="audit" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Data Audit Log
                  </CardTitle>
                  <CardDescription>Complete history of all data changes and system activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auditLog.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              {log.user}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{log.action}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{log.details}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                log.type === "Import"
                                  ? "secondary"
                                  : log.type === "Update"
                                    ? "outline"
                                    : log.type === "Backup"
                                      ? "default"
                                      : "destructive"
                              }
                            >
                              {log.type}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
