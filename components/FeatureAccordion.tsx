import type React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const features = [
  {
    title: "Patient Portal",
    description:
      "Personalized dashboards with upcoming treatments, treatment history, care plans, and pre-treatment instructions.",
  },
  {
    title: "Branded Communications",
    description: "Automated appointment confirmations, post-treatment care instructions, and promotional materials.",
  },
  {
    title: "Patient Feedback Surveys",
    description: "Automated follow-ups, treatment outcome tracking, and clinic dashboards for aggregated metrics.",
  },
  {
    title: "Analytics & Insights",
    description: "Track patient retention rates, popular treatments, peak booking times, and practitioner utilization.",
  },
]

const FeatureAccordion: React.FC = () => {
  return (
    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
      {features.map((feature, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger>{feature.title}</AccordionTrigger>
          <AccordionContent>{feature.description}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default FeatureAccordion

