"use client"

import type React from "react"

import Link from "next/link"
import { Calendar, Home, Compass, Users, TrendingUp, Bookmark, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSidebar } from "./sidebar-provider"

export function Sidebar() {
  const { isOpen } = useSidebar()

  if (!isOpen) {
    return null
  }

  return (
    <div className="hidden md:block border-r bg-background h-screen sticky top-0 w-64 transition-all duration-200 overflow-hidden">
      <ScrollArea className="h-full py-6">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Navigation</h2>
          <div className="space-y-1">
            <NavItem href="/" icon={Home}>
              Home
            </NavItem>
            <NavItem href="/popular" icon={TrendingUp}>
              Popular
            </NavItem>
            <NavItem href="/all" icon={Compass}>
              All
            </NavItem>
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Communities</h2>
          <div className="space-y-1">
            <NavItem href="/c/general" icon={Users}>
              c/General
            </NavItem>
            <NavItem href="/c/studygroupa" icon={Users}>
              c/StudyGroupA
            </NavItem>
            <NavItem href="/c/computerscience" icon={Users}>
              c/ComputerScience
            </NavItem>
            <NavItem href="/c/engineering" icon={Users}>
              c/Engineering
            </NavItem>
            <NavItem href="/c/arts" icon={Users}>
              c/Arts
            </NavItem>
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Features</h2>
          <div className="space-y-1">
            <NavItem href="/events" icon={Calendar}>
              Events
            </NavItem>
            <NavItem href="/saved" icon={Bookmark}>
              Saved
            </NavItem>
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Settings</h2>
          <div className="space-y-1">
            <NavItem href="/settings" icon={Settings}>
              Settings
            </NavItem>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

interface NavItemProps {
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
  className?: string
}

function NavItem({ href, icon: Icon, children, className }: NavItemProps) {
  return (
    <Button asChild variant="ghost" className={cn("w-full justify-start", className)}>
      <Link href={href} className="flex items-center">
        <Icon className="mr-2 h-4 w-4" />
        {children}
      </Link>
    </Button>
  )
}
