"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Clock, MessageSquare, Calendar, Stethoscope, Send, Star, LogOut } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"

const stages = [
  { id: 1, name: "Initial Care (24h)", completed: true },
  { id: 2, name: "Recovery (48-72h)", completed: false, current: true },
  { id: 3, name: "Follow-up Care", completed: false },
]

// Update the initialInstructions to include the feedback task
const initialInstructions = [
  {
    id: 1,
    title: "Post-Treatment Care Instructions",
    items: [
      { id: 1, text: "Apply provided ointment twice daily", completed: false },
      { id: 2, text: "Avoid direct sunlight for 7 days", completed: false },
      { id: 3, text: "Do not use any other skincare products for 48 hours", completed: false },
      { id: 4, text: "Gently clean the treated area with lukewarm water 3 times a day", completed: false },
      {
        id: 5,
        text: "If you experience severe redness, swelling, or fever, contact the clinic immediately",
        completed: false,
      },
      { id: 6, text: "Provide post-treatment feedback", completed: false },
    ],
  },
]

const careTeam = [
  { id: 1, name: "Dr. Sarah Smith", role: "Primary Dermatologist at ABC Clinic", image: "/placeholder.svg" },
  { id: 2, name: "Emma Johnson", role: "Care Coordinator at ABC Clinic", image: "/placeholder.svg" },
]

const availableTreatments = [
  {
    id: 1,
    name: "Laser Skin Resurfacing",
    duration: "60 min",
    description: "Advanced treatment for skin texture and tone improvement",
  },
  {
    id: 2,
    name: "Chemical Peel",
    duration: "45 min",
    description: "Exfoliating treatment for renewed, brighter skin",
  },
  {
    id: 3,
    name: "Microdermabrasion",
    duration: "30 min",
    description: "Non-invasive treatment for skin rejuvenation",
  },
]

const completedTreatments = [
  { id: 1, name: "Laser Skin Resurfacing", date: "2025-01-15", provider: "Dr. Sarah Smith" },
  { id: 2, name: "Chemical Peel", date: "2024-11-20", provider: "Dr. Michael Chen" },
  { id: 3, name: "Microdermabrasion", date: "2024-09-05", provider: "Dr. Emma Johnson" },
]

const upcomingAppointments = [
  {
    id: 1,
    title: "Laser Treatment Follow-up",
    date: "2025-02-20",
    time: "2:00 PM",
    provider: "Dr. Sarah Smith",
    status: "confirmed",
  },
  {
    id: 2,
    title: "Skin Assessment",
    date: "2025-03-05",
    time: "10:30 AM",
    provider: "Dr. Michael Chen",
    status: "pending",
  },
]

const pastAppointments = [
  {
    id: 3,
    title: "Initial Consultation",
    date: "2025-01-15",
    time: "3:00 PM",
    provider: "Dr. Sarah Smith",
    status: "completed",
  },
  {
    id: 4,
    title: "Laser Treatment",
    date: "2025-02-01",
    time: "11:00 AM",
    provider: "Dr. Sarah Smith",
    status: "completed",
  },
]

const initialMessages = [
  {
    id: 1,
    title: "Post-Treatment Feedback",
    messages: [
      {
        content:
          "We hope your recent treatment went well. Please take a moment to provide feedback on your experience.",
        date: "2023-05-28",
        sender: "clinic",
      },
      {
        content: "Thank you for checking in. The treatment was great, but I have a question about the aftercare.",
        date: "2023-05-29",
        sender: "patient",
      },
      {
        content: "Of course! What specific questions do you have about the aftercare?",
        date: "2023-05-29",
        sender: "clinic",
      },
    ],
  },
  {
    id: 2,
    title: "Appointment Reminder",
    messages: [
      {
        content: "Your follow-up appointment is scheduled for June 5th at 2:00 PM. Please confirm your attendance.",
        date: "2023-05-25",
        sender: "clinic",
      },
      {
        content: "Thank you for the reminder. I confirm my attendance for the appointment.",
        date: "2023-05-26",
        sender: "patient",
      },
      {
        content: "Great! We look forward to seeing you on June 5th at 2:00 PM.",
        date: "2023-05-26",
        sender: "clinic",
      },
    ],
  },
]

export default function PatientDemo() {
  const [activeTab, setActiveTab] = useState<"treatment" | "messages" | "appointments">("treatment")
  const [instructions, setInstructions] = useState(initialInstructions)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [appointmentsView, setAppointmentsView] = useState<"upcoming" | "past">("upcoming")
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)
  const [selectedTreatment, setSelectedTreatment] = useState<(typeof availableTreatments)[0] | null>(null)
  const [feedbackAnswers, setFeedbackAnswers] = useState<{ [key: string]: string }>({})
  const [unreadMessages, setUnreadMessages] = useState(2) // Add this line to track unread messages

  const toggleInstruction = (sectionId: number, itemId: number) => {
    setInstructions((prevInstructions) =>
      prevInstructions.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item) => (item.id === itemId ? { ...item, completed: !item.completed } : item)),
            }
          : section,
      ),
    )
  }

  const completedInstructions = instructions.flatMap((section) => section.items).filter((item) => item.completed).length
  const totalInstructions = instructions.flatMap((section) => section.items).length
  const progressPercentage = (completedInstructions / totalInstructions) * 100

  const handleSubmitReview = () => {
    console.log("Submitted review:", { rating, review, feedbackAnswers })
  }

  const handleFeedbackChange = (key: string, value: string) => {
    setFeedbackAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-100"
      case "pending":
        return "text-yellow-600 bg-yellow-100"
      case "completed":
        return "text-blue-600 bg-blue-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMessageObj = {
        content: newMessage,
        date: new Date().toISOString().split("T")[0],
        sender: "patient",
      }
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, title: "New Message", messages: [newMessageObj] },
      ])
      setNewMessage("")
      setUnreadMessages(0) // Reset unread messages when sending a new message
    }
  }

  const handleBookTreatment = () => {
    if (selectedTreatment) {
      // Add a new message thread for the booking request
      const newThread = {
        id: messages.length + 1,
        title: `Booking Request: ${selectedTreatment.name}`,
        messages: [
          {
            content: `I would like to book a ${selectedTreatment.name} treatment. Please let me know the available time slots.`,
            date: new Date().toISOString().split("T")[0],
            sender: "patient",
          },
        ],
      }
      setMessages([...messages, newThread])
      setIsBookingDialogOpen(false)
      setSelectedTreatment(null)
    }
  }

  const handleSubmitFeedback = () => {
    console.log("Submitted feedback:", { rating, review })
    setFeedbackSubmitted(true)
    // Update the feedback task as completed
    setInstructions((prevInstructions) =>
      prevInstructions.map((section) => ({
        ...section,
        items: section.items.map((item) =>
          item.text === "Provide post-treatment feedback" ? { ...item, completed: true } : item,
        ),
      })),
    )
  }

  const remainingTasks = instructions.flatMap((section) => section.items).filter((item) => !item.completed).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">Venus Patient Portal</span>
            </div>
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("treatment")}
                className={`text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md ${
                  activeTab === "treatment" ? "text-primary" : ""
                }`}
              >
                <div className="relative">
                  <Stethoscope className="w-6 h-6" />
                  {remainingTasks > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {remainingTasks}
                    </span>
                  )}
                </div>
              </button>
              <button
                onClick={() => setActiveTab("messages")}
                className={`text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md ${
                  activeTab === "messages" ? "text-primary" : ""
                }`}
              >
                <div className="relative">
                  <MessageSquare className="w-6 h-6" />
                  {unreadMessages > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {unreadMessages}
                    </span>
                  )}
                </div>
              </button>
              <button
                onClick={() => setActiveTab("appointments")}
                className={`text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md ${
                  activeTab === "appointments" ? "text-primary" : ""
                }`}
              >
                <Calendar className="w-6 h-6" />
              </button>
              <button
                onClick={() => console.log("Logout clicked")}
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {stages.map((stage) => (
                <div
                  key={stage.id}
                  className={`flex items-center p-3 rounded-lg ${
                    stage.current ? "bg-blue-50 text-blue-700" : "text-gray-700"
                  }`}
                >
                  {stage.completed ? (
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                  ) : stage.current ? (
                    <Clock className="w-5 h-5 text-blue-500 mr-2" />
                  ) : (
                    <div className="w-5 h-5 border-2 rounded-full mr-2" />
                  )}
                  <span className="text-sm font-medium">{stage.name}</span>
                </div>
              ))}
            </nav>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Care Team</h3>
              <div className="space-y-4">
                {careTeam.map((member) => (
                  <div key={member.id} className="flex items-center space-x-3">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "treatment" && (
              <>
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h1 className="text-2xl font-bold mb-2">Laser Skin Resurfacing</h1>
                  <h2 className="text-xl font-semibold mb-4">Post-Treatment Instructions</h2>
                  <p className="text-gray-600 mb-4">
                    Follow these instructions carefully to ensure optimal results from your treatment.
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Treatment Date: May 25, 2023</span>
                    <span>•</span>
                    <span>Provider: Dr. Sarah Smith</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-2">Your Progress</h2>
                  <Progress value={progressPercentage} className="w-full" />
                  <p className="text-sm text-gray-600 mt-2">
                    {completedInstructions} of {totalInstructions} tasks completed
                  </p>
                </div>

                <div className="space-y-6">
                  {instructions.map((section) => (
                    <div key={section.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="px-6 py-4">
                        <h2 className="text-lg font-semibold mb-4">{section.title}</h2>
                        <ul className="space-y-3">
                          {section.items.map((item) => (
                            <li key={item.id} className="flex items-start space-x-3">
                              <button
                                className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${
                                  item.completed ? "bg-green-500 border-green-500" : "border-gray-300"
                                }`}
                                onClick={() => toggleInstruction(section.id, item.id)}
                              >
                                {item.completed && <Check className="w-3 h-3 text-white" />}
                              </button>
                              <span className={item.completed ? "text-gray-500 line-through" : ""}>{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Post-Treatment Feedback</h2>
                  {!feedbackSubmitted ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setRating(star)}
                              className={`focus:outline-none ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                            >
                              <Star className="w-6 h-6 fill-current" />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
                          Review
                        </label>
                        <Textarea
                          id="review"
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                          placeholder="Share your experience with the treatment..."
                          rows={4}
                        />
                      </div>
                      <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
                    </div>
                  ) : (
                    <div>
                      {rating === 5 ? (
                        <div className="space-y-4">
                          <p className="text-green-600 font-semibold">Thank you for your 5-star rating!</p>
                          <div className="bg-gray-100 p-4 rounded-md">
                            <p className="font-medium mb-2">Your review:</p>
                            <p className="italic">"{review}"</p>
                          </div>
                          <p>We'd greatly appreciate if you could share your experience on these platforms:</p>
                          <div className="flex flex-col space-y-2">
                            <Button asChild variant="outline" className="w-full justify-center">
                              <a
                                href="https://www.gangnamunni.com/abc-clinic"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center"
                              >
                                <Star className="w-4 h-4 mr-2" />
                                Rate on Gangnam Unni
                              </a>
                            </Button>
                            <Button asChild variant="outline" className="w-full justify-center">
                              <a
                                href="https://goo.gl/maps/abc-clinic"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center"
                              >
                                <Star className="w-4 h-4 mr-2" />
                                Rate on Google Maps
                              </a>
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-green-600 font-semibold">Thank you for your submission!</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Completed Treatments</h2>
                  <ul className="space-y-3">
                    {completedTreatments.map((treatment) => (
                      <li key={treatment.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{treatment.name}</p>
                          <p className="text-sm text-gray-500">{treatment.date}</p>
                        </div>
                        <p className="text-sm text-gray-500">{treatment.provider}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {activeTab === "messages" && (
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                    {messages.flatMap((thread) =>
                      thread.messages.map((message, index) => (
                        <div
                          key={`${thread.id}-${index}`}
                          className={`p-3 rounded-lg ${
                            message.sender === "patient" ? "bg-primary text-primary-foreground ml-auto" : "bg-secondary"
                          } max-w-[80%]`}
                        >
                          <p>{message.content}</p>
                          <p className="text-xs mt-1 opacity-70">{message.date}</p>
                        </div>
                      )),
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "appointments" && (
              <Card>
                <CardHeader>
                  <CardTitle>My Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={appointmentsView} onValueChange={(v) => setAppointmentsView(v as "upcoming" | "past")}>
                    <TabsList className="mb-4">
                      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                      <TabsTrigger value="past">Past</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upcoming">
                      <div className="space-y-4">
                        {upcomingAppointments.length > 0 ? (
                          upcomingAppointments.map((appointment) => (
                            <Card key={appointment.id}>
                              <CardContent className="pt-6">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-semibold text-lg">{appointment.title}</h3>
                                    <p className="text-sm text-gray-500">
                                      {appointment.date} at {appointment.time}
                                    </p>
                                    <p className="text-sm text-gray-500">with {appointment.provider}</p>
                                  </div>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                      appointment.status,
                                    )}`}
                                  >
                                    {appointment.status}
                                  </span>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">No upcoming appointments</div>
                        )}
                        <div className="mt-6">
                          <h3 className="font-semibold text-lg mb-4">Book a Treatment</h3>
                          <div className="grid gap-4">
                            {availableTreatments.map((treatment) => (
                              <Card key={treatment.id}>
                                <CardContent className="pt-6">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium">{treatment.name}</h4>
                                      <p className="text-sm text-gray-500">{treatment.description}</p>
                                      <p className="text-sm text-gray-500">Duration: {treatment.duration}</p>
                                    </div>
                                    <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
                                      <DialogTrigger asChild>
                                        <Button onClick={() => setSelectedTreatment(treatment)}>Book Now</Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Confirm Booking</DialogTitle>
                                          <DialogDescription>
                                            Are you sure you want to book a {selectedTreatment?.name} treatment?
                                          </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                          <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>
                                            Cancel
                                          </Button>
                                          <Button onClick={handleBookTreatment}>Confirm Booking</Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="past">
                      <div className="space-y-4">
                        {pastAppointments.map((appointment) => (
                          <Card key={appointment.id}>
                            <CardContent className="pt-6">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold text-lg">{appointment.title}</h3>
                                  <p className="text-sm text-gray-500">
                                    {appointment.date} at {appointment.time}
                                  </p>
                                  <p className="text-sm text-gray-500">with {appointment.provider}</p>
                                </div>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    appointment.status,
                                  )}`}
                                >
                                  {appointment.status}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

