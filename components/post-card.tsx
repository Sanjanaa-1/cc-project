"use client"

import { useState } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ArrowDown, ArrowUp, MessageSquare, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PostCardProps {
  post: {
    id: string
    title: string
    content: string
    communityName: string
    communitySlug: string
    author: string
    authorUsername: string
    createdAt: Date
    upvotes: number
    downvotes: number
    commentCount: number
    hasImage?: boolean
  }
}

export function PostCard({ post }: PostCardProps) {
  const [voteStatus, setVoteStatus] = useState<"up" | "down" | null>(null)
  const [voteCount, setVoteCount] = useState(post.upvotes - post.downvotes)

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
    <Card className="mb-4 overflow-hidden hover:border-muted-foreground/20 transition-colors">
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
            <Link href={`/post/${post.id}`} className="hover:underline">
              <h3 className="text-xl font-semibold">{post.title}</h3>
            </Link>
          </CardHeader>

          <CardContent className="p-4 pt-0">
            <div className="line-clamp-3 text-muted-foreground">{post.content}</div>

            {post.hasImage && (
              <div className="mt-3 rounded-md overflow-hidden bg-muted">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Post image"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
          </CardContent>

          <CardFooter className="p-2 flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/post/${post.id}`} className="flex items-center">
                <MessageSquare className="mr-1 h-4 w-4" />
                {post.commentCount} Comments
              </Link>
            </Button>

            <Button variant="ghost" size="sm">
              <Share className="mr-1 h-4 w-4" />
              Share
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}
