'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStytchMemberSession } from '@stytch/nextjs/b2b';

export default function Index() {
  const { session, isInitialized } = useStytchMemberSession();
  const router = useRouter();
  // If the Stytch SDK detects a User then redirect to profile; for example if a logged in User navigated directly to this URL.
  useEffect(() => {
    if (isInitialized && session) {
      router.replace('/signup');
      // console.log('signup')
    }else {
        router.replace('/workspace/inbox');
        // console.log('signup')
    }
  }, [session, isInitialized, router]);
}