import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const appointments = [
  { id: 1, type: "Follow-up Consultation", date: "2023-06-15", time: "10:00 AM", provider: "Dr. Smith" },
  { id: 2, type: "Laser Treatment", date: "2023-07-01", time: "2:00 PM", provider: "Dr. Johnson" },
]

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Appointments</h1>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {appointments.map((appointment) => (
              <li key={appointment.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{appointment.type}</p>
                  <p className="text-sm text-gray-500">
                    {appointment.date} at {appointment.time}
                  </p>
                  <p className="text-sm text-gray-500">with {appointment.provider}</p>
                </div>
                <Button variant="outline" size="sm">
                  Reschedule
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Button>Schedule New Appointment</Button>
    </div>
  )
}

