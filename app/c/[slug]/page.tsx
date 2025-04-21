import { CommunityHeader } from "@/components/community-header"
import { PostFeed } from "@/components/post-feed"

export default function CommunityPage({ params }: { params: { slug: string } }) {
  return (
    <div className="space-y-6">
      <CommunityHeader communitySlug={params.slug} />
      <PostFeed communitySlug={params.slug} />
    </div>
  )
}
