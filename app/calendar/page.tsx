"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Plus, CalendarIcon, Clock, MapPin } from "lucide-react"
import { AddEventDialog } from "@/components/add-event-dialog"

const events = [
  {
    id: 1,
    title: "Kitchen Demo Start",
    project: "Johnson Kitchen Remodel",
    date: "2024-02-05",
    time: "08:00 AM",
    type: "milestone",
    location: "123 Oak Street",
    status: "scheduled",
  },
  {
    id: 2,
    title: "Material Delivery",
    project: "Office Renovation",
    date: "2024-02-06",
    time: "10:00 AM",
    type: "delivery",
    location: "456 Business Ave",
    status: "confirmed",
  },
  {
    id: 3,
    title: "Client Meeting",
    project: "Warehouse Expansion",
    date: "2024-02-07",
    time: "02:00 PM",
    type: "meeting",
    location: "LogiCorp Office",
    status: "scheduled",
  },
  {
    id: 4,
    title: "Electrical Inspection",
    project: "Johnson Kitchen Remodel",
    date: "2024-02-08",
    time: "11:00 AM",
    type: "inspection",
    location: "123 Oak Street",
    status: "pending",
  },
  {
    id: 5,
    title: "Final Walkthrough",
    project: "Bathroom Addition",
    date: "2024-02-09",
    time: "03:00 PM",
    type: "milestone",
    location: "789 Maple Drive",
    status: "scheduled",
  },
]

const upcomingEvents = events.slice(0, 5)

export default function CalendarPage() {
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "milestone":
        return "bg-blue-500"
      case "delivery":
        return "bg-green-500"
      case "meeting":
        return "bg-purple-500"
      case "inspection":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "scheduled":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      case "cancelled":
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
                <BreadcrumbPage>Calendar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground">Schedule and track project events</p>
          </div>
          <Button onClick={() => setShowAddEvent(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Calendar */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Project Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Next 5 scheduled events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="space-y-2 p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{event.title}</h4>
                    <Badge className={getEventTypeColor(event.type)} variant="secondary">
                      {event.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.project}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {event.time}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {event.location}
                  </div>
                  <Badge className={getStatusColor(event.status)} variant="outline">
                    {event.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Today's Events */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Events scheduled for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events
                .filter((event) => event.date === "2024-02-05")
                .map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.project}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </div>
                      <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                      <Badge className={getStatusColor(event.status)} variant="outline">
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              {events.filter((event) => event.date === "2024-02-05").length === 0 && (
                <p className="text-muted-foreground text-center py-4">No events scheduled for today</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <AddEventDialog open={showAddEvent} onOpenChange={setShowAddEvent} />
    </SidebarInset>
  )
}
