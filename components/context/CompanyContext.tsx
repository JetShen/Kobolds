"use client";

import { createContext, useContext, ReactNode } from "react";

interface CompanyContextType {
  companyId: string;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({
  children,
  companyId,
}: {
  children: ReactNode;
  companyId: string;
}) {
  return (
    <CompanyContext.Provider value={{ companyId }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
}