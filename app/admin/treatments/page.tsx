"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash, CheckCircle, Plus, XCircle } from "lucide-react"

// Mock data
const initialTreatments = [
  // Upcoming treatments
  {
    id: 1,
    patient: "Sarah Johnson",
    treatment: "Laser Treatment",
    date: "2025-03-01",
    time: "10:00 AM",
    status: "upcoming",
  },
  {
    id: 2,
    patient: "Michael Chen",
    treatment: "Chemical Peel",
    date: "2025-03-02",
    time: "2:00 PM",
    status: "upcoming",
  },
  {
    id: 3,
    patient: "David Wilson",
    treatment: "Botox Injection",
    date: "2025-03-05",
    time: "3:30 PM",
    status: "upcoming",
  },
  // Completed treatments
  {
    id: 4,
    patient: "Emma Brown",
    treatment: "Microdermabrasion",
    date: "2025-02-15",
    time: "11:00 AM",
    status: "completed",
  },
  {
    id: 5,
    patient: "James Taylor",
    treatment: "Dermal Fillers",
    date: "2025-02-18",
    time: "2:30 PM",
    status: "completed",
  },
  {
    id: 6,
    patient: "Sophia Lee",
    treatment: "Laser Hair Removal",
    date: "2025-02-20",
    time: "4:00 PM",
    status: "completed",
  },
]

const patients = ["Sarah Johnson", "Michael Chen", "David Wilson", "Emma Brown", "James Taylor", "Sophia Lee"]

const treatmentTypes = [
  "Laser Treatment",
  "Chemical Peel",
  "Botox Injection",
  "Dermal Fillers",
  "Microdermabrasion",
  "Laser Hair Removal",
]

export default function TreatmentsPage() {
  const [treatments, setTreatments] = useState(initialTreatments)
  const [newTreatment, setNewTreatment] = useState({
    patient: "",
    treatment: "",
    date: "",
    time: "",
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const handleMarkComplete = (id: number) => {
    setTreatments(
      treatments.map((treatment) => (treatment.id === id ? { ...treatment, status: "completed" } : treatment)),
    )
  }

  const handleMarkIncomplete = (id: number) => {
    setTreatments(
      treatments.map((treatment) => (treatment.id === id ? { ...treatment, status: "upcoming" } : treatment)),
    )
  }

  const handleDelete = (id: number) => {
    setTreatments(treatments.filter((treatment) => treatment.id !== id))
  }

  const handleAddTreatment = () => {
    if (newTreatment.patient && newTreatment.treatment && newTreatment.date && newTreatment.time) {
      setTreatments([
        ...treatments,
        {
          id: Math.max(...treatments.map((t) => t.id)) + 1,
          ...newTreatment,
          status: "upcoming",
        },
      ])
      setNewTreatment({
        patient: "",
        treatment: "",
        date: "",
        time: "",
      })
      setIsAddDialogOpen(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Treatments</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Treatment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Treatment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="patient" className="text-right">
                  Patient
                </Label>
                <Select onValueChange={(value) => setNewTreatment({ ...newTreatment, patient: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient} value={patient}>
                        {patient}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="treatment" className="text-right">
                  Treatment
                </Label>
                <Select onValueChange={(value) => setNewTreatment({ ...newTreatment, treatment: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select treatment" />
                  </SelectTrigger>
                  <SelectContent>
                    {treatmentTypes.map((treatment) => (
                      <SelectItem key={treatment} value={treatment}>
                        {treatment}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newTreatment.date}
                  onChange={(e) => setNewTreatment({ ...newTreatment, date: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={newTreatment.time}
                  onChange={(e) => setNewTreatment({ ...newTreatment, time: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleAddTreatment}>Add Treatment</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Treatments</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming Treatments</TabsTrigger>
              <TabsTrigger value="completed">Completed Treatments</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Treatment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {treatments
                    .filter((treatment) => treatment.status === "upcoming")
                    .map((treatment) => (
                      <TableRow key={treatment.id}>
                        <TableCell>{treatment.patient}</TableCell>
                        <TableCell>{treatment.treatment}</TableCell>
                        <TableCell>{treatment.date}</TableCell>
                        <TableCell>{treatment.time}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Trash className="w-4 h-4 mr-2" />
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Treatment</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this treatment? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(treatment.id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Mark as Complete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Mark as Complete</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to mark this treatment as complete? It will be moved to the
                                    completed treatments list.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleMarkComplete(treatment.id)}>
                                    Confirm
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="completed">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Treatment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {treatments
                    .filter((treatment) => treatment.status === "completed")
                    .map((treatment) => (
                      <TableRow key={treatment.id}>
                        <TableCell>{treatment.patient}</TableCell>
                        <TableCell>{treatment.treatment}</TableCell>
                        <TableCell>{treatment.date}</TableCell>
                        <TableCell>{treatment.time}</TableCell>
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <XCircle className="w-4 h-4 mr-2" />
                                Mark as Incomplete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Mark as Incomplete</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to mark this treatment as incomplete? It will be moved back to
                                  the upcoming treatments list.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleMarkIncomplete(treatment.id)}>
                                  Confirm
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

