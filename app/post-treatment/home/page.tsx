import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PatientHomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome, [Patient Name]</h1>

      <Card>
        <CardHeader>
          <CardTitle>About ABC Clinic</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            ABC Clinic is a leading dermatology and aesthetic medicine provider, offering cutting-edge treatments and
            personalized care. Our team of expert dermatologists and aestheticians are committed to helping you achieve
            your skincare goals and maintain healthy, beautiful skin.
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
              <strong>Name:</strong> [Patient Name]
            </p>
            <p>
              <strong>Date of Birth:</strong> [Patient DOB]
            </p>
            <p>
              <strong>Email:</strong> [Patient Email]
            </p>
            <p>
              <strong>Phone:</strong> [Patient Phone]
            </p>
            <p>
              <strong>Address:</strong> [Patient Address]
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Completed Laser Skin Resurfacing treatment on [Date]</li>
            <li>Upcoming follow-up appointment on [Date]</li>
            <li>New message from Dr. Smith regarding your treatment plan</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

