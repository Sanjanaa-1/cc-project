import { PostDetail } from "@/components/post-detail"
import { CommentSection } from "@/components/comment-section"

export default function PostPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <PostDetail postId={params.id} />
      <CommentSection postId={params.id} />
    </div>
  )
}
