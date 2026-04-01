"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useConferenceStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Users, UtensilsCrossed, Armchair, TrendingUp, Download, Trash2 } from "lucide-react"
import { toast } from "sonner"

export default function AdminDashboard() {
  const { registrations, removeRegistration, clearRegistrations } = useConferenceStore()
  const [activeTab, setActiveTab] = useState("overview")

  const stats = useMemo(() => {
    const mondayBreakfast = registrations.filter(r => r.bfast_mon).length
    const tuesdayBreakfast = registrations.filter(r => r.bfast_tue).length
    const lunch = registrations.filter(r => r.lunch).length
    const dinner = registrations.filter(r => r.dinner).length
    const visionScreening = registrations.filter(r => r.vision_screening).length

    const speakerPreferences: Record<string, number> = {}
    registrations.forEach(r => {
      if (r.pref_spk) {
        speakerPreferences[r.pref_spk] = (speakerPreferences[r.pref_spk] || 0) + 1
      }
    })

    return {
      totalAttendees: registrations.length,
      mondayBreakfast,
      tuesdayBreakfast,
      lunch,
      dinner,
      visionScreening,
      speakerPreferences
    }
  }, [registrations])

  const recommendations = useMemo(() => {
    const bufferMultiplier = 1.1
    
    const mondayBreakfastLunches = Math.ceil(stats.mondayBreakfast * bufferMultiplier)
    const tuesdayBreakfastLunches = Math.ceil(stats.tuesdayBreakfast * bufferMultiplier)
    const lunchMeals = Math.ceil(stats.lunch * bufferMultiplier)
    
    const totalSeatsNeeded = Math.max(stats.mondayBreakfast, stats.tuesdayBreakfast, stats.lunch)
    const roomCapacity = Math.ceil(totalSeatsNeeded * 1.15)
    
    const speakerTableSeating: Record<string, number> = {}
    Object.entries(stats.speakerPreferences).forEach(([speaker, count]) => {
      speakerTableSeating[speaker] = Math.ceil(count * 1.1)
    })

    return {
      mondayBreakfastLunches,
      tuesdayBreakfastLunches,
      lunchMeals,
      totalSeatsNeeded,
      roomCapacity,
      speakerTableSeating
    }
  }, [stats])

  const handleExportData = () => {
    const dataStr = JSON.stringify(registrations, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `conference-registrations-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    toast.success("Data exported successfully")
  }

  const handleClearAll = () => {
    if (confirm("Are you sure you want to delete all registrations? This cannot be undone.")) {
      clearRegistrations()
      toast.success("All registrations cleared")
    }
  }

  const handleDeleteRegistration = (id: string) => {
    if (confirm("Are you sure you want to delete this registration?")) {
      removeRegistration(id)
      toast.success("Registration deleted")
    }
  }

  return (
    <div className="min-h-screen bg-[#F9F5EE]">
      <nav className="bg-[#1B2A4A] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-[#E8B96A] text-xl font-bold font-[family-name:var(--font-playfair)]">
            Conference Admin Dashboard
          </h1>
        </div>
        <Link href="/">
          <Button variant="outline" size="sm" className="bg-[#E8B96A]/10 border-[#E8B96A]/50 text-[#E8B96A] hover:bg-[#E8B96A]/20">
            <Home className="w-4 h-4 mr-2" />
            Back to Conference
          </Button>
        </Link>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-900 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Total Attendees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{stats.totalAttendees}</div>
              <p className="text-xs text-blue-700 mt-1">Registered participants</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-green-900 flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4" />
                Monday Breakfast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900">{stats.mondayBreakfast}</div>
              <p className="text-xs text-green-700 mt-1">May 4 attendees</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-purple-900 flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4" />
                Podium Lunch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900">{stats.lunch}</div>
              <p className="text-xs text-purple-700 mt-1">Speaker lunch attendees</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-orange-900 flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4" />
                Tuesday Breakfast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-900">{stats.tuesdayBreakfast}</div>
              <p className="text-xs text-orange-700 mt-1">May 5 attendees</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-[#1B2A4A]/20">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="attendees">Attendees</TabsTrigger>
            <TabsTrigger value="speakers">Speaker Tables</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Quick Stats
                  </CardTitle>
                  <CardDescription>Current registration summary</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm font-medium">Total Registrations</span>
                    <span className="text-lg font-bold text-[#1B2A4A]">{stats.totalAttendees}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm font-medium">Monday Breakfast</span>
                    <span className="text-lg font-bold text-green-600">{stats.mondayBreakfast}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm font-medium">Tuesday Breakfast</span>
                    <span className="text-lg font-bold text-orange-600">{stats.tuesdayBreakfast}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm font-medium">Beyond the Podium Lunch</span>
                    <span className="text-lg font-bold text-purple-600">{stats.lunch}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm font-medium">Monday Dinner (Poop Deck)</span>
                    <span className="text-lg font-bold text-blue-600">{stats.dinner}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium">Vision Screenings</span>
                    <span className="text-lg font-bold text-teal-600">{stats.visionScreening}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Export or clear registration data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={handleExportData} className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export All Data (JSON)
                  </Button>
                  <Button onClick={handleClearAll} className="w-full" variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All Registrations
                  </Button>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                    <strong>Note:</strong> Data is stored locally in your browser. Export regularly to prevent data loss.
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5" />
                  Meal Recommendations
                </CardTitle>
                <CardDescription>Recommended quantities with 10% buffer for safety</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <h4 className="font-semibold text-green-900 mb-2">Monday Breakfast (May 4)</h4>
                  <p className="text-2xl font-bold text-green-700">{recommendations.mondayBreakfastLunches} lunches</p>
                  <p className="text-sm text-green-600 mt-1">Based on {stats.mondayBreakfast} attendees + 10% buffer</p>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                  <h4 className="font-semibold text-orange-900 mb-2">Tuesday Breakfast (May 5)</h4>
                  <p className="text-2xl font-bold text-orange-700">{recommendations.tuesdayBreakfastLunches} lunches</p>
                  <p className="text-sm text-orange-600 mt-1">Based on {stats.tuesdayBreakfast} attendees + 10% buffer</p>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                  <h4 className="font-semibold text-purple-900 mb-2">Beyond the Podium Lunch (Monday)</h4>
                  <p className="text-2xl font-bold text-purple-700">{recommendations.lunchMeals} meals</p>
                  <p className="text-sm text-purple-600 mt-1">Based on {stats.lunch} attendees + 10% buffer</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Armchair className="w-5 h-5" />
                  Seating Recommendations
                </CardTitle>
                <CardDescription>Room capacity and seating arrangements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <h4 className="font-semibold text-blue-900 mb-2">Peak Attendance</h4>
                  <p className="text-2xl font-bold text-blue-700">{recommendations.totalSeatsNeeded} seats</p>
                  <p className="text-sm text-blue-600 mt-1">Maximum concurrent attendees</p>
                </div>

                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded">
                  <h4 className="font-semibold text-indigo-900 mb-2">Recommended Room Capacity</h4>
                  <p className="text-2xl font-bold text-indigo-700">{recommendations.roomCapacity} seats</p>
                  <p className="text-sm text-indigo-600 mt-1">With 15% buffer for comfort and flexibility</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Seating Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Monday Morning Sessions:</span>
                      <span className="font-semibold">{stats.mondayBreakfast} seats</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monday Lunch:</span>
                      <span className="font-semibold">{stats.lunch} seats</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tuesday Morning:</span>
                      <span className="font-semibold">{stats.tuesdayBreakfast} seats</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendees" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Registrations ({stats.totalAttendees})</CardTitle>
                <CardDescription>Complete list of registered attendees</CardDescription>
              </CardHeader>
              <CardContent>
                {registrations.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No registrations yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {registrations.map((reg) => (
                      <div key={reg.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-lg text-[#1B2A4A]">
                              {reg.fname} {reg.lname}
                            </h4>
                            <p className="text-sm text-gray-600">{reg.email}</p>
                            {reg.phone && <p className="text-sm text-gray-600">{reg.phone}</p>}
                            {reg.org && <p className="text-sm text-gray-500 mt-1">{reg.org}</p>}
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteRegistration(reg.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                          <div className={`px-2 py-1 rounded ${reg.bfast_mon ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                            Mon Breakfast: {reg.bfast_mon ? '✓' : '✗'}
                          </div>
                          <div className={`px-2 py-1 rounded ${reg.bfast_tue ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-500'}`}>
                            Tue Breakfast: {reg.bfast_tue ? '✓' : '✗'}
                          </div>
                          <div className={`px-2 py-1 rounded ${reg.lunch ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-500'}`}>
                            Lunch: {reg.lunch ? '✓' : '✗'}
                          </div>
                          <div className={`px-2 py-1 rounded ${reg.vision_screening ? 'bg-teal-100 text-teal-800' : 'bg-gray-100 text-gray-500'}`}>
                            Vision: {reg.vision_screening ? '✓' : '✗'}
                          </div>
                        </div>
                        
                        {reg.pref_spk && (
                          <div className="mt-3 text-sm bg-blue-50 border border-blue-200 rounded p-2">
                            <strong className="text-blue-900">Preferred Speaker:</strong> {reg.pref_spk}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="speakers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Speaker Table Assignments</CardTitle>
                <CardDescription>Beyond the Podium lunch seating preferences</CardDescription>
              </CardHeader>
              <CardContent>
                {Object.keys(stats.speakerPreferences).length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No speaker preferences selected yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(stats.speakerPreferences)
                      .sort(([, a], [, b]) => b - a)
                      .map(([speaker, count]) => (
                        <div key={speaker} className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-purple-50 to-white">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-[#1B2A4A]">{speaker}</h4>
                            <span className="text-2xl font-bold text-purple-600">{count}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Requests: {count}</span>
                            <span>•</span>
                            <span className="font-semibold text-purple-700">
                              Recommended seats: {recommendations.speakerTableSeating[speaker] || Math.ceil(count * 1.1)}
                            </span>
                          </div>
                          <div className="mt-2 bg-purple-100 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-purple-600 h-full transition-all"
                              style={{ width: `${(count / stats.lunch) * 100}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {((count / stats.lunch) * 100).toFixed(1)}% of lunch attendees
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Table Planning Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                  <strong className="text-blue-900">Total Lunch Attendees:</strong> {stats.lunch}
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
                  <strong className="text-yellow-900">Seating Strategy:</strong> Each speaker table should accommodate 8-10 people for intimate conversation
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
                  <strong className="text-green-900">Buffer Recommendation:</strong> Add 10% extra seats per table for flexibility
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
