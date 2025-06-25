"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, PieChart, TrendingUp, Download, Calendar, DollarSign } from "lucide-react"

const projectPerformance = [
  {
    project: "Kitchen Remodel",
    budgetVariance: 5.2,
    scheduleVariance: -2.1,
    profitMargin: 18.9,
    clientSatisfaction: 95,
    status: "On Track",
  },
  {
    project: "Office Renovation",
    budgetVariance: -3.8,
    scheduleVariance: 1.5,
    profitMargin: 17.6,
    clientSatisfaction: 88,
    status: "On Track",
  },
  {
    project: "Bathroom Addition",
    budgetVariance: -15.2,
    scheduleVariance: -8.3,
    profitMargin: -1.8,
    clientSatisfaction: 72,
    status: "At Risk",
  },
  {
    project: "Deck Construction",
    budgetVariance: 12.8,
    scheduleVariance: 3.2,
    profitMargin: 20.0,
    clientSatisfaction: 98,
    status: "Completed",
  },
]

const monthlyFinancials = [
  { month: "Jan 2024", revenue: 45000, expenses: 32000, profit: 13000, margin: 28.9 },
  { month: "Feb 2024", revenue: 38000, expenses: 28000, profit: 10000, margin: 26.3 },
  { month: "Mar 2024", revenue: 52000, expenses: 35000, profit: 17000, margin: 32.7 },
  { month: "Apr 2024", revenue: 41000, expenses: 30000, profit: 11000, margin: 26.8 },
]

export default function ReportsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500"
      case "On Track":
        return "bg-blue-500"
      case "At Risk":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return "text-green-600"
    if (variance < -5) return "text-red-600"
    return "text-yellow-600"
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
                <BreadcrumbPage>Reports</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
            <p className="text-muted-foreground">Comprehensive business insights and performance metrics</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="monthly">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$176,000</div>
              <p className="text-xs text-muted-foreground">+12.5% from last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Profit Margin</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28.7%</div>
              <p className="text-xs text-muted-foreground">+2.1% from last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projects Completed</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+3 from last period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Client Satisfaction</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">88.3%</div>
              <p className="text-xs text-muted-foreground">+5.2% from last period</p>
            </CardContent>
          </Card>
        </div>

        {/* Project Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Project Performance Analysis</CardTitle>
            <CardDescription>Budget variance, schedule performance, and profitability by project</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Budget Variance</TableHead>
                  <TableHead>Schedule Variance</TableHead>
                  <TableHead>Profit Margin</TableHead>
                  <TableHead>Client Satisfaction</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectPerformance.map((project, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{project.project}</TableCell>
                    <TableCell className={getVarianceColor(project.budgetVariance)}>
                      {project.budgetVariance > 0 ? "+" : ""}
                      {project.budgetVariance}%
                    </TableCell>
                    <TableCell className={getVarianceColor(project.scheduleVariance)}>
                      {project.scheduleVariance > 0 ? "+" : ""}
                      {project.scheduleVariance} days
                    </TableCell>
                    <TableCell className={project.profitMargin >= 0 ? "text-green-600" : "text-red-600"}>
                      {project.profitMargin}%
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={project.clientSatisfaction} className="w-16" />
                        <span className="text-sm">{project.clientSatisfaction}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Financial Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Financial Performance</CardTitle>
            <CardDescription>Revenue, expenses, and profit trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Expenses</TableHead>
                  <TableHead>Profit</TableHead>
                  <TableHead>Margin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyFinancials.map((month, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{month.month}</TableCell>
                    <TableCell className="text-green-600">${month.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-red-600">${month.expenses.toLocaleString()}</TableCell>
                    <TableCell className="font-medium text-green-600">${month.profit.toLocaleString()}</TableCell>
                    <TableCell className="font-medium">{month.margin}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Additional Report Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Schedule Performance
              </CardTitle>
              <CardDescription>Project timeline adherence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>On Time Completion</span>
                <span className="font-bold text-green-600">75%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Average Delay</span>
                <span className="font-bold text-yellow-600">3.2 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Critical Path Issues</span>
                <span className="font-bold text-red-600">2</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Cost Management
              </CardTitle>
              <CardDescription>Budget control metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Under Budget Projects</span>
                <span className="font-bold text-green-600">60%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Average Cost Overrun</span>
                <span className="font-bold text-red-600">8.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Change Order Impact</span>
                <span className="font-bold text-yellow-600">$12,500</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  )
}
