import { UserProfile } from "@/components/user-profile"

export default function UserProfilePage({ params }: { params: { username: string } }) {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <UserProfile username={params.username} />
    </div>
  )
}
