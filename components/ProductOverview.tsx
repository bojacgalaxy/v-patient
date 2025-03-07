import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const ProductOverview: React.FC = () => {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>SkinGuide: Your Clinic-Backed Skincare Companion</CardTitle>
        <CardDescription>Powered by Guided Workflows</CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-semibold mb-2">Vision</h2>
        <p className="mb-4">
          We aim to create a comprehensive platform that helps dermatology clinics and medspas manage patient
          communications, deliver timely and personalized treatment instructions, automate routine tasks, and collect
          ongoing feedback. Simultaneously, we'll layer on a habit-forming, coaching-oriented experience (akin to Noom)
          to keep users engaged in their skincare journey over the long haul.
        </p>
        <h2 className="text-xl font-semibold mb-2">Core Value Proposition</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Guided Care Workflow (Guide.co Style):</strong> Automate the delivery of pre- and post-treatment
            instructions. Provide a personalized patient portal for treatment history, appointments, and recommended
            regimens.
          </li>
          <li>
            <strong>Noom-like Coaching (Future Roadmap):</strong> Layer in daily check-ins, habit tracking, and
            behavioral psychology to foster long-term skincare adherence. Offer personalized coaching and educational
            modules.
          </li>
          <li>
            <strong>Data-Driven Insights:</strong> Provide analytics for clinics to track patient retention, feedback
            scores, and popular treatments. Allow users to see their own progress over time.
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

export default ProductOverview

