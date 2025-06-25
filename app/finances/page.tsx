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
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, AlertTriangle, PieChart } from "lucide-react"

const projectFinances = [
  {
    id: 1,
    name: "Kitchen Remodel",
    budget: 45000,
    spent: 32000,
    remaining: 13000,
    profit: 8500,
    margin: 18.9,
    status: "On Track",
  },
  {
    id: 2,
    name: "Office Renovation",
    budget: 125000,
    spent: 89000,
    remaining: 36000,
    profit: 22000,
    margin: 17.6,
    status: "On Track",
  },
  {
    id: 3,
    name: "Bathroom Addition",
    budget: 28000,
    spent: 28500,
    remaining: -500,
    profit: -500,
    margin: -1.8,
    status: "Over Budget",
  },
]

const expenseCategories = [
  { category: "Materials", amount: 89500, percentage: 45 },
  { category: "Labor", amount: 67000, percentage: 34 },
  { category: "Equipment", amount: 25000, percentage: 13 },
  { category: "Permits", amount: 8500, percentage: 4 },
  { category: "Other", amount: 8000, percentage: 4 },
]

export default function Finances() {
  const totalBudget = projectFinances.reduce((sum, project) => sum + project.budget, 0)
  const totalSpent = projectFinances.reduce((sum, project) => sum + project.spent, 0)
  const totalProfit = projectFinances.reduce((sum, project) => sum + project.profit, 0)
  const totalRemaining = projectFinances.reduce((sum, project) => sum + project.remaining, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "bg-green-500"
      case "Over Budget":
        return "bg-red-500"
      case "At Risk":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
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
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Finances</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Overview</h1>
          <p className="text-muted-foreground">Track budgets, expenses, and profitability across all projects</p>
        </div>

        {/* Financial Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across all projects</p>
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
              <PieChart className="h-4 w-4 text-muted-foreground" />
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
              <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalRemaining >= 0 ? "text-green-600" : "text-red-600"}`}>
                ${totalRemaining.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Available to spend</p>
            </CardContent>
          </Card>
        </div>

        {/* Project Financial Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Project Financial Breakdown</CardTitle>
            <CardDescription>Budget vs actual spending for each project</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Spent</TableHead>
                  <TableHead>Remaining</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Profit</TableHead>
                  <TableHead>Margin</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectFinances.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>${project.budget.toLocaleString()}</TableCell>
                    <TableCell>${project.spent.toLocaleString()}</TableCell>
                    <TableCell className={project.remaining >= 0 ? "text-green-600" : "text-red-600"}>
                      ${project.remaining.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={(project.spent / project.budget) * 100} className="w-16" />
                        <span className="text-sm">{((project.spent / project.budget) * 100).toFixed(0)}%</span>
                      </div>
                    </TableCell>
                    <TableCell className={project.profit >= 0 ? "text-green-600" : "text-red-600"}>
                      ${project.profit.toLocaleString()}
                    </TableCell>
                    <TableCell className={project.margin >= 0 ? "text-green-600" : "text-red-600"}>
                      {project.margin}%
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

        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
            <CardDescription>Breakdown of spending by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenseCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-24 text-sm font-medium">{category.category}</div>
                    <Progress value={category.percentage} className="flex-1" />
                    <div className="text-sm text-muted-foreground">{category.percentage}%</div>
                  </div>
                  <div className="text-sm font-medium ml-4">${category.amount.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
