"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Users,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Shield,
  CheckCircle,
  AlertTriangle,
  UserCheck,
  Settings,
  Eye,
  EyeOff,
} from "lucide-react"

// Mock user data
const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@dash-dism.com",
    role: "Project Manager",
    region: "All Regions",
    status: "Active",
    lastLogin: "2024-01-15 14:30",
    permissions: ["view_all", "edit_all", "reports", "admin", "user_management"],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@dash-dism.com",
    role: "Field Coordinator",
    region: "Region 1 - North",
    status: "Active",
    lastLogin: "2024-01-15 12:45",
    permissions: ["data_entry", "view_regional", "reports_regional"],
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike.wilson@dash-dism.com",
    role: "Field Coordinator",
    region: "Region 2 - South",
    status: "Active",
    lastLogin: "2024-01-15 09:15",
    permissions: ["data_entry", "view_regional", "reports_regional"],
  },
  {
    id: 4,
    name: "Lisa Chen",
    email: "lisa.chen@dash-dism.com",
    role: "Data Entry",
    region: "Region 3 - East",
    status: "Inactive",
    lastLogin: "2024-01-10 16:20",
    permissions: ["data_entry"],
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@dash-dism.com",
    role: "Field Coordinator",
    region: "Region 4 - West",
    status: "Active",
    lastLogin: "2024-01-15 11:30",
    permissions: ["data_entry", "view_regional", "reports_regional"],
  },
]

const roles = [
  {
    name: "Project Manager",
    description: "Full access to all data, reports, and administrative functions",
    permissions: ["view_all", "edit_all", "reports", "admin", "user_management"],
    color: "primary",
  },
  {
    name: "Field Coordinator",
    description: "Regional data entry and reporting capabilities",
    permissions: ["data_entry", "view_regional", "reports_regional"],
    color: "secondary",
  },
  {
    name: "Data Entry",
    description: "Basic data entry permissions for assigned regions",
    permissions: ["data_entry"],
    color: "outline",
  },
]

const regions = [
  "All Regions",
  "Region 1 - North",
  "Region 2 - South",
  "Region 3 - East",
  "Region 4 - West",
  "Region 5 - Central",
  "Region 6 - Northeast",
  "Region 7 - Southeast",
  "Region 8 - Northwest",
  "Region 9 - Southwest",
]

export default function UserManagementPage() {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [showPermissions, setShowPermissions] = useState<number | null>(null)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    region: "",
  })

  const handleBack = () => {
    window.location.href = "/dashboard"
  }

  const handleAddUser = () => {
    console.log("Adding user:", newUser)
    setIsAddingUser(false)
    setNewUser({ name: "", email: "", role: "", region: "" })
  }

  const handleEditUser = (user: any) => {
    setSelectedUser(user)
  }

  const handleDeleteUser = (userId: number) => {
    console.log("Deleting user:", userId)
  }

  const handleToggleStatus = (userId: number) => {
    console.log("Toggling status for user:", userId)
  }

  const getRoleColor = (role: string) => {
    const roleConfig = roles.find((r) => r.name === role)
    return roleConfig?.color || "outline"
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
              <Users className="h-5 w-5 text-primary" />
              <h1 className="text-lg font-semibold">User Management</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account with appropriate role and permissions.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.name} value={role.name}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Assigned Region</Label>
                    <Select value={newUser.region} onValueChange={(value) => setNewUser({ ...newUser, region: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
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
                  <Button onClick={handleAddUser} className="w-full">
                    Create User
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Badge variant="secondary">Administrator</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-balance">User & Role Management</h2>
            <p className="text-muted-foreground">
              Manage user accounts, roles, and permissions for the DASH-DISM system.
            </p>
          </div>

          {/* Role Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roles.map((role, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    {role.name}
                  </CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Permissions:</p>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission.replace("_", " ")}
                        </Badge>
                      ))}
                    </div>
                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground">
                        {users.filter((u) => u.role === role.name).length} active users
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>System Users</CardTitle>
              <CardDescription>Manage user accounts and access permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRoleColor(user.role) as any}>{user.role}</Badge>
                      </TableCell>
                      <TableCell>{user.region}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === "Active" ? "secondary" : "outline"}>
                          {user.status === "Active" ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <AlertTriangle className="h-3 w-3 mr-1" />
                          )}
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPermissions(showPermissions === user.id ? null : user.id)}
                        >
                          {showPermissions === user.id ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleStatus(user.id)}
                            className={user.status === "Active" ? "text-destructive" : "text-primary"}
                          >
                            <UserCheck className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Permissions Details */}
              {showPermissions !== null && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">
                    Permissions for {users.find((u) => u.id === showPermissions)?.name}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {users
                      .find((u) => u.id === showPermissions)
                      ?.permissions.map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission.replace("_", " ")}
                        </Badge>
                      ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Access Control Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Access Control Rules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="font-medium text-sm">Project Manager</p>
                    <p className="text-xs text-muted-foreground">
                      Full system access including user management, all reports, and administrative functions
                    </p>
                  </div>
                  <div className="p-3 bg-accent/5 border border-accent/20 rounded-lg">
                    <p className="font-medium text-sm">Field Coordinator</p>
                    <p className="text-xs text-muted-foreground">
                      Regional data entry, view regional reports, and collaborate on assigned areas
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 border rounded-lg">
                    <p className="font-medium text-sm">Data Entry</p>
                    <p className="text-xs text-muted-foreground">
                      Basic data entry permissions for specific sites and activities
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Security</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Password Policy</span>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Enforced
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Session Timeout</span>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      8 hours
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Audit Logging</span>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Role Validation</span>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Real-time
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
