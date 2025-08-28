"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCurrentUser, hasPermission } from "@/lib/auth"
import {
  Building2,
  BarChart3,
  FileText,
  Users,
  Settings,
  LogOut,
  TrendingUp,
  Calendar,
  AlertTriangle,
} from "lucide-react"

export default function DashboardPage() {
  const [user] = useState(getCurrentUser())

  const handleLogout = () => {
    window.location.href = "/login"
  }

  const handleNavigateToDataEntry = () => {
    window.location.href = "/data-entry"
  }

  const handleNavigateToAnalytics = () => {
    window.location.href = "/analytics"
  }

  const handleNavigateToReports = () => {
    window.location.href = "/reports"
  }

  const handleNavigateToDataManagement = () => {
    window.location.href = "/data-management"
  }

  const handleNavigateToUserManagement = () => {
    window.location.href = "/user-management"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">DASH-DISM</h1>
              <p className="text-xs text-muted-foreground">1879 HOP Microwave Antenna Dismantling</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.region}</p>
            </div>
            <Badge variant="secondary">{user.role}</Badge>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-balance">Welcome to Project Dashboard</h2>
            <p className="text-muted-foreground">
              Monitor progress, manage data entry, and generate reports for the dismantling project.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Sites</p>
                    <p className="text-2xl font-bold">247</p>
                  </div>
                  <Building2 className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-primary">89</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                    <p className="text-2xl font-bold text-accent">34</p>
                  </div>
                  <Calendar className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Issues</p>
                    <p className="text-2xl font-bold text-destructive">3</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* S-Curve Analytics - Available to all roles */}
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleNavigateToAnalytics}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>S-Curve Analytics</CardTitle>
                    <CardDescription>Real-time progress tracking</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  View interactive S-Curve dashboard with planned vs actual progress for all weighted activities.
                </p>
                <Button className="w-full">View Dashboard</Button>
              </CardContent>
            </Card>

            {/* Data Entry Portal - Available to all roles */}
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleNavigateToDataEntry}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <FileText className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Data Entry Portal</CardTitle>
                    <CardDescription>Collaborative data management</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Input daily plan and actual data for sites and activities with real-time collaboration.
                </p>
                <Button variant="secondary" className="w-full">
                  Enter Data
                </Button>
              </CardContent>
            </Card>

            {/* Reports - Available to all roles */}
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleNavigateToReports}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-chart-2/10 p-2 rounded-lg">
                    <FileText className="h-6 w-6 text-chart-2" />
                  </div>
                  <div>
                    <CardTitle>Automated Reports</CardTitle>
                    <CardDescription>Daily plan & actual reports</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Generate and export daily morning plan and evening actual reports automatically.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Generate Reports
                </Button>
              </CardContent>
            </Card>

            {/* User Management - Only for Project Managers */}
            {hasPermission("user_management") && (
              <Card
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={handleNavigateToUserManagement}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-chart-4/10 p-2 rounded-lg">
                      <Users className="h-6 w-6 text-chart-4" />
                    </div>
                    <div>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>Role-based access control</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage user roles and permissions for Project Managers and Field Coordinators.
                  </p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Manage Users
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Data Management - Only for Project Managers and admins */}
            {hasPermission("admin") && (
              <Card
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={handleNavigateToDataManagement}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-chart-5/10 p-2 rounded-lg">
                      <Settings className="h-6 w-6 text-chart-5" />
                    </div>
                    <div>
                      <CardTitle>Data Management</CardTitle>
                      <CardDescription>Import & export capabilities</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Import master data from Excel templates and manage project configurations.
                  </p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Manage Data
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* System Status - Always visible */}
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-sm">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Database</span>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Online
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Reports</span>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Last Sync</span>
                    <span className="text-muted-foreground">2 min ago</span>
                  </div>
                  {hasPermission("admin") && (
                    <div className="flex items-center justify-between text-sm">
                      <span>Your Access</span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Full Admin
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
