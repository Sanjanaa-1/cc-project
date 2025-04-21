"use client"

import Link from "next/link"
import { Bell, Menu, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebar } from "./sidebar-provider"
import { useState } from "react"

export function Header() {
  const { toggle } = useSidebar()
  const [isLoggedIn, setIsLoggedIn] = useState(false) // For demo purposes

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggle}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <Link href="/" className="flex items-center gap-2 mr-4">
          <span className="text-xl font-bold">Campus Connect</span>
        </Link>

        <div className="flex-1 flex items-center max-w-md mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search Campus Connect..." className="w-full pl-8 rounded-full bg-muted" />
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <Link href="/create-post">
            <Button size="sm" className="hidden md:flex">
              <Plus className="mr-2 h-4 w-4" />
              Create Post
            </Button>
            <Button size="icon" variant="ghost" className="md:hidden">
              <Plus className="h-5 w-5" />
            </Button>
          </Link>

          <Button size="icon" variant="ghost">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/u/username">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setIsLoggedIn(true)}>
                Log in
              </Button>
              <Button size="sm" onClick={() => setIsLoggedIn(true)}>
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
