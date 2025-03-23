import { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { cookies } from "next/headers";
import { CompanyProvider } from "@/components/context/CompanyContext"; 

export function getRole() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session");
  const value = JSON.parse(sessionCookie?.value || "EMPLOYEE");
  return value;
}

export function getCompanyId() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("companyId");
  const value = JSON.parse(sessionCookie?.value || "1");
  return value;
}

interface SidebarProps {
  className?: string;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const role = getRole();
  const companyId = getCompanyId();

  return (
    <CompanyProvider companyId={companyId} role={role}>
      <div className="flex min-h-screen">
        <div className="hidden md:block">
          <Sidebar className={"w-64 border-r" as SidebarProps} />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </CompanyProvider>
  );
}