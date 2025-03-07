"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Send, Eye, Plus, Search } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Mock data for treatment history
const treatmentHistory = {
  1: [
    { date: "2023-05-15", treatment: "Laser Treatment" },
    { date: "2023-04-01", treatment: "Chemical Peel" },
  ],
  2: [{ date: "2023-05-10", treatment: "Microdermabrasion" }],
  3: [{ date: "2023-05-20", treatment: "Laser Treatment" }],
  4: [
    { date: "2023-06-01", treatment: "Botox Injection" },
    { date: "2023-05-01", treatment: "Facial" },
  ],
  5: [{ date: "2023-05-25", treatment: "Dermal Fillers" }],
}

const initialPatients = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    lastVisit: "2023-05-15",
    lastTreatment: "Laser Treatment",
    portalLink: "",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 234-5678",
    lastVisit: "2023-05-10",
    lastTreatment: "Microdermabrasion",
    portalLink: "",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1 (555) 345-6789",
    lastVisit: "2023-05-20",
    lastTreatment: "Laser Treatment",
    portalLink: "",
  },
  {
    id: 4,
    name: "Bob Williams",
    email: "bob@example.com",
    phone: "+1 (555) 456-7890",
    lastVisit: "2023-06-01",
    lastTreatment: "Botox Injection",
    portalLink: "",
  },
  {
    id: 5,
    name: "Emma Brown",
    email: "emma@example.com",
    phone: "+1 (555) 567-8901",
    lastVisit: "2023-05-25",
    lastTreatment: "Dermal Fillers",
    portalLink: "",
  },
]

export default function PatientList() {
  const [patients, setPatients] = useState(initialPatients)
  const [filteredPatients, setFilteredPatients] = useState(initialPatients)
  const [patientLinks, setPatientLinks] = useState<Record<number, string>>({})
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null)
  const [newPatient, setNewPatient] = useState({ name: "", email: "", phone: "" })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase()
    const filtered = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(lowercasedQuery) ||
        patient.email.toLowerCase().includes(lowercasedQuery) ||
        patient.phone.includes(lowercasedQuery),
    )
    setFilteredPatients(filtered)
  }, [searchQuery, patients])

  const generateLink = (patientId: number) => {
    const link = `https://venus.app/patient/${patientId}`
    setPatientLinks((prev) => ({ ...prev, [patientId]: link }))
  }

  const sendLink = (patient: (typeof patients)[0], method: "email" | "sms") => {
    // In a real app, this would make an API call to send the link
    console.log(`Sending link to ${patient.name} via ${method}:`, patientLinks[patient.id])
    toast({
      title: "Link Sent",
      description: `Portal link has been sent to ${patient.name} via ${method}.`,
    })
  }

  const handleAddPatient = () => {
    if (newPatient.name && newPatient.email && newPatient.phone) {
      const newId = Math.max(...patients.map((p) => p.id)) + 1
      setPatients([...patients, { ...newPatient, id: newId, lastVisit: "N/A", lastTreatment: "N/A", portalLink: "" }])
      setNewPatient({ name: "", email: "", phone: "" })
      setIsAddDialogOpen(false)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Patients</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleAddPatient}>Add Patient</Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Last Visit</TableHead>
            <TableHead>Portal Link</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPatients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>
                {patient.lastVisit} - {patient.lastTreatment}
              </TableCell>
              <TableCell>
                {patientLinks[patient.id] ? (
                  <div className="flex items-center gap-2">
                    <Input value={patientLinks[patient.id]} readOnly className="w-48" />
                    <Button variant="outline" size="sm" onClick={() => sendLink(patient, "email")}>
                      <Send className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => sendLink(patient, "sms")}>
                      <Send className="h-4 w-4 mr-2" />
                      SMS
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" onClick={() => generateLink(patient.id)}>
                    Generate Link
                  </Button>
                )}
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setSelectedPatient(patient.id)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View History
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Treatment History - {patient.name}</DialogTitle>
                    </DialogHeader>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Treatment</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {treatmentHistory[patient.id as keyof typeof treatmentHistory]?.map((treatment, index) => (
                          <TableRow key={index}>
                            <TableCell>{treatment.date}</TableCell>
                            <TableCell>{treatment.treatment}</TableCell>
                          </TableRow>
                        )) || (
                          <TableRow>
                            <TableCell colSpan={2}>No treatment history available</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

