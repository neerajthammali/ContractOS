"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Plus, Edit, Trash2, DollarSign, Calendar, FileText } from "lucide-react"
import { AddExpenseDialog } from "@/components/add-expense-dialog"
import { AddTaskDialog } from "@/components/add-task-dialog"
import { AddMilestoneDialog } from "@/components/add-milestone-dialog"
import { AddInvoiceDialog } from "@/components/add-invoice-dialog"

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/src_lib_supabaseClient'

// ...inside your component:
const router = useRouter();

const handleEdit = (project) => {
  // Open a dialog/modal pre-filled with project data
  // On submit, call Supabase update (see below)
};

const handleDelete = async (projectId: string) => {
  if (!confirm('Are you sure you want to delete this project?')) return;
  const { error } = await supabase.from('projects').delete().eq('id', projectId);
  if (!error) {
    // Optionally navigate away or refresh project list
    router.push('/projects');
  } else {
    alert('Failed to delete project');
  }
};

const handleShare = (projectId: string) => {
  const url = `${window.location.origin}/projects/${projectId}`;
  navigator.clipboard.writeText(url);
  alert('Project link copied!');
};

// Mock data for the project
const project = {
  id: 1,
  name: "Residential Kitchen Remodel",
  client: "Johnson Family",
  budget: 45000,
  spent: 32000,
  progress: 75,
  status: "In Progress",
  startDate: "2024-01-15",
  endDate: "2024-02-15",
  description: "Complete kitchen renovation including new cabinets, countertops, appliances, and flooring.",
  profit: 8500,
  margin: 18.9,
}

const expenses = [
  {
    id: 1,
    date: "2024-01-20",
    category: "Materials",
    description: "Kitchen Cabinets",
    amount: 12000,
    vendor: "Cabinet Pro",
  },
  {
    id: 2,
    date: "2024-01-22",
    category: "Labor",
    description: "Installation Team",
    amount: 3500,
    vendor: "Smith Construction",
  },
  {
    id: 3,
    date: "2024-01-25",
    category: "Materials",
    description: "Granite Countertops",
    amount: 4500,
    vendor: "Stone Works",
  },
  { id: 4, date: "2024-01-28", category: "Equipment", description: "Tool Rental", amount: 800, vendor: "Tool Depot" },
]

const tasks = [
  { id: 1, name: "Demolition", assignee: "Mike Johnson", status: "Completed", dueDate: "2024-01-18", progress: 100 },
  { id: 2, name: "Electrical Work", assignee: "Tom Wilson", status: "Completed", dueDate: "2024-01-22", progress: 100 },
  { id: 3, name: "Plumbing", assignee: "Sarah Davis", status: "In Progress", dueDate: "2024-01-30", progress: 80 },
  {
    id: 4,
    name: "Cabinet Installation",
    assignee: "Mike Johnson",
    status: "In Progress",
    dueDate: "2024-02-05",
    progress: 60,
  },
  {
    id: 5,
    name: "Countertop Installation",
    assignee: "Stone Works",
    status: "Pending",
    dueDate: "2024-02-08",
    progress: 0,
  },
]

const milestones = [
  { id: 1, name: "Demolition Complete", date: "2024-01-18", status: "Completed", payment: 4500 },
  { id: 2, name: "Rough-in Complete", date: "2024-01-25", status: "Completed", payment: 9000 },
  { id: 3, name: "Cabinets Installed", date: "2024-02-05", status: "In Progress", payment: 13500 },
  { id: 4, name: "Final Completion", date: "2024-02-15", status: "Pending", payment: 18000 },
]

const invoices = [
  { id: 1, number: "INV-001", date: "2024-01-20", amount: 4500, status: "Paid", dueDate: "2024-02-20" },
  { id: 2, number: "INV-002", date: "2024-01-27", amount: 9000, status: "Paid", dueDate: "2024-02-27" },
  { id: 3, number: "INV-003", date: "2024-02-05", amount: 13500, status: "Sent", dueDate: "2024-03-05" },
]

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [showAddTask, setShowAddTask] = useState(false)
  const [showAddMilestone, setShowAddMilestone] = useState(false)
  const [showAddInvoice, setShowAddInvoice] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500"
      case "In Progress":
        return "bg-blue-500"
      case "Pending":
        return "bg-yellow-500"
      case "Paid":
        return "bg-green-500"
      case "Sent":
        return "bg-blue-500"
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
                <BreadcrumbPage>Project Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Project Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
              <p className="text-muted-foreground">Client: {project.client}</p>
            </div>
            <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Budget</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${project.budget.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Spent</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${project.spent.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {((project.spent / project.budget) * 100).toFixed(1)}% of budget
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profit</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">${project.profit.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">{project.margin}% margin</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Progress</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{project.progress}%</div>
                <Progress value={project.progress} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="finances">Finances</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{project.description}</p>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Start Date</p>
                    <p className="font-semibold">{project.startDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">End Date</p>
                    <p className="font-semibold">{project.endDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finances" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Expenses</h3>
              <Button onClick={() => setShowAddExpense(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>{expense.vendor}</TableCell>
                      <TableCell>${expense.amount.toLocaleString()}</TableCell>
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
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Tasks</h3>
              <Button onClick={() => setShowAddTask(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.name}</TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                      </TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={task.progress} className="w-16" />
                          <span className="text-sm">{task.progress}%</span>
                        </div>
                      </TableCell>
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
          </TabsContent>

          <TabsContent value="milestones" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Milestones</h3>
              <Button onClick={() => setShowAddMilestone(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Milestone
              </Button>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Milestone</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {milestones.map((milestone) => (
                    <TableRow key={milestone.id}>
                      <TableCell className="font-medium">{milestone.name}</TableCell>
                      <TableCell>{milestone.date}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(milestone.status)}>{milestone.status}</Badge>
                      </TableCell>
                      <TableCell>${milestone.payment.toLocaleString()}</TableCell>
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
          </TabsContent>

          <TabsContent value="invoices" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Invoices</h3>
              <Button onClick={() => setShowAddInvoice(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Invoice
              </Button>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.number}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                      </TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

<Button variant="ghost" size="sm" onClick={() => handleEdit(project)}>
  <Edit className="h-4 w-4" />
</Button>
<Button variant="ghost" size="sm" onClick={() => handleDelete(project.id)}>
  <Trash2 className="h-4 w-4" />
</Button>
<Button variant="ghost" size="sm" onClick={() => handleShare(project.id)}>
  <Share2 className="h-4 w-4" />
</Button>
      
      {/* Dialog Components */}
      <AddExpenseDialog open={showAddExpense} onOpenChange={setShowAddExpense} />
      <AddTaskDialog open={showAddTask} onOpenChange={setShowAddTask} />
      <AddMilestoneDialog open={showAddMilestone} onOpenChange={setShowAddMilestone} />
      <AddInvoiceDialog open={showAddInvoice} onOpenChange={setShowAddInvoice} />
    </SidebarInset>
  )
}
