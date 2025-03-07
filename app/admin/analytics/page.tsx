"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const patientData = [
  { month: "Jan", count: 100 },
  { month: "Feb", count: 120 },
  { month: "Mar", count: 150 },
  { month: "Apr", count: 180 },
  { month: "May", count: 220 },
  { month: "Jun", count: 250 },
]

const treatmentData = [
  { name: "Laser Treatment", count: 50 },
  { name: "Chemical Peel", count: 30 },
  { name: "Microdermabrasion", count: 40 },
  { name: "Botox", count: 60 },
  { name: "Dermal Fillers", count: 35 },
]

const satisfactionData = [
  { month: "Jan", score: 4.2 },
  { month: "Feb", score: 4.3 },
  { month: "Mar", score: 4.5 },
  { month: "Apr", score: 4.4 },
  { month: "May", score: 4.6 },
  { month: "Jun", score: 4.8 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Patient Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={patientData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Treatment Popularity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={treatmentData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patient Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={satisfactionData}>
                <XAxis dataKey="month" />
                <YAxis domain={[0, 5]} />
                <Line type="monotone" dataKey="score" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <span>Total Patients</span>
                <span className="font-bold">1,250</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Average Treatment Value</span>
                <span className="font-bold">$180</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Monthly Revenue</span>
                <span className="font-bold">$45,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Patient Retention Rate</span>
                <span className="font-bold">85%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

