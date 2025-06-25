"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb"
import { Plus, DollarSign, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { AddProjectDialog } from "@/components/add-project-dialog"

const projects = [
  {
    id: 1,
    name: "Residential Kitchen Remodel",
    client: "Johnson Family",
    budget: 45000,
    spent: 32000,
    progress: 75,
    status: "In Progress",
    dueDate: "2024-02-15",
    profit: 8500,
    margin: 18.9,
  },
  {
    id: 2,
    name: "Office Building Renovation",
    client: "TechCorp Inc.",
    budget: 125000,
    spent: 89000,
    progress: 60,
    status: "In Progress",
    dueDate: "2024-03-30",
    profit: 22000,
    margin: 17.6,
  },
  {
    id: 3,
    name: "Bathroom Addition",
    client: "Smith Residence",
    budget: 28000,
    spent: 28500,
    progress: 95,
    status: "Over Budget",
    dueDate: "2024-01-20",
    profit: -500,
    margin: -1.8,
  },
  {
    id: 4,
    name: "Deck Construction",
    client: "Williams Home",
    budget: 15000,
    spent: 12000,
    progress: 100,
    status: "Completed",
    dueDate: "2024-01-10",
    profit: 3000,
    margin: 20.0,
  },
]

export default function Dashboard() {
  const [showAddProject, setShowAddProject] = useState(false)

  const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0)
  const totalSpent = projects.reduce((sum, project) => sum + project.spent, 0)
  const totalProfit = projects.reduce((sum, project) => sum + project.profit, 0)
  const activeProjects = projects.filter((p) => p.status === "In Progress").length

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500"
      case "In Progress":
        return "bg-blue-500"
      case "Over Budget":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4" />
      case "Over Budget":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return null
    }
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
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Overview of all your construction projects</p>
          </div>
          <Button onClick={() => setShowAddProject(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across {projects.length} projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {((totalSpent / totalBudget) * 100).toFixed(1)}% of budget
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                ${totalProfit.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">{((totalProfit / totalBudget) * 100).toFixed(1)}% margin</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeProjects}</div>
              <p className="text-xs text-muted-foreground">Currently in progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <Badge className={getStatusColor(project.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(project.status)}
                      {project.status}
                    </div>
                  </Badge>
                </div>
                <CardDescription>{project.client}</CardDescription>
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
                    <p className="text-muted-foreground">Profit</p>
                    <p className={`font-semibold ${project.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                      ${project.profit.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Margin</p>
                    <p className={`font-semibold ${project.margin >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {project.margin}%
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href={`/projects/${project.id}`}>
                    <Button className="w-full" variant="outline">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <AddProjectDialog open={showAddProject} onOpenChange={setShowAddProject} />
    </SidebarInset>
  )
}
