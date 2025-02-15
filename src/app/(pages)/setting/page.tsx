"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios, { AxiosResponse } from "axios"
import { useToast } from "@/hooks/use-toast"


export default function SettingsPage() {
  interface gmail {
    email: string,
    notificationsEnabled: boolean
  }
  const [settings, setSettings] = useState({
    email: "user@example.com",
    notificationsEnabled: true,
  })

  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("hello postdata");
    e.preventDefault();
    try {
      console.log("Data being sent:", settings); // Crucial: Inspect the data

      const response: AxiosResponse<gmail> = await axios.post(
        'http://localhost:5000/api/gmail/', // Add http://
        settings,
        {
          headers: {
            'Content-Type': 'application/json', // Explicitly set the content type
          },
        }
      );

      console.log("Response:", response.data); // Inspect the response
      toast({
        title: "alert",
        description: "New token is successfully added.",
      })
    } catch (error: any) {
      console.error("Error sending data:", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
      console.error("Error config:", error.config); // Log the configuration
    } finally {

    }
  };

  return (
    <div className="flex justify-center py-[10vh]">
      <div className="space-y-8 w-[500px]">
        <h1 className="text-3xl font-bold">Settings</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Notification Email</Label>
            <Input id="email" name="email" type="email" className="p-6" onChange={handleChange} required />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="notifications" checked={settings.notificationsEnabled} onCheckedChange={handleSwitchChange} />
            <Label htmlFor="notifications">Enable Email Notifications</Label>
          </div>
          {/* <div className="space-y-2">
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
          </div> */}
          <Button type="submit" className="p-6">Save Settings</Button>
        </form>
      </div>
    </div>
  )
}

