// Authentication and role management utilities
export interface User {
  id: number
  name: string
  email: string
  role: "Project Manager" | "Field Coordinator" | "Data Entry"
  region: string
  permissions: string[]
}

export const getCurrentUser = (): User => {
  // In a real app, this would get the user from authentication context
  return {
    id: 1,
    name: "John Smith",
    email: "john.smith@dash-dism.com",
    role: "Project Manager",
    region: "All Regions",
    permissions: ["view_all", "edit_all", "reports", "admin", "user_management"],
  }
}

export const hasPermission = (permission: string): boolean => {
  const user = getCurrentUser()
  return user.permissions.includes(permission)
}

export const canAccessRegion = (region: string): boolean => {
  const user = getCurrentUser()
  return user.region === "All Regions" || user.region === region
}

export const getRolePermissions = (role: string): string[] => {
  const rolePermissions = {
    "Project Manager": ["view_all", "edit_all", "reports", "admin", "user_management"],
    "Field Coordinator": ["data_entry", "view_regional", "reports_regional"],
    "Data Entry": ["data_entry"],
  }
  return rolePermissions[role as keyof typeof rolePermissions] || []
}
