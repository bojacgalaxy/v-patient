"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Edit, Trash2 } from "lucide-react"

const initialWorkflows = [
  { id: 1, name: "Post-Treatment Follow-up", trigger: "After Treatment", status: "Active" },
  { id: 2, name: "Appointment Reminder", trigger: "24h Before Appointment", status: "Active" },
  { id: 3, name: "Birthday Greeting", trigger: "On Birthday", status: "Inactive" },
]

export default function MessagingAutomationPage() {
  const [workflows, setWorkflows] = useState(initialWorkflows)
  const [newWorkflow, setNewWorkflow] = useState({ name: "", trigger: "", message: "" })

  const handleAddWorkflow = () => {
    if (newWorkflow.name && newWorkflow.trigger && newWorkflow.message) {
      setWorkflows([...workflows, { ...newWorkflow, id: Date.now(), status: "Active" }])
      setNewWorkflow({ name: "", trigger: "", message: "" })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Messaging Automation Workflows</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Workflow</CardTitle>
          <CardDescription>Set up a new automated messaging workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Workflow Name</Label>
                <Input
                  id="name"
                  value={newWorkflow.name}
                  onChange={(e) => setNewWorkflow({ ...newWorkflow, name: e.target.value })}
                  placeholder="e.g., Post-Treatment Follow-up"
                />
              </div>
              <div>
                <Label htmlFor="trigger">Trigger</Label>
                <Select onValueChange={(value) => setNewWorkflow({ ...newWorkflow, trigger: value })}>
                  <SelectTrigger id="trigger">
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="after_treatment">After Treatment</SelectItem>
                    <SelectItem value="before_appointment">Before Appointment</SelectItem>
                    <SelectItem value="on_birthday">On Birthday</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="message">Message Template</Label>
              <Textarea
                id="message"
                value={newWorkflow.message}
                onChange={(e) => setNewWorkflow({ ...newWorkflow, message: e.target.value })}
                placeholder="Enter your message template here. Use {placeholders} for dynamic content."
                rows={4}
              />
            </div>
            <Button onClick={handleAddWorkflow}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Workflow
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Workflows</CardTitle>
          <CardDescription>Manage and edit your automated messaging workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Trigger</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workflows.map((workflow) => (
                <TableRow key={workflow.id}>
                  <TableCell>{workflow.name}</TableCell>
                  <TableCell>{workflow.trigger}</TableCell>
                  <TableCell>{workflow.status}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
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

