"use client"

import { PostCard } from "@/components/post-card"

interface PostFeedProps {
  communitySlug?: string
}

export function PostFeed({ communitySlug }: PostFeedProps) {
  // Mock data - in a real app, this would come from an API
  const posts = [
    {
      id: "1",
      title: "Tips for acing your finals this semester",
      content:
        "With finals week approaching, I wanted to share some study strategies that have helped me maintain a 4.0 GPA. First, start early and create a study schedule. Break down your material into manageable chunks and use active recall techniques instead of passive reading...",
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
      title: "Campus Connect Hackathon - Join our team!",
      content:
        "Hey everyone! The annual Campus Connect Hackathon is coming up next month, and I'm looking for team members. We'll be building a sustainability app that helps students reduce their carbon footprint on campus. Looking for developers, designers, and anyone passionate about environmental issues!",
      communityName: "ComputerScience",
      communitySlug: "computerscience",
      author: "Code Master",
      authorUsername: "code_master",
      createdAt: new Date(Date.now() - 3600000 * 5), // 5 hours ago
      upvotes: 28,
      downvotes: 2,
      commentCount: 7,
      hasImage: true,
    },
    {
      id: "3",
      title: "Photos from yesterday's campus event",
      content:
        "Had an amazing time at the Spring Festival yesterday! Here are some photos I took of the performances, food stalls, and activities. It was great seeing so many students come together and celebrate. Looking forward to next year's event!",
      communityName: "General",
      communitySlug: "general",
      author: "Event Enthusiast",
      authorUsername: "event_enthusiast",
      createdAt: new Date(Date.now() - 3600000 * 24), // 24 hours ago
      upvotes: 76,
      downvotes: 3,
      commentCount: 23,
      hasImage: true,
    },
    {
      id: "4",
      title: "Professor Johnson's class is killing me",
      content:
        "Is anyone else struggling with Professor Johnson's Advanced Calculus class? The homework assignments are taking me 10+ hours each week, and I still don't feel like I understand the material. Any tips or study resources would be greatly appreciated!",
      communityName: "Engineering",
      communitySlug: "engineering",
      author: "Struggling Student",
      authorUsername: "struggling_student",
      createdAt: new Date(Date.now() - 3600000 * 36), // 36 hours ago
      upvotes: 54,
      downvotes: 2,
      commentCount: 31,
      hasImage: false,
    },
  ]

  // Filter posts by community if communitySlug is provided
  const filteredPosts = communitySlug ? posts.filter((post) => post.communitySlug === communitySlug) : posts

  return (
    <div className="space-y-4">
      {filteredPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
