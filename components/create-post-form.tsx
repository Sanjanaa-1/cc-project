"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ImageIcon, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CreatePostForm() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [community, setCommunity] = useState("")
  const [postType, setPostType] = useState("text")
  const [imageUrl, setImageUrl] = useState("")
  const [linkUrl, setLinkUrl] = useState("")

  // Mock data - in a real app, this would come from an API
  const communities = [
    { name: "General", slug: "general" },
    { name: "Study Group A", slug: "studygroupa" },
    { name: "Computer Science", slug: "computerscience" },
    { name: "Engineering", slug: "engineering" },
    { name: "Arts", slug: "arts" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!title.trim()) {
      alert("Please enter a title")
      return
    }

    if (!community) {
      alert("Please select a community")
      return
    }

    if (postType === "text" && !content.trim()) {
      alert("Please enter some content")
      return
    }

    if (postType === "image" && !imageUrl.trim()) {
      alert("Please enter an image URL")
      return
    }

    if (postType === "link" && !linkUrl.trim()) {
      alert("Please enter a link URL")
      return
    }

    // In a real app, this would send the post to an API
    alert("Post created successfully!")
    router.push("/")
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Create a Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="community">Community</Label>
            <Select value={community} onValueChange={setCommunity}>
              <SelectTrigger id="community">
                <SelectValue placeholder="Select a community" />
              </SelectTrigger>
              <SelectContent>
                {communities.map((community) => (
                  <SelectItem key={community.slug} value={community.slug}>
                    c/{community.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={300}
            />
            <div className="text-xs text-muted-foreground text-right">{title.length}/300</div>
          </div>

          <Tabs value={postType} onValueChange={setPostType}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="image">Image</TabsTrigger>
              <TabsTrigger value="link">Link</TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Text (optional)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px]"
              />
            </TabsContent>

            <TabsContent value="image" className="space-y-2">
              <Label htmlFor="image-url">Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="image-url"
                  placeholder="Image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <Button type="button" size="icon" variant="outline">
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </div>
              {imageUrl && (
                <div className="mt-4 rounded-md overflow-hidden bg-muted">
                  <img
                    src={imageUrl || "/placeholder.svg?height=200&width=400"}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=200&width=400"
                    }}
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="link" className="space-y-2">
              <Label htmlFor="link-url">Link URL</Label>
              <div className="flex gap-2">
                <Input id="link-url" placeholder="URL" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
                <Button type="button" size="icon" variant="outline">
                  <Link2 className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Post</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
