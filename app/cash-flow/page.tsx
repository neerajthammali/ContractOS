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
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react"

const cashFlowData = [
  { month: "January 2024", income: 45000, expenses: 32000, netFlow: 13000 },
  { month: "February 2024", income: 38000, expenses: 28000, netFlow: 10000 },
  { month: "March 2024", income: 52000, expenses: 35000, netFlow: 17000 },
  { month: "April 2024", income: 41000, expenses: 30000, netFlow: 11000 },
]

const upcomingPayments = [
  { project: "Kitchen Remodel", client: "Johnson Family", amount: 13500, dueDate: "2024-02-05", status: "Expected" },
  { project: "Office Renovation", client: "TechCorp Inc.", amount: 25000, dueDate: "2024-02-10", status: "Overdue" },
  { project: "Bathroom Addition", client: "Smith Residence", amount: 8500, dueDate: "2024-02-15", status: "Expected" },
]

const upcomingExpenses = [
  { description: "Material Delivery", vendor: "Lumber Yard", amount: 5500, dueDate: "2024-02-03" },
  { description: "Equipment Rental", vendor: "Tool Depot", amount: 1200, dueDate: "2024-02-07" },
  { description: "Subcontractor Payment", vendor: "Electric Pro", amount: 3800, dueDate: "2024-02-12" },
]

export default function CashFlow() {
  const totalIncome = cashFlowData.reduce((sum, item) => sum + item.income, 0)
  const totalExpenses = cashFlowData.reduce((sum, item) => sum + item.expenses, 0)
  const totalNetFlow = totalIncome - totalExpenses

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Expected":
        return "bg-blue-500"
      case "Overdue":
        return "bg-red-500"
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
                <BreadcrumbPage>Cash Flow</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cash Flow Management</h1>
          <p className="text-muted-foreground">Track your income, expenses, and cash flow projections</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Last 4 months</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Last 4 months</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Cash Flow</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalNetFlow.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Positive flow</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Monthly</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(totalNetFlow / 4).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Net cash flow</p>
            </CardContent>
          </Card>
        </div>

        {/* Cash Flow History */}
        <Card>
          <CardHeader>
            <CardTitle>Cash Flow History</CardTitle>
            <CardDescription>Monthly income and expenses breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Income</TableHead>
                  <TableHead>Expenses</TableHead>
                  <TableHead>Net Flow</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cashFlowData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.month}</TableCell>
                    <TableCell className="text-green-600">${item.income.toLocaleString()}</TableCell>
                    <TableCell className="text-red-600">${item.expenses.toLocaleString()}</TableCell>
                    <TableCell className={item.netFlow >= 0 ? "text-green-600" : "text-red-600"}>
                      ${item.netFlow.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Upcoming Payments */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
              <CardDescription>Expected payments from clients</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingPayments.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{payment.project}</p>
                          <p className="text-sm text-muted-foreground">{payment.client}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">${payment.amount.toLocaleString()}</TableCell>
                      <TableCell>{payment.dueDate}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Upcoming Expenses */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Expenses</CardTitle>
              <CardDescription>Scheduled payments and expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingExpenses.map((expense, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{expense.description}</TableCell>
                      <TableCell>{expense.vendor}</TableCell>
                      <TableCell className="text-red-600">${expense.amount.toLocaleString()}</TableCell>
                      <TableCell>{expense.dueDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  )
}
