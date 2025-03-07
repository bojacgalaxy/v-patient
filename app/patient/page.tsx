import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PatientDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome, [Patient Name]</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your next appointment is on [Date] at [Time]</p>
            <p>Treatment: [Treatment Name]</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Treatment Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You've completed 2 out of 5 sessions</p>
            {/* Add a progress bar component here */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Daily Skincare Routine</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5">
              <li>Cleanse with [Product Name]</li>
              <li>Apply [Serum Name]</li>
              <li>Moisturize with [Moisturizer Name]</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your last treatment was rated 4.5/5 stars</p>
            <p>"Great experience, my skin feels amazing!" - You, 2 days ago</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

