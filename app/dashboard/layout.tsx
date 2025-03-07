import { ReactNode } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block">
        <Sidebar className="w-64 border-r" />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}