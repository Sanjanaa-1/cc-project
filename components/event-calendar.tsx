"use client"

import type React from "react"

import { useState } from "react"
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
  location: string
  description: string
}

export function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showEventForm, setShowEventForm] = useState(false)
  const [eventFormData, setEventFormData] = useState<Partial<Event>>({
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    startTime: "09:00",
    endTime: "10:00",
    location: "",
    description: "",
  })
  const [isEditMode, setIsEditMode] = useState(false)

  // Mock data - in a real app, this would come from an API
  const events: Event[] = [
    {
      id: "1",
      title: "End of Semester Party",
      date: "2023-05-15",
      startTime: "20:00",
      endTime: "23:00",
      location: "Student Center, Main Hall",
      description:
        "Join us for the end of semester celebration! There will be food, music, and games. All students are welcome!",
    },
    {
      id: "2",
      title: "Career Fair",
      date: "2023-05-20",
      startTime: "10:00",
      endTime: "16:00",
      location: "Engineering Building",
      description:
        "Connect with potential employers from various industries. Bring your resume and dress professionally.",
    },
    {
      id: "3",
      title: "Study Group - Finals Prep",
      date: "2023-05-10",
      startTime: "14:00",
      endTime: "17:00",
      location: "Library, Room 204",
      description: "Join our study group to prepare for final exams. We'll be covering key topics from the semester.",
    },
  ]

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Add days from previous and next month to fill the calendar grid
  const startDay = monthStart.getDay() // 0 = Sunday, 1 = Monday, etc.
  const endDay = monthEnd.getDay()

  const prevMonthDays =
    startDay > 0 ? Array.from({ length: startDay }, (_, i) => addDays(monthStart, -(i + 1))).reverse() : []

  const nextMonthDays = endDay < 6 ? Array.from({ length: 6 - endDay }, (_, i) => addDays(monthEnd, i + 1)) : []

  const allDays = [...prevMonthDays, ...daysInMonth, ...nextMonthDays]

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(parseISO(event.date), day))
  }

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
  }

  const handleCloseEventDetail = () => {
    setSelectedEvent(null)
  }

  const handleAddEvent = () => {
    setIsEditMode(false)
    setEventFormData({
      title: "",
      date: format(new Date(), "yyyy-MM-dd"),
      startTime: "09:00",
      endTime: "10:00",
      location: "",
      description: "",
    })
    setShowEventForm(true)
  }

  const handleEditEvent = () => {
    if (selectedEvent) {
      setIsEditMode(true)
      setEventFormData({
        ...selectedEvent,
      })
      setShowEventForm(true)
      setSelectedEvent(null)
    }
  }

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      // In a real app, this would send a delete request to an API
      alert(`Event "${selectedEvent.title}" would be deleted`)
      setSelectedEvent(null)
    }
  }

  const handleEventFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEventFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleEventFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!eventFormData.title?.trim()) {
      alert("Please enter a title")
      return
    }

    // In a real app, this would send the event to an API
    alert(`Event "${eventFormData.title}" would be ${isEditMode ? "updated" : "created"}`)
    setShowEventForm(false)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>{format(currentDate, "MMMM yyyy")}</CardTitle>
            <CardDescription>Campus events and activities</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            >
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            >
              Next
            </Button>
            <Button size="sm" onClick={handleAddEvent}>
              Add Event
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-medium py-2">
                {day}
              </div>
            ))}

            {allDays.map((day, index) => {
              const dayEvents = getEventsForDay(day)
              const isCurrentMonth = isSameMonth(day, currentDate)
              const isToday = isSameDay(day, new Date())

              return (
                <div
                  key={index}
                  className={cn(
                    "min-h-[100px] p-1 border rounded-md",
                    !isCurrentMonth && "bg-muted/50 text-muted-foreground",
                    isToday && "border-blue-500",
                  )}
                >
                  <div className="text-right p-1 font-medium text-sm">{format(day, "d")}</div>
                  <div className="space-y-1">
                    {dayEvents.map((event) => (
                      <Button
                        key={event.id}
                        variant="ghost"
                        className="w-full justify-start p-1 h-auto text-xs bg-blue-500/10 hover:bg-blue-500/20 text-left"
                        onClick={() => handleEventClick(event)}
                      >
                        <div className="truncate">
                          <span className="font-medium">{event.startTime}</span> {event.title}
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Event Detail Dialog */}
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={handleCloseEventDetail}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
              <DialogDescription>{format(parseISO(selectedEvent.date), "EEEE, MMMM d, yyyy")}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Time</Label>
                <div className="col-span-3">
                  {selectedEvent.startTime} - {selectedEvent.endTime}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Location</Label>
                <div className="col-span-3">{selectedEvent.location}</div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right">Description</Label>
                <div className="col-span-3">{selectedEvent.description}</div>
              </div>
            </div>
            <DialogFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleEditEvent}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={handleDeleteEvent}>
                  Delete
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={handleCloseEventDetail}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add/Edit Event Dialog */}
      <Dialog open={showEventForm} onOpenChange={setShowEventForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Event" : "Add New Event"}</DialogTitle>
            <DialogDescription>
              {isEditMode ? "Make changes to the event details." : "Fill in the details for your new event."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEventFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={eventFormData.title || ""}
                  onChange={handleEventFormChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={eventFormData.date || ""}
                  onChange={handleEventFormChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startTime" className="text-right">
                  Start Time
                </Label>
                <Input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={eventFormData.startTime || ""}
                  onChange={handleEventFormChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endTime" className="text-right">
                  End Time
                </Label>
                <Input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={eventFormData.endTime || ""}
                  onChange={handleEventFormChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={eventFormData.location || ""}
                  onChange={handleEventFormChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={eventFormData.description || ""}
                  onChange={handleEventFormChange}
                  className="col-span-3"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowEventForm(false)}>
                Cancel
              </Button>
              <Button type="submit">{isEditMode ? "Save Changes" : "Create Event"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
