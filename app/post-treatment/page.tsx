"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Check, Clock, AlertCircle } from "lucide-react"

const stages = [
  { id: 1, name: "Initial Care (24h)", completed: true },
  { id: 2, name: "Recovery (48-72h)", completed: false, current: true },
  { id: 3, name: "Follow-up Care", completed: false },
]

const instructions = [
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

export default function TreatmentPlanPage() {
  const completedInstructions = instructions.flatMap((section) => section.items).filter((item) => item.completed).length
  const totalInstructions = instructions.flatMap((section) => section.items).length
  const progressPercentage = (completedInstructions / totalInstructions) * 100

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Laser Skin Resurfacing Recovery Guide</h1>

      <Card>
        <CardHeader>
          <CardTitle>Treatment Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-2">
            <span>Progress</span>
            <span>
              {completedInstructions} of {totalInstructions} tasks completed
            </span>
          </div>
          <Progress value={progressPercentage} className="w-full" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recovery Stages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Post-Treatment Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {instructions.map((section) => (
              <div key={section.id}>
                <h3 className="font-semibold mb-2">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => {}} // Add functionality to update completion status
                        className="mr-2"
                      />
                      <span className={item.completed ? "line-through text-gray-500" : ""}>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
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
    </div>
  )
}

