import { ReactNode } from "react";

interface CompanyProviderProps {
  children: ReactNode;
  companyId?: string;
}

export function CompanyProvider({ children, companyId }: CompanyProviderProps) {
  return <div className="flex-1">{children}</div>;
}   