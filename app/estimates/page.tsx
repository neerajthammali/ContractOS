"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, FileText, Edit, Trash2, Send, Eye } from "lucide-react"
import { AddEstimateDialog } from "@/components/add-estimate-dialog"

const estimates = [
  {
    id: 1,
    number: "EST-001",
    client: "Johnson Family",
    project: "Kitchen Remodel",
    amount: 45000,
    status: "Accepted",
    date: "2024-01-10",
    validUntil: "2024-02-10",
    items: 12,
  },
  {
    id: 2,
    number: "EST-002",
    client: "TechCorp Inc.",
    project: "Office Renovation",
    amount: 125000,
    status: "Pending",
    date: "2024-01-15",
    validUntil: "2024-02-15",
    items: 18,
  },
  {
    id: 3,
    number: "EST-003",
    client: "Smith Residence",
    project: "Bathroom Addition",
    amount: 28000,
    status: "Rejected",
    date: "2024-01-08",
    validUntil: "2024-02-08",
    items: 8,
  },
  {
    id: 4,
    number: "EST-004",
    client: "Williams Home",
    project: "Deck Construction",
    amount: 15000,
    status: "Accepted",
    date: "2024-01-05",
    validUntil: "2024-02-05",
    items: 6,
  },
  {
    id: 5,
    number: "EST-005",
    client: "LogiCorp",
    project: "Warehouse Expansion",
    amount: 200000,
    status: "Draft",
    date: "2024-01-20",
    validUntil: "2024-02-20",
    items: 25,
  },
]

export default function EstimatesPage() {
  const [showAddEstimate, setShowAddEstimate] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEstimates = estimates.filter(
    (estimate) =>
      estimate.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.number.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-green-500"
      case "Pending":
        return "bg-yellow-500"
      case "Rejected":
        return "bg-red-500"
      case "Draft":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const totalEstimates = estimates.length
  const acceptedEstimates = estimates.filter((e) => e.status === "Accepted").length
  const pendingEstimates = estimates.filter((e) => e.status === "Pending").length
  const totalValue = estimates.reduce((sum, estimate) => sum + estimate.amount, 0)

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Estimates</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Estimates</h1>
            <p className="text-muted-foreground">Create and manage project estimates</p>
          </div>
          <Button onClick={() => setShowAddEstimate(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Estimate
          </Button>
        </div>

        {/* Estimate Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Estimates</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEstimates}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accepted</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{acceptedEstimates}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingEstimates}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search estimates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        {/* Estimates Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estimate #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEstimates.map((estimate) => (
                <TableRow key={estimate.id}>
                  <TableCell className="font-medium">{estimate.number}</TableCell>
                  <TableCell>{estimate.client}</TableCell>
                  <TableCell>{estimate.project}</TableCell>
                  <TableCell className="font-medium">${estimate.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(estimate.status)}>{estimate.status}</Badge>
                  </TableCell>
                  <TableCell>{estimate.date}</TableCell>
                  <TableCell>{estimate.validUntil}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      <AddEstimateDialog open={showAddEstimate} onOpenChange={setShowAddEstimate} />
    </SidebarInset>
  )
}
