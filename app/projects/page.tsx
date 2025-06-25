"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
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
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { AddProjectDialog } from "@/components/add-project-dialog"

const projects = [
  {
    id: 1,
    name: "Residential Kitchen Remodel",
    client: "Johnson Family",
    type: "Residential",
    budget: 45000,
    spent: 32000,
    progress: 75,
    status: "In Progress",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    profit: 8500,
    margin: 18.9,
  },
  {
    id: 2,
    name: "Office Building Renovation",
    client: "TechCorp Inc.",
    type: "Commercial",
    budget: 125000,
    spent: 89000,
    progress: 60,
    status: "In Progress",
    startDate: "2024-01-10",
    endDate: "2024-03-30",
    profit: 22000,
    margin: 17.6,
  },
  {
    id: 3,
    name: "Bathroom Addition",
    client: "Smith Residence",
    type: "Residential",
    budget: 28000,
    spent: 28500,
    progress: 95,
    status: "Over Budget",
    startDate: "2023-12-01",
    endDate: "2024-01-20",
    profit: -500,
    margin: -1.8,
  },
  {
    id: 4,
    name: "Deck Construction",
    client: "Williams Home",
    type: "Residential",
    budget: 15000,
    spent: 12000,
    progress: 100,
    status: "Completed",
    startDate: "2023-12-15",
    endDate: "2024-01-10",
    profit: 3000,
    margin: 20.0,
  },
  {
    id: 5,
    name: "Warehouse Expansion",
    client: "LogiCorp",
    type: "Commercial",
    budget: 200000,
    spent: 45000,
    progress: 25,
    status: "In Progress",
    startDate: "2024-01-20",
    endDate: "2024-06-15",
    profit: 35000,
    margin: 17.5,
  },
]

export default function ProjectsPage() {
  const [showAddProject, setShowAddProject] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesType = typeFilter === "all" || project.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500"
      case "In Progress":
        return "bg-blue-500"
      case "Over Budget":
        return "bg-red-500"
      case "On Hold":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleDeleteProject = (projectId: number) => {
    // In a real app, this would make an API call
    console.log("Deleting project:", projectId)
  }

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
                <BreadcrumbPage>Projects</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground">Manage all your construction projects</p>
          </div>
          <Button onClick={() => setShowAddProject(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Over Budget">Over Budget</SelectItem>
              <SelectItem value="On Hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Residential">Residential</SelectItem>
              <SelectItem value="Commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription>{project.client}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Budget</p>
                    <p className="font-semibold">${project.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Spent</p>
                    <p className="font-semibold">${project.spent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-semibold">{project.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Margin</p>
                    <p className={`font-semibold ${project.margin >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {project.margin}%
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Link href={`/projects/${project.id}`} className="flex-1">
                    <Button className="w-full" variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteProject(project.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found matching your criteria.</p>
          </div>
        )}
      </div>

      <AddProjectDialog open={showAddProject} onOpenChange={setShowAddProject} />
    </SidebarInset>
  )
}
