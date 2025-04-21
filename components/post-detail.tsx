"use client"

import { useState } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ArrowDown, ArrowUp, Bookmark, Flag, MoreHorizontal, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface PostDetailProps {
  postId: string
}

export function PostDetail({ postId }: PostDetailProps) {
  const [voteStatus, setVoteStatus] = useState<"up" | "down" | null>(null)
  const [voteCount, setVoteCount] = useState(42)

  // Mock data - in a real app, this would come from an API
  const post = {
    id: postId,
    title: "Tips for acing your finals this semester",
    content:
      "With finals week approaching, I wanted to share some study strategies that have helped me maintain a 4.0 GPA.\n\nFirst, start early and create a study schedule. Break down your material into manageable chunks and use active recall techniques instead of passive reading.\n\nSecond, form study groups with classmates. Teaching concepts to others is one of the best ways to solidify your understanding.\n\nThird, take care of your physical and mental health. Get enough sleep, eat well, and take breaks. Your brain needs rest to process information effectively.\n\nFourth, use practice exams if available. They help you get familiar with the format and timing of the actual exam.\n\nFinally, don't cram the night before. Review your material, get a good night's sleep, and approach the exam with confidence.\n\nGood luck to everyone on their finals!",
    communityName: "StudyGroupA",
    communitySlug: "studygroupa",
    author: "Academic Ace",
    authorUsername: "academic_ace",
    createdAt: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    hasImage: false,
  }

  const handleVote = (type: "up" | "down") => {
    if (voteStatus === type) {
      // Remove vote
      setVoteStatus(null)
      setVoteCount(type === "up" ? voteCount - 1 : voteCount + 1)
    } else {
      // Change vote
      const oldStatus = voteStatus
      setVoteStatus(type)

      if (oldStatus === null) {
        setVoteCount(type === "up" ? voteCount + 1 : voteCount - 1)
      } else {
        setVoteCount(type === "up" ? voteCount + 2 : voteCount - 2)
      }
    }
  }

  return (
    <Card>
      <div className="flex">
        <div className="flex flex-col items-center px-2 py-4 bg-muted/30">
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", voteStatus === "up" && "text-orange-500")}
            onClick={() => handleVote("up")}
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
          <span className="text-sm font-medium py-1">{voteCount}</span>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", voteStatus === "down" && "text-blue-500")}
            onClick={() => handleVote("down")}
          >
            <ArrowDown className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Link href={`/c/${post.communitySlug}`} className="font-medium hover:underline">
                c/{post.communityName}
              </Link>
              <span className="mx-1">•</span>
              <span>Posted by</span>
              <Link href={`/u/${post.authorUsername}`} className="ml-1 hover:underline">
                u/{post.authorUsername}
              </Link>
              <span className="mx-1">•</span>
              <span>{formatDistanceToNow(post.createdAt)} ago</span>
            </div>
            <h1 className="text-2xl font-semibold">{post.title}</h1>
          </CardHeader>

          <CardContent className="p-4 pt-0">
            <div className="whitespace-pre-line">{post.content}</div>

            {post.hasImage && (
              <div className="mt-3 rounded-md overflow-hidden bg-muted">
                <img src="/placeholder.svg?height=400&width=600" alt="Post image" className="w-full object-cover" />
              </div>
            )}
          </CardContent>

          <CardFooter className="p-4 flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Share className="mr-1 h-4 w-4" />
              Share
            </Button>

            <Button variant="ghost" size="sm">
              <Bookmark className="mr-1 h-4 w-4" />
              Save
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="mr-1 h-4 w-4" />
                  More
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Flag className="mr-2 h-4 w-4" />
                  Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}
