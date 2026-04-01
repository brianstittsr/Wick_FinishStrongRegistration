"use client"

import { useState } from "react"
import { RegistrationData } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

interface EditRegistrationDialogProps {
  registration: RegistrationData
  onSave: (updated: RegistrationData) => void
  onClose: () => void
}

export function EditRegistrationDialog({ registration, onSave, onClose }: EditRegistrationDialogProps) {
  const [formData, setFormData] = useState(registration)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Edit Registration</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fname">First Name</Label>
                <Input
                  id="fname"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lname">Last Name</Label>
                <Input
                  id="lname"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="org">Organization</Label>
              <Input
                id="org"
                name="org"
                value={formData.org || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="jobtitle">Job Title</Label>
              <Input
                id="jobtitle"
                name="jobtitle"
                value={formData.jobtitle || ""}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="zip">State/ZIP</Label>
                <Input
                  id="zip"
                  name="zip"
                  value={formData.zip || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Meal Selections</Label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="bfast_mon"
                    checked={formData.bfast_mon}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Monday Breakfast</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="lunch"
                    checked={formData.lunch}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Beyond the Podium Lunch</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="dinner"
                    checked={formData.dinner}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Monday Dinner</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="bfast_tue"
                    checked={formData.bfast_tue}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Tuesday Breakfast</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="vision_screening"
                    checked={formData.vision_screening}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Vision Screening</span>
                </label>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">Save Changes</Button>
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
