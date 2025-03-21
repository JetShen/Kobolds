import { useEffect, useState } from 'react';

const useUserCompanyId = (): string | null => {
  const [companyId, setCompanyId] = useState<string | null>(null);

  const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;

    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  useEffect(() => {
    const sessionCookie = getCookie('companyId');
    if (sessionCookie) {
      setCompanyId(sessionCookie);
    }
  }, []);

  return companyId;
};

export default useUserCompanyId;