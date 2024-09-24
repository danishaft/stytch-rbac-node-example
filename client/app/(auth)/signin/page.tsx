'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StytchB2B, useStytchMemberSession } from '@stytch/nextjs/b2b';
import { AuthFlowType, B2BProducts, StytchB2BUIConfig } from '@stytch/vanilla-js/b2b';


export default function SignInPage() {
  const { session, isInitialized } = useStytchMemberSession();
  const router = useRouter();
  const [config] = useState<StytchB2BUIConfig>({
    authFlowType: AuthFlowType.Discovery,
    products: [B2BProducts.emailMagicLinks],
    // emailMagicLinksOptions: {
    //   discoveryRedirectURL: `${window.location.origin}/authenticate`
    // },
    sessionOptions: {
      sessionDurationMinutes: 60,
    },
  });

  useEffect(() => {
    if (session && isInitialized) {
      router.replace("/workspace/inbox");
    }
  }, [isInitialized, session, router]);

  const styles = {
    hideHeaderText: true,
    container: {
      width: '100%',
    },
    buttons: {
      primary: {
        backgroundColor: '#4A37BE',
        borderColor: '#4A37BE',
      },
    },
  };
  

  return (
    <main>
      <div className=" container flex items-center justify-center h-screen">
        <div>
          <h2 className="text-center text-3xl font-bold text-[#051F61] mb-6">Sign In</h2>
          <StytchB2B config={config} styles={styles} />
        </div>
      </div>
    </main>
  );
}
