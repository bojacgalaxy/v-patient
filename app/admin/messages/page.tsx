"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

const messages = [
  {
    id: 1,
    patient: "Sarah Johnson",
    messages: [
      { content: "Question about post-treatment care", date: "2025-02-15", sender: "patient" },
      {
        content: "Hello Sarah, what specific questions do you have about post-treatment care?",
        date: "2025-02-15",
        sender: "admin",
      },
      { content: "How often should I apply the ointment?", date: "2025-02-16", sender: "patient" },
      {
        content: "Please apply the ointment twice daily, in the morning and evening, for the next 7 days.",
        date: "2025-02-16",
        sender: "admin",
      },
      {
        content: "Don't forget about our special offer: 20% off your next treatment if booked within the next 30 days!",
        date: "2025-02-18",
        sender: "automated",
      },
    ],
  },
  {
    id: 2,
    patient: "Michael Chen",
    messages: [
      { content: "Appointment rescheduling request", date: "2025-02-14", sender: "patient" },
      {
        content: "Certainly, Michael. When would you like to reschedule your appointment?",
        date: "2025-02-14",
        sender: "admin",
      },
      { content: "Can I move it to next week, preferably Tuesday afternoon?", date: "2025-02-15", sender: "patient" },
      {
        content: "I've rescheduled your appointment for next Tuesday at 2:00 PM. Does that work for you?",
        date: "2025-02-15",
        sender: "admin",
      },
      {
        content: "Just a reminder: We're offering a complimentary skin analysis with your next visit!",
        date: "2025-02-16",
        sender: "automated",
      },
    ],
  },
  {
    id: 3,
    patient: "Emma Davis",
    messages: [
      { content: "Follow-up on treatment results", date: "2025-02-13", sender: "patient" },
      {
        content: "Hi Emma, how are you feeling after your recent treatment? Have you noticed any changes?",
        date: "2025-02-13",
        sender: "admin",
      },
      { content: "I've seen some improvement, but I have a few concerns.", date: "2025-02-14", sender: "patient" },
      {
        content:
          "I understand. Let's schedule a quick follow-up appointment to address your concerns. How does tomorrow at 11 AM sound?",
        date: "2025-02-14",
        sender: "admin",
      },
      {
        content: "Exciting news! We've just introduced a new anti-aging treatment. Would you like to learn more?",
        date: "2025-02-17",
        sender: "automated",
      },
    ],
  },
]

export default function MessagesPage() {
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null)
  const [reply, setReply] = useState("")

  const handleSelectPatient = (id: number) => {
    setSelectedPatient(id)
    setReply("")
  }

  const handleSendReply = () => {
    console.log("Sending reply:", reply)
    setReply("")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Messages</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Last Message</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((thread) => (
                  <TableRow key={thread.id} onClick={() => handleSelectPatient(thread.id)} className="cursor-pointer">
                    <TableCell>{thread.patient}</TableCell>
                    <TableCell>{thread.messages[thread.messages.length - 1].content}</TableCell>
                    <TableCell>{thread.messages[thread.messages.length - 1].date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Message History</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedPatient ? (
              <div className="space-y-4">
                <h3 className="font-semibold">{messages.find((m) => m.id === selectedPatient)?.patient}</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {messages
                    .find((m) => m.id === selectedPatient)
                    ?.messages.map((message, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded-lg ${
                          message.sender === "patient"
                            ? "bg-gray-100"
                            : message.sender === "admin"
                              ? "bg-blue-100 ml-auto"
                              : "bg-green-100"
                        }`}
                      >
                        <p className="font-semibold">
                          {message.sender.charAt(0).toUpperCase() + message.sender.slice(1)}:
                        </p>
                        <p>{message.content}</p>
                        <p className="text-xs text-gray-500">{message.date}</p>
                      </div>
                    ))}
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Type your reply here..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                  <Button onClick={handleSendReply}>
                    <Send className="w-4 h-4 mr-2" />
                    Send Reply
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Select a patient to view message history</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

