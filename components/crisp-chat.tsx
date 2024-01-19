'use client';

import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('4e7711af-5761-4612-b8b4-0be26544c7ee');
  }, []);

  return null;
};
