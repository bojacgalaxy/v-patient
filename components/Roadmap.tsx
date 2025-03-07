import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const roadmapItems = [
  {
    phase: "Phase 1",
    focus: "Guide.co Core: Patient Portal, Automated Comms, Feedback Surveys, basic analytics.",
    timeline: "Months 0–3",
  },
  {
    phase: "Phase 2",
    focus: "Pilot with design partner clinics; refine workflows and branded content.",
    timeline: "Months 3–6",
  },
  {
    phase: "Phase 3",
    focus: "Noom-Like Expansion: Add daily coaching features (check-ins, habit formation), community.",
    timeline: "Months 6–9",
  },
  {
    phase: "Phase 4",
    focus: "Full commercial launch to broader clinic network; enhance AI-driven personalization.",
    timeline: "Months 9–12",
  },
]

const Roadmap: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {roadmapItems.map((item, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{item.phase}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Focus:</strong> {item.focus}
            </p>
            <p>
              <strong>Timeline:</strong> {item.timeline}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Roadmap

