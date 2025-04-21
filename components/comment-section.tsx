"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, MoreHorizontal, Reply } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CommentSectionProps {
  postId: string
}

interface CommentType {
  id: string
  content: string
  author: string
  authorUsername: string
  createdAt: Date
  upvotes: number
  downvotes: number
  replies?: CommentType[]
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [commentText, setCommentText] = useState("")

  // Mock data - in a real app, this would come from an API
  const comments: CommentType[] = [
    {
      id: "1",
      content:
        "These are great tips! I especially like the point about teaching concepts to others. I've found that explaining something to someone else really helps solidify my understanding.",
      author: "Study Buddy",
      authorUsername: "study_buddy",
      createdAt: new Date(Date.now() - 3600000), // 1 hour ago
      upvotes: 15,
      downvotes: 1,
      replies: [
        {
          id: "1-1",
          content:
            "Agreed! The Feynman Technique (teaching to learn) is one of the most effective study methods out there.",
          author: "Learning Pro",
          authorUsername: "learning_pro",
          createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
          upvotes: 8,
          downvotes: 0,
        },
      ],
    },
    {
      id: "2",
      content:
        "I would add that it's also important to understand your learning style. Some people are visual learners, others are auditory or kinesthetic. Tailoring your study methods to your learning style can make a big difference.",
      author: "Education Expert",
      authorUsername: "education_expert",
      createdAt: new Date(Date.now() - 7200000), // 2 hours ago
      upvotes: 12,
      downvotes: 2,
    },
    {
      id: "3",
      content: "What about study apps or tools? Any recommendations for digital flashcards or note-taking apps?",
      author: "Tech Student",
      authorUsername: "tech_student",
      createdAt: new Date(Date.now() - 10800000), // 3 hours ago
      upvotes: 7,
      downvotes: 0,
      replies: [
        {
          id: "3-1",
          content:
            "I personally love Anki for flashcards and Notion for note-taking. Anki uses spaced repetition which is scientifically proven to improve retention.",
          author: "App Enthusiast",
          authorUsername: "app_enthusiast",
          createdAt: new Date(Date.now() - 9000000), // 2.5 hours ago
          upvotes: 5,
          downvotes: 0,
        },
        {
          id: "3-2",
          content:
            "Don't forget about Forest app for staying focused! It helps you avoid phone distractions during study sessions.",
          author: "Focus Master",
          authorUsername: "focus_master",
          createdAt: new Date(Date.now() - 7200000), // 2 hours ago
          upvotes: 4,
          downvotes: 0,
        },
      ],
    },
  ]

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      // In a real app, this would send the comment to an API
      alert("Comment submitted: " + commentText)
      setCommentText("")
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="@user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="What are your thoughts?"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end">
                <Button onClick={handleSubmitComment}>Comment</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}

interface CommentProps {
  comment: CommentType
  isReply?: boolean
}

function Comment({ comment, isReply = false }: CommentProps) {
  const [voteStatus, setVoteStatus] = useState<"up" | "down" | null>(null)
  const [voteCount, setVoteCount] = useState(comment.upvotes - comment.downvotes)
  const [isReplying, setIsReplying] = useState(false)
  const [replyText, setReplyText] = useState("")

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

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      // In a real app, this would send the reply to an API
      alert("Reply submitted: " + replyText)
      setReplyText("")
      setIsReplying(false)
    }
  }

  return (
    <div className={cn("border rounded-md p-4", isReply && "ml-8 mt-4")}>
      <div className="flex items-start gap-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt={comment.author} />
          <AvatarFallback>{comment.author[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Link href={`/u/${comment.authorUsername}`} className="font-medium hover:underline">
              {comment.author}
            </Link>
            <span className="text-xs text-muted-foreground">{formatDistanceToNow(comment.createdAt)} ago</span>
          </div>

          <p className="text-sm mb-2">{comment.content}</p>

          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-6 w-6", voteStatus === "up" && "text-orange-500")}
                onClick={() => handleVote("up")}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <span className="text-xs font-medium px-1">{voteCount}</span>
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-6 w-6", voteStatus === "down" && "text-blue-500")}
                onClick={() => handleVote("down")}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => setIsReplying(!isReplying)}>
              <Reply className="h-3 w-3 mr-1" />
              Reply
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {isReplying && (
            <div className="mt-4 space-y-2">
              <Textarea
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="min-h-[80px] text-sm"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsReplying(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSubmitReply}>
                  Reply
                </Button>
              </div>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map((reply) => (
                <Comment key={reply.id} comment={reply} isReply />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
