"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostCard } from "@/components/post-card"
import { CalendarDays, Mail, MapPin } from "lucide-react"

interface UserProfileProps {
  username: string
}

export function UserProfile({ username }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState("posts")

  // Mock data - in a real app, this would come from an API
  const userData = {
    username,
    displayName:
      username === "academic_ace"
        ? "Academic Ace"
        : username === "code_master"
          ? "Code Master"
          : username === "event_enthusiast"
            ? "Event Enthusiast"
            : username === "struggling_student"
              ? "Struggling Student"
              : username,
    bio: "Student at University of Technology. Passionate about learning and sharing knowledge with others.",
    location: "University of Technology",
    joinDate: new Date(2022, 0, 15), // January 15, 2022
    karma: 1245,
    posts: [
      {
        id: "1",
        title: "Tips for acing your finals this semester",
        content:
          "With finals week approaching, I wanted to share some study strategies that have helped me maintain a 4.0 GPA. First, start early and create a study schedule...",
        communityName: "StudyGroupA",
        communitySlug: "studygroupa",
        author: "Academic Ace",
        authorUsername: "academic_ace",
        createdAt: new Date(Date.now() - 3600000 * 2), // 2 hours ago
        upvotes: 42,
        downvotes: 5,
        commentCount: 15,
        hasImage: false,
      },
      {
        id: "2",
        title: "My experience with Professor Johnson's Advanced Calculus class",
        content:
          "I just completed Professor Johnson's Advanced Calculus class and wanted to share my experience and some tips for those planning to take it next semester...",
        communityName: "Engineering",
        communitySlug: "engineering",
        author: "Academic Ace",
        authorUsername: "academic_ace",
        createdAt: new Date(Date.now() - 3600000 * 48), // 48 hours ago
        upvotes: 28,
        downvotes: 2,
        commentCount: 7,
        hasImage: false,
      },
    ],
    comments: [
      {
        id: "1",
        postId: "3",
        postTitle: "Photos from yesterday's campus event",
        content: "Great photos! I was there too and had an amazing time. The performances were incredible!",
        communityName: "General",
        communitySlug: "general",
        createdAt: new Date(Date.now() - 3600000 * 12), // 12 hours ago
        upvotes: 8,
        downvotes: 0,
      },
      {
        id: "2",
        postId: "4",
        postTitle: "Professor Johnson's class is killing me",
        content:
          "I took his class last semester. Try forming a study group - that really helped me understand the material better. Also, his office hours are super helpful!",
        communityName: "Engineering",
        communitySlug: "engineering",
        createdAt: new Date(Date.now() - 3600000 * 24), // 24 hours ago
        upvotes: 15,
        downvotes: 1,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="h-32 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
        <CardHeader className="pb-2 relative">
          <div className="absolute -top-16 left-4 border-4 border-background rounded-full bg-background">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt={userData.displayName} />
              <AvatarFallback>{userData.displayName[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="pt-10 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{userData.displayName}</h1>
              <p className="text-muted-foreground">u/{userData.username}</p>
            </div>
            <Button>Follow</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>{userData.bio}</p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                {userData.location}
              </div>
              <div className="flex items-center">
                <CalendarDays className="mr-1 h-4 w-4" />
                Joined {formatDistanceToNow(userData.joinDate, { addSuffix: true })}
              </div>
              <div className="flex items-center">
                <Mail className="mr-1 h-4 w-4" />
                Message
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <span className="font-bold">{userData.karma}</span>
                <span className="text-sm text-muted-foreground ml-1">Karma</span>
              </div>
              <div>
                <span className="font-bold">{userData.posts.length}</span>
                <span className="text-sm text-muted-foreground ml-1">Posts</span>
              </div>
              <div>
                <span className="font-bold">{userData.comments.length}</span>
                <span className="text-sm text-muted-foreground ml-1">Comments</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-6">
          {userData.posts.length > 0 ? (
            <div className="space-y-4">
              {userData.posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No posts yet</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="comments" className="mt-6">
          {userData.comments.length > 0 ? (
            <div className="space-y-4">
              {userData.comments.map((comment) => (
                <Card key={comment.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">
                      <span>Comment on </span>
                      <a href={`/post/${comment.postId}`} className="font-medium hover:underline">
                        {comment.postTitle}
                      </a>
                      <span> in </span>
                      <a href={`/c/${comment.communitySlug}`} className="font-medium hover:underline">
                        c/{comment.communityName}
                      </a>
                      <span> • {formatDistanceToNow(comment.createdAt)} ago</span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No comments yet</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
