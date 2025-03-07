/* 
  ----------------------------------------------------------------------------
  CLIENT COMPONENT for chat
  For now, this is purely local mock data so you can unify the chat on the same page.
  Later, we'll connect it to a real DB table or an API route to store/retrieve messages.
  ----------------------------------------------------------------------------
*/

"use client"
import React from "react"

export default function PatientPortalChat({ patientId }: { patientId: number }) {
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
    // In the future, we'll call an API route to post this message to the DB.
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
