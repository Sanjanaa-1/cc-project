import { CreatePostForm } from "@/components/create-post-form"

export default function CreatePostPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Post</h1>
      <CreatePostForm />
    </div>
  )
}
