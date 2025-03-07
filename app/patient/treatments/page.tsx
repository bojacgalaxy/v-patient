import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const treatments = [
  { id: 1, name: "Laser Therapy", date: "2023-05-15", provider: "Dr. Smith" },
  { id: 2, name: "Chemical Peel", date: "2023-04-10", provider: "Dr. Johnson" },
  { id: 3, name: "Microdermabrasion", date: "2023-03-20", provider: "Dr. Williams" },
]

export default function TreatmentHistory() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Treatment History</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Treatment</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Provider</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {treatments.map((treatment) => (
            <TableRow key={treatment.id}>
              <TableCell>{treatment.name}</TableCell>
              <TableCell>{treatment.date}</TableCell>
              <TableCell>{treatment.provider}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

