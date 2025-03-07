import { notFound } from "next/navigation"
import db  from "@/lib/db" // or your DB connection
import type { Metadata } from "next"

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
  // In real code, fetch the patient name from DB
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

  // 3. Render in the chosen language
  // For a quick example, we’ll do a simple “if/else” on language
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t.heading}</h1>
      <p className="mb-2">{t.instructions}</p>
      <p className="text-gray-600">Email: {patient.email}</p>
      <p className="text-gray-600">Phone: {patient.phone}</p>
      {/* Add any additional info: last visit, treatments, etc. */}
    </div>
  )
}
