import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function TrendingCommunities() {
  // Mock data - in a real app, this would come from an API
  const communities = [
    {
      name: "StudyGroupA",
      slug: "studygroupa",
      description: "A community for students to find study partners and share resources",
      memberCount: 1245,
    },
    {
      name: "ComputerScience",
      slug: "computerscience",
      description: "Discussions about CS courses, projects, and career advice",
      memberCount: 3782,
    },
    {
      name: "CampusEvents",
      slug: "campusevents",
      description: "Stay updated on all events happening around campus",
      memberCount: 2150,
    },
    {
      name: "Marketplace",
      slug: "marketplace",
      description: "Buy, sell, or trade textbooks and other student essentials",
      memberCount: 1876,
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Trending Communities</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {communities.map((community) => (
            <div key={community.slug} className="space-y-2">
              <div className="flex items-center justify-between">
                <Link href={`/c/${community.slug}`} className="font-medium hover:underline">
                  c/{community.name}
                </Link>
                <Button size="sm" variant="outline">
                  Join
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{community.description}</p>
              <p className="text-xs text-muted-foreground">{community.memberCount.toLocaleString()} members</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Link href="/events" className="font-medium hover:underline">
              End of Semester Party
            </Link>
            <p className="text-sm text-muted-foreground">May 15, 2023 • 8:00 PM</p>
            <p className="text-xs text-muted-foreground">Student Center, Main Hall</p>
          </div>
          <div className="space-y-2">
            <Link href="/events" className="font-medium hover:underline">
              Career Fair
            </Link>
            <p className="text-sm text-muted-foreground">May 20, 2023 • 10:00 AM</p>
            <p className="text-xs text-muted-foreground">Engineering Building</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/events">View All Events</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
