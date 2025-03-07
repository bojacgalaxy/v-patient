"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

// This would typically come from an API call based on the treatment ID
const mockTreatmentData = {
  id: "123",
  name: "Laser Therapy",
  date: "2023-05-25",
  instructions: [
    { id: 1, text: "Apply provided ointment twice daily", completed: false },
    { id: 2, text: "Avoid direct sunlight for 48 hours", completed: false },
    { id: 3, text: "Do not use any other skincare products for 24 hours", completed: false },
    { id: 4, text: "If you experience severe redness or swelling, contact the clinic", completed: false },
  ],
}

export default function PostTreatmentPage({ params }: { params: { id: string } }) {
  const [treatment, setTreatment] = useState(mockTreatmentData)

  useEffect(() => {
    // In a real application, you would fetch the treatment data here
    // based on the params.id
    console.log("Treatment ID:", params.id)
  }, [params.id])

  const toggleInstruction = (id: number) => {
    setTreatment((prev) => ({
      ...prev,
      instructions: prev.instructions.map((instruction) =>
        instruction.id === id ? { ...instruction, completed: !instruction.completed } : instruction,
      ),
    }))
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Post-Treatment Care: {treatment.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Treatment Date: {treatment.date}</p>
            <h3 className="font-semibold mb-2">Instructions:</h3>
            <ul className="space-y-2">
              {treatment.instructions.map((instruction) => (
                <li key={instruction.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`instruction-${instruction.id}`}
                    checked={instruction.completed}
                    onCheckedChange={() => toggleInstruction(instruction.id)}
                  />
                  <label
                    htmlFor={`instruction-${instruction.id}`}
                    className={`flex-grow ${instruction.completed ? "line-through text-gray-500" : ""}`}
                  >
                    {instruction.text}
                  </label>
                </li>
              ))}
            </ul>
            <Button className="mt-6 w-full">Contact Clinic</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

