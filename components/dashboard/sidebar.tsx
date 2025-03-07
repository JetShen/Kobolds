"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { 
  BarChart3, 
  Building, 
  Calendar, 
  ChevronDown, 
  ClipboardList, 
  Home, 
  LayoutDashboard, 
  LogOut, 
  Settings, 
  Users 
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const role = session?.user?.role

  const isAdmin = role === "ADMIN"
  const isManager = role === "MANAGER" || isAdmin

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <div className="flex items-center gap-2 px-2">
            <BarChart3 className="h-6 w-6" />
            <h2 className="text-lg font-semibold tracking-tight">
              Enterprise App
            </h2>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Dashboard
          </h2>
          <div className="space-y-1">
            <Button
              asChild
              variant={pathname === "/dashboard" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Overview
              </Link>
            </Button>
            
            {isAdmin && (
              <Button
                asChild
                variant={pathname.startsWith("/dashboard/admin") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Link href="/dashboard/admin">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Admin Panel
                </Link>
              </Button>
            )}
            
            {isManager && (
              <Button
                asChild
                variant={pathname.startsWith("/dashboard/manager") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Link href="/dashboard/manager">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Manager Panel
                </Link>
              </Button>
            )}
          </div>
        </div>
        
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Workspace
          </h2>
          <div className="space-y-1">
            <Button
              asChild
              variant={pathname === "/dashboard/tasks" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/dashboard/tasks">
                <ClipboardList className="mr-2 h-4 w-4" />
                Tasks
              </Link>
            </Button>
            
            <Button
              asChild
              variant={pathname === "/dashboard/calendar" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/dashboard/calendar">
                <Calendar className="mr-2 h-4 w-4" />
                Calendar
              </Link>
            </Button>
            
            {isManager && (
              <Collapsible className="w-full">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                  >
                    <div className="flex items-center">
                      <Building className="mr-2 h-4 w-4" />
                      Organization
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-6 space-y-1">
                  <Button
                    asChild
                    variant={pathname === "/dashboard/teams" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Link href="/dashboard/teams">
                      <Users className="mr-2 h-4 w-4" />
                      Teams
                    </Link>
                  </Button>
                  
                  <Button
                    asChild
                    variant={pathname === "/dashboard/sectors" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Link href="/dashboard/sectors">
                      <Home className="mr-2 h-4 w-4" />
                      Sectors
                    </Link>
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        </div>
        
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Settings
          </h2>
          <div className="space-y-1">
            <Button
              asChild
              variant={pathname === "/dashboard/profile" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/dashboard/profile">
                <Settings className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </Button>
            
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start text-muted-foreground"
            >
              <Link href="/auth/logout">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}