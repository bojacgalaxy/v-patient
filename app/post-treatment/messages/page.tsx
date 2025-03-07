import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const messages = [
  { id: 1, from: "Dr. Smith", subject: "Follow-up on your treatment", date: "2023-05-28", read: false },
  { id: 2, from: "Nurse Johnson", subject: "Appointment reminder", date: "2023-05-25", read: true },
  { id: 3, from: "ABC Clinic", subject: "New treatment options available", date: "2023-05-20", read: true },
]

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Messages</h1>

      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {messages.map((message) => (
              <li key={message.id} className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${message.read ? "text-gray-700" : "text-black"}`}>{message.from}</p>
                  <p className={`text-sm ${message.read ? "text-gray-500" : "text-gray-700"}`}>{message.subject}</p>
                  <p className="text-xs text-gray-400">{message.date}</p>
                </div>
                <Button variant="outline" size="sm">
                  Read
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

