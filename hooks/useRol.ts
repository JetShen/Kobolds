import { cookies } from 'next/headers';
import { useEffect, useState } from 'react';


async function getRol(){

  const cookieStore = cookies()
  const sessionCookie = cookieStore.get('session');
  const value = JSON.parse(sessionCookie?.value || 'null');
  return value
}

const useRol = (): string | null => {
  const [rol, setRol] = useState<string | null>(null);

  useEffect(() => {
    getRol().then((value) => {
      setRol(value);
    })
  }, []);

  return rol;
};
export default useRol;


