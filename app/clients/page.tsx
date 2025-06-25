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
import { Plus, Search, Phone, Mail, MapPin, Edit, Trash2, User } from "lucide-react"
import { AddClientDialog } from "@/components/add-client-dialog"

const clients = [
  {
    id: 1,
    name: "Johnson Family",
    email: "johnson@email.com",
    phone: "(555) 123-4567",
    address: "123 Oak Street, Springfield, IL 62701",
    projects: 2,
    totalValue: 73000,
    status: "Active",
    lastContact: "2024-01-25",
  },
  {
    id: 2,
    name: "TechCorp Inc.",
    email: "contact@techcorp.com",
    phone: "(555) 987-6543",
    address: "456 Business Ave, Chicago, IL 60601",
    projects: 1,
    totalValue: 125000,
    status: "Active",
    lastContact: "2024-01-28",
  },
  {
    id: 3,
    name: "Smith Residence",
    email: "smith.family@email.com",
    phone: "(555) 456-7890",
    address: "789 Maple Drive, Peoria, IL 61602",
    projects: 1,
    totalValue: 28000,
    status: "Completed",
    lastContact: "2024-01-20",
  },
  {
    id: 4,
    name: "Williams Home",
    email: "williams@email.com",
    phone: "(555) 234-5678",
    address: "321 Pine Street, Rockford, IL 61101",
    projects: 1,
    totalValue: 15000,
    status: "Completed",
    lastContact: "2024-01-15",
  },
  {
    id: 5,
    name: "LogiCorp",
    email: "projects@logicorp.com",
    phone: "(555) 345-6789",
    address: "654 Industrial Blvd, Aurora, IL 60502",
    projects: 1,
    totalValue: 200000,
    status: "Active",
    lastContact: "2024-01-30",
  },
]

export default function ClientsPage() {
  const [showAddClient, setShowAddClient] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500"
      case "Completed":
        return "bg-blue-500"
      case "Inactive":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const totalClients = clients.length
  const activeClients = clients.filter((c) => c.status === "Active").length
  const totalValue = clients.reduce((sum, client) => sum + client.totalValue, 0)

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
                <BreadcrumbPage>Clients</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
            <p className="text-muted-foreground">Manage your client relationships</p>
          </div>
          <Button onClick={() => setShowAddClient(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </div>

        {/* Client Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClients}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeClients}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
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
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        {/* Clients Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {client.address}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-1" />
                        {client.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-1" />
                        {client.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{client.projects}</TableCell>
                  <TableCell className="font-medium">${client.totalValue.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                  </TableCell>
                  <TableCell>{client.lastContact}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
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

      <AddClientDialog open={showAddClient} onOpenChange={setShowAddClient} />
    </SidebarInset>
  )
}
