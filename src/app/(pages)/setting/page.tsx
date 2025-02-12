"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    email: "user@example.com",
    notificationsEnabled: true,
    checkFrequency: "5",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setSettings((prev) => ({ ...prev, notificationsEnabled: checked }))
  }

  const handleSelectChange = (value: string) => {
    setSettings((prev) => ({ ...prev, checkFrequency: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated settings to your backend
    console.log(settings)
  }

  return (
    <div className="flex justify-center py-[10vh]">
      <div className="space-y-8 w-[500px]">
        <h1 className="text-3xl font-bold">Settings</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Notification Email</Label>
            <Input id="email" name="email" type="email" className="p-6" value={settings.email} onChange={handleChange} required />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="notifications" checked={settings.notificationsEnabled} onCheckedChange={handleSwitchChange}/>
            <Label htmlFor="notifications">Enable Email Notifications</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="checkFrequency">Check Frequency (minutes)</Label>
            <Select value={settings.checkFrequency} onValueChange={handleSelectChange}>
              <SelectTrigger className="p-6">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Hour</SelectItem>
                <SelectItem value="2">1 Day</SelectItem>
                <SelectItem value="3">1 Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="p-6">Save Settings</Button>
        </form>
      </div>
    </div>
  )
}

