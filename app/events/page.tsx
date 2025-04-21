import { EventCalendar } from "@/components/event-calendar"

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Campus Events</h1>
        <div className="flex items-center space-x-2">
          <button className="text-sm font-medium">Month</button>
          <button className="text-sm font-medium">Week</button>
          <button className="text-sm font-medium">Day</button>
        </div>
      </div>
      <EventCalendar />
    </div>
  )
}
