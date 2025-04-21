import { PostFeed } from "@/components/post-feed"
import { TrendingCommunities } from "@/components/trending-communities"

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold mb-6">Home Feed</h1>
        <PostFeed />
      </div>
      <div className="hidden md:block">
        <TrendingCommunities />
      </div>
    </div>
  )
}
