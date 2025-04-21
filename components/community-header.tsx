"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CommunityHeaderProps {
  communitySlug: string
}

export function CommunityHeader({ communitySlug }: CommunityHeaderProps) {
  const [isJoined, setIsJoined] = useState(false)

  // Mock data - in a real app, this would come from an API
  const communityData = {
    name:
      communitySlug === "general"
        ? "General"
        : communitySlug === "studygroupa"
          ? "Study Group A"
          : communitySlug === "computerscience"
            ? "Computer Science"
            : communitySlug === "engineering"
              ? "Engineering"
              : communitySlug === "arts"
                ? "Arts"
                : communitySlug,
    description:
      "A community for students to connect, share resources, and discuss topics related to their academic interests.",
    memberCount: 1245,
    createdAt: "Jan 2022",
  }

  return (
    <Card>
      <div className="h-32 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">c/{communityData.name}</CardTitle>
            <CardDescription>Created {communityData.createdAt}</CardDescription>
          </div>
          <Button variant={isJoined ? "outline" : "default"} onClick={() => setIsJoined(!isJoined)}>
            {isJoined ? "Joined" : "Join"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{communityData.description}</p>
        <p className="text-sm text-muted-foreground mt-2">{communityData.memberCount.toLocaleString()} members</p>
      </CardContent>
    </Card>
  )
}
