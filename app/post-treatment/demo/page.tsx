"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Clock, AlertCircle, Home, MessageSquare, Calendar, Stethoscope } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

const stages = [
  { id: 1, name: "Initial Care (24h)", completed: true },
  { id: 2, name: "Recovery (48-72h)", completed: false, current: true },
  { id: 3, name: "Follow-up Care", completed: false },
]

const initialInstructions = [
  {
    id: 1,
    title: "Immediate Care Instructions",
    items: [
      { id: 1, text: "Apply provided ointment twice daily", completed: false },
      { id: 2, text: "Avoid direct sunlight for 7 days", completed: false },
      { id: 3, text: "Do not use any other skincare products for 48 hours", completed: false },
    ],
  },
  {
    id: 2,
    title: "Recovery Period",
    items: [
      { id: 4, text: "Gently clean the treated area with lukewarm water 3 times a day", completed: false },
      {
        id: 5,
        text: "If you experience severe redness, swelling, or fever, contact the clinic immediately",
        completed: false,
      },
    ],
  },
]

const careTeam = [
  { id: 1, name: "Dr. Sarah Smith", role: "Primary Dermatologist at ABC Clinic", image: "/placeholder.svg" },
  { id: 2, name: "Emma Johnson", role: "Care Coordinator at ABC Clinic", image: "/placeholder.svg" },
]

const messages = [
  {
    id: 1,
    title: "Post-Treatment Feedback",
    content: "We hope your recent treatment went well. Please take a moment to provide feedback on your experience.",
    date: "2023-05-28",
    unread: true,
  },
  {
    id: 2,
    title: "Appointment Reminder",
    content: "Your follow-up appointment is scheduled for June 5th at 2:00 PM. Please confirm your attendance.",
    date: "2023-05-25",
    unread: false,
  },
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

export default function PostTreatmentDemo() {
  const [activeTab, setActiveTab] = useState<"home" | "treatment" | "messages" | "appointments">("treatment")
  const [instructions, setInstructions] = useState(initialInstructions)
  const [selectedMessage, setSelectedMessage] = useState(messages[0])
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [appointmentsView, setAppointmentsView] = useState<"upcoming" | "past">("upcoming")
  const [feedbackAnswers, setFeedbackAnswers] = useState({
    painLevel: "",
    sideEffects: "",
    expectationsMet: "",
    recommendTreatment: "",
    additionalTreatments: "",
    improvementSuggestions: "",
  })

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">ABC Clinic</span>
            </div>
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("home")}
                className={`text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md ${
                  activeTab === "home" ? "text-primary" : ""
                }`}
              >
                <Home className="w-6 h-6" />
              </button>
              <button
                onClick={() => setActiveTab("treatment")}
                className={`text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md ${
                  activeTab === "treatment" ? "text-primary" : ""
                }`}
              >
                <Stethoscope className="w-6 h-6" />
              </button>
              <button
                onClick={() => setActiveTab("messages")}
                className={`text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md ${
                  activeTab === "messages" ? "text-primary" : ""
                }`}
              >
                <MessageSquare className="w-6 h-6" />
              </button>
              <button
                onClick={() => setActiveTab("appointments")}
                className={`text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md ${
                  activeTab === "appointments" ? "text-primary" : ""
                }`}
              >
                <Calendar className="w-6 h-6" />
              </button>
            </nav>
          </div>
        </div>
      </header>

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
            {activeTab === "home" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About ABC Clinic</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      ABC Clinic is a leading dermatology and aesthetic medicine provider, offering cutting-edge
                      treatments and personalized care. Our team of expert dermatologists and aestheticians are
                      committed to helping you achieve your skincare goals and maintain healthy, beautiful skin.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Your Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>
                        <strong>Name:</strong> John Doe
                      </p>
                      <p>
                        <strong>Date of Birth:</strong> January 1, 1980
                      </p>
                      <p>
                        <strong>Email:</strong> john.doe@example.com
                      </p>
                      <p>
                        <strong>Phone:</strong> (123) 456-7890
                      </p>
                      <p>
                        <strong>Address:</strong> 123 Main St, Anytown, USA
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "treatment" && (
              <>
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h1 className="text-2xl font-bold mb-2">Laser Skin Resurfacing Recovery Guide</h1>
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

                <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-2">Need assistance?</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        If you have any concerns or questions about your recovery, don't hesitate to reach out.
                      </p>
                      <Button>Contact Care Team</Button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "messages" && (
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="border-b pb-4">
                        <h3 className="font-semibold">{message.title}</h3>
                        <p className="text-sm text-gray-500">{message.date}</p>
                        <p className="mt-2">{message.content}</p>
                      </div>
                    ))}
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
                                    <Button>Book Now</Button>
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

