"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getCurrentUser, canAccessRegion } from "@/lib/auth"
import { Building2, Calendar, Clock, Save, ArrowLeft, CheckCircle, AlertCircle, Users, MapPin } from "lucide-react"

// Mock data for demonstration
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

const activities = [
  { id: "kkst_release", name: "KKST Release", weight: 15 },
  { id: "caf_release", name: "CAF Release", weight: 10 },
  { id: "permit_release", name: "Permit Release", weight: 8 },
  { id: "site_vsit", name: "Site Visit", weight: 25 },
  { id: "asset_tagging", name: "Asset Tagging", weight: 20 },
  { id: "dismantle_ne", name: "Dismantle NE", weight: 12 },
  { id: "dismantle_fe", name: "Dismantle FE", weight: 10 },
  { id: "material_pack", name: "Material Packaging & Inbound Scheduling", weight: 10 },
  { id: "inbound_material", name: "Inbound Material", weight: 10 },
  { id: "rekon_bast", name: "Rekon & BAST", weight: 10 },
]

// Tidak Digunakan dalam rekap daily
const sites = Array.from({ length: 50 }, (_, i) => ({
  id: `SITE-${String(i + 1).padStart(3, "0")}`,
  name: `Site ${i + 1}`,
  region: regions[i % 9],
}))

export default function DataEntryPage() {
  const [user] = useState(getCurrentUser())
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedSite, setSelectedSite] = useState("")
  const [entryType, setEntryType] = useState<"plan" | "actual">("plan")
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Filter regions based on user access
  const availableRegions = user.region === "All Regions" ? regions : regions.filter((region) => canAccessRegion(region))

  const filteredSites = selectedRegion ? sites.filter((site) => site.region === selectedRegion) : sites

  const handleActivityChange = (activityId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [activityId]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      // Reset form after success
      setTimeout(() => {
        setSubmitSuccess(false)
        setFormData({})
        setNotes("")
      }, 2000)
    }, 1000)
  }

  const handleBack = () => {
    window.location.href = "/dashboard"
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
              <Building2 className="h-5 w-5 text-primary" />
              <h1 className="text-lg font-semibold">Data Entry Portal</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              <Clock className="h-4 w-4 inline mr-1" />
              {new Date().toLocaleString()}
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.region}</p>
            </div>
            <Badge variant="secondary">{user.role}</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-balance">Collaborative Data Entry</h2>
            <p className="text-muted-foreground">
              Input daily plan and actual data for sites and activities. All entries are automatically timestamped and
              tracked.
              {user.region !== "All Regions" && (
                <span className="block text-sm mt-1">
                  You have access to:{" "}
                  <Badge variant="outline" className="ml-1">
                    {user.region}
                  </Badge>
                </span>
              )}
            </p>
          </div>

          {/* Success Alert */}
          {submitSuccess && (
            <Alert className="border-primary/20 bg-primary/5">
              <CheckCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-primary">
                Data submitted successfully! Entry has been recorded and timestamped.
              </AlertDescription>
            </Alert>
          )}

          {/* Entry Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Entry Type
              </CardTitle>
              <CardDescription>Select whether you're entering planned or actual data</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={entryType} onValueChange={(value) => setEntryType(value as "plan" | "actual")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="plan" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Daily Plan (Morning)
                  </TabsTrigger>
                  <TabsTrigger value="actual" className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Daily Actual (Evening)
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* Site Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Region Selection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a region" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRegions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {user.region !== "All Regions" && (
                  <p className="text-xs text-muted-foreground mt-2">Access limited to your assigned region</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Site Selection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedSite} onValueChange={setSelectedSite} disabled={!selectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a site" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredSites.map((site) => (
                      <SelectItem key={site.id} value={site.id}>
                        {site.id} - {site.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Activity Data Entry */}
          {selectedSite && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Activity Data Entry
                </CardTitle>
                <CardDescription>
                  Enter {entryType === "plan" ? "planned" : "actual"} quantities for each activity at{" "}
                  {sites.find((s) => s.id === selectedSite)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="space-y-2">
                        <Label htmlFor={activity.id} className="flex items-center justify-between">
                          <span>{activity.name}</span>
                          <Badge variant="outline" className="text-xs">
                            Weight: {activity.weight}%
                          </Badge>
                        </Label>
                        <Input
                          id={activity.id}
                          type="number"
                          placeholder="Enter quantity"
                          value={formData[activity.id] || ""}
                          onChange={(e) => handleActivityChange(activity.id, e.target.value)}
                          min="0"
                          step="0.1"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any relevant notes or observations..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      <AlertCircle className="h-4 w-4 inline mr-1" />
                      All entries are automatically timestamped and tracked
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="min-w-32">
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Submit {entryType === "plan" ? "Plan" : "Actual"}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Recent Entries */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Entries</CardTitle>
              <CardDescription>Latest data entries from your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    site: "SITE-001",
                    type: "Actual",
                    user: "John Smith",
                    time: "2 hours ago",
                    activities: 5,
                  },
                  {
                    site: "SITE-002",
                    type: "Plan",
                    user: "Sarah Johnson",
                    time: "4 hours ago",
                    activities: 7,
                  },
                  {
                    site: "SITE-003",
                    type: "Actual",
                    user: "Mike Wilson",
                    time: "6 hours ago",
                    activities: 4,
                  },
                ].map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded">
                        <Building2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{entry.site}</p>
                        <p className="text-xs text-muted-foreground">
                          {entry.activities} activities • {entry.user}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={entry.type === "Plan" ? "secondary" : "outline"} className="mb-1">
                        {entry.type}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{entry.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
