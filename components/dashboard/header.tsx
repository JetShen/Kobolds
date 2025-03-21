"use client"

import { Bell, Menu, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/dashboard/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getRole } from "@/app/dashboard/layout"

interface HeaderProps {
  title: string
}
interface SidebarProps {
  className?: string;
}
export function Header({ title }: HeaderProps) {
  const user = { name: "John Doe" }
  const role = getRole();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidebar className={"w-64 border-r" as SidebarProps} role={role} />
        </SheetContent>
      </Sheet>
      
      <div className="flex-1">
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      
      <div className="hidden md:flex md:flex-1 md:items-center md:gap-4 md:justify-end">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-8"
          />
        </div>
      </div>
      
      <Button variant="outline" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
          3
        </span>
        <span className="sr-only">Notifications</span>
      </Button>
      
      <ModeToggle />
      
      <Avatar>
        <AvatarImage src="" alt={user?.name || "User"} />
        <AvatarFallback>
          {user?.name?.charAt(0) || "U"}
        </AvatarFallback>
      </Avatar>
    </header>
  )
}