'use client';

import { NavigationContextType } from '@/@types/type';
import { createContext, useState } from 'react';

//This function teakes this values
//
export const NavigationContext = createContext<
  NavigationContextType | undefined
>({
  isMobileNavOpen: false,
  setIsMobileNavOpen: () => {},
  closeMobileNav: () => {},
});

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  const closeMobileNav = () => setIsMobileNavOpen(false);
  return (
    <NavigationContext.Provider
      value={{
        isMobileNavOpen,
        closeMobileNav,
        setIsMobileNavOpen,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
