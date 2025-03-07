/**
 * File: app/clinic/[slug]/page.tsx
 * Purpose: Patient-facing portal page that displays:
 *   - Patient details (from DB, via portal_slug)
 *   - Language-based welcome message
 *   - A simple chat conversation area (mock data for now)
 *
 * In a future step, we can connect the chat to a real DB table and
 * add API routes to store/retrieve messages. For now, this is a mock
 * to unify pre/post consult chat in one place.
 */

import { notFound } from "next/navigation"
import db from "@/lib/db" // or your DB connection
import type { Metadata } from "next"
import React from "react"

// We’ll import a simple Chat component to keep our code tidy below.
import PatientPortalChat from "./patient-chat"

type Patient = {
  id: number
  name: string
  email: string
  phone: string
  portal_slug: string
  portal_language: string
  // plus any other fields
}

// If you want to set dynamic <title> etc.:
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // In real code, fetch the patient name from DB if you want a personalized <title>
  return {
    title: `Patient Portal`,
  }
}

export default async function PatientPortalPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // 1. Lookup the patient by portal_slug
  const result = await db.query<Patient>(
    `SELECT * FROM patients WHERE portal_slug = $1 LIMIT 1`,
    [slug]
  )
  if (!result.rowCount) {
    notFound()
  }
  const patient = result.rows[0]

  // 2. Check language
  const lang = patient.portal_language || "en"

  // 3. Simple translations
  const translations = {
    en: {
      heading: `Welcome, ${patient.name}!`,
      instructions: `These are your personalized instructions.`,
    },
    es: {
      heading: `¡Bienvenido, ${patient.name}!`,
      instructions: `Estas son tus instrucciones personalizadas.`,
    },
    fr: {
      heading: `Bienvenue, ${patient.name} !`,
      instructions: `Voici vos instructions personnalisées.`,
    },
  }
  const t = translations[lang as keyof typeof translations] || translations.en

  return (
    <div className="p-6 space-y-8">
      <section>
        <h1 className="text-2xl font-bold mb-4">{t.heading}</h1>
        <p className="mb-2">{t.instructions}</p>
        <p className="text-gray-600">Email: {patient.email}</p>
        <p className="text-gray-600">Phone: {patient.phone}</p>
        {/* Add any additional info: last visit, treatments, etc. */}
      </section>

      {/* Here’s the new conversation area */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Messages &amp; Chat</h2>
        {/* We pass the patient ID so the chat component can later fetch real data. */}
        <PatientPortalChat patientId={patient.id} />
      </section>
    </div>
  )
}

/* 
  ----------------------------------------------------------------------------
  CLIENT COMPONENT for chat
  For now, this is purely local mock data so you can unify the chat on the same page.
  Later, we’ll connect it to a real DB table or an API route to store/retrieve messages.
  ----------------------------------------------------------------------------
*/

"use client"
function PatientPortalChat({ patientId }: { patientId: number }) {
  // Mock messages for demonstration:
  const [messages, setMessages] = React.useState([
    {
      content: "Hello, I'd like more info about pre-treatment care.",
      date: "2025-03-01",
      sender: "patient",
    },
    {
      content: "Sure! Please avoid sun exposure for 2 days prior to visit.",
      date: "2025-03-01",
      sender: "admin",
    },
  ])

  const [draft, setDraft] = React.useState("")

  const handleSend = () => {
    if (!draft.trim()) return
    // For now, we simply add a new item to the local state.
    // In the future, we’ll call an API route to post this message to the DB.
    const newMessage = {
      content: draft.trim(),
      date: new Date().toISOString().split("T")[0], // e.g. 2025-03-07
      sender: "patient", // or 'admin' depending on context
    }
    setMessages((prev) => [...prev, newMessage])
    setDraft("")
  }

  return (
    <div className="border rounded-md p-4 space-y-4">
      <div className="max-h-64 overflow-y-auto space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg ${
              msg.sender === "patient" ? "bg-gray-100" : "bg-blue-100"
            }`}
          >
            <p className="font-semibold capitalize">
              {msg.sender === "patient" ? "You" : "Clinic Staff"}
            </p>
            <p>{msg.content}</p>
            <small className="text-gray-500">{msg.date}</small>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="border rounded-md flex-1 p-2 text-sm"
          placeholder="Type your message..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  )
}
