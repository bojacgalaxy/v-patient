import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email) {
    console.log("API: Email is required")
    return NextResponse.json({ error: "Email is required" }, { status: 400 })
  }

  try {
    console.log("API: Attempting to add email to Airtable:", email)
    const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Waitlist`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              Email: email,
              "Sign Up Date": new Date().toISOString(),
            },
          },
        ],
      }),
    })

    const data = await response.json()
    console.log("API: Airtable response:", data)

    if (!response.ok) {
      console.log("API: Error response from Airtable:", response.status, data)
      return NextResponse.json(
        {
          success: false,
          error: data.error?.message || "Failed to add email to waitlist",
        },
        {
          status: response.status,
        },
      )
    }

    console.log("API: Successfully added email to waitlist")
    return NextResponse.json({
      success: true,
      message: "Successfully added to waitlist",
    })
  } catch (error) {
    console.error("API: Error adding email to waitlist:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "An unexpected error occurred",
      },
      {
        status: 500,
      },
    )
  }
}

