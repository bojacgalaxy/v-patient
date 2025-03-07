"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash } from "lucide-react"

// Mock data
const initialTreatmentTypes = [
  {
    id: 1,
    name: "Laser Treatment",
    description: "Advanced laser therapy for skin rejuvenation",
    price: 300,
    preInstructions: "Avoid sun exposure for 2 weeks prior to treatment",
    postInstructions: "Apply provided ointment twice daily for 5 days",
    duration: 60,
  },
  {
    id: 2,
    name: "Chemical Peel",
    description: "Exfoliating treatment to improve skin texture",
    price: 150,
    preInstructions: "Stop using retinoids 1 week before treatment",
    postInstructions: "Use gentle cleanser and moisturizer for 3 days",
    duration: 45,
  },
]

export default function TreatmentTypesPage() {
  const [treatmentTypes, setTreatmentTypes] = useState(initialTreatmentTypes)
  const [newTreatmentType, setNewTreatmentType] = useState({
    name: "",
    description: "",
    price: 0,
    preInstructions: "",
    postInstructions: "",
    duration: 0,
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const handleAddTreatmentType = () => {
    if (newTreatmentType.name) {
      setTreatmentTypes([...treatmentTypes, { id: treatmentTypes.length + 1, ...newTreatmentType }])
      setNewTreatmentType({
        name: "",
        description: "",
        price: 0,
        preInstructions: "",
        postInstructions: "",
        duration: 0,
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteTreatmentType = (id: number) => {
    setTreatmentTypes(treatmentTypes.filter((t) => t.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Treatment Types</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Treatment Type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Treatment Type</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newTreatmentType.name}
                  onChange={(e) => setNewTreatmentType({ ...newTreatmentType, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newTreatmentType.description}
                  onChange={(e) => setNewTreatmentType({ ...newTreatmentType, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={newTreatmentType.price}
                  onChange={(e) => setNewTreatmentType({ ...newTreatmentType, price: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="preInstructions" className="text-right">
                  Pre-treatment Instructions
                </Label>
                <Textarea
                  id="preInstructions"
                  value={newTreatmentType.preInstructions}
                  onChange={(e) => setNewTreatmentType({ ...newTreatmentType, preInstructions: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="postInstructions" className="text-right">
                  Post-treatment Instructions
                </Label>
                <Textarea
                  id="postInstructions"
                  value={newTreatmentType.postInstructions}
                  onChange={(e) => setNewTreatmentType({ ...newTreatmentType, postInstructions: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duration (minutes)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  value={newTreatmentType.duration}
                  onChange={(e) => setNewTreatmentType({ ...newTreatmentType, duration: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleAddTreatmentType}>Add Treatment Type</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Treatment Types</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {treatmentTypes.map((type) => (
                <TableRow key={type.id}>
                  <TableCell>{type.name}</TableCell>
                  <TableCell>{type.description}</TableCell>
                  <TableCell>${type.price}</TableCell>
                  <TableCell>{type.duration} minutes</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteTreatmentType(type.id)}>
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

