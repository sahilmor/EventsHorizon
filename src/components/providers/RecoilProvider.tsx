"use client";

import { RecoilRoot } from 'recoil';
import { ReactNode, useState, useEffect } from 'react';

interface RecoilProviderProps {
  children: ReactNode;
}

export default function RecoilProvider({ children }: RecoilProviderProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <RecoilRoot>{children}</RecoilRoot>;
} 