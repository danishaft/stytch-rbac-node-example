'use client'
import { StytchB2B } from '@stytch/nextjs/b2b';
import { AuthFlowType, B2BProducts, StytchB2BUIConfig } from '@stytch/vanilla-js/b2b';
import { useEffect, useState } from 'react';

export default function SignUpPage() {
  const [config, setConfig] = useState<StytchB2BUIConfig | null>();
  
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

  useEffect(() => {
    setConfig({
      authFlowType: AuthFlowType.Discovery,
      products: [B2BProducts.emailMagicLinks],
      sessionOptions: {
        sessionDurationMinutes: 60,
      },
    })
  }, []);
 

  return (
    config ? 
    <main>
      <div className=" container flex items-center justify-center h-screen">
        <div>
          <h2 className="text-center text-3xl font-bold text-[#051F61] mb-6">Sign Up</h2>
          <StytchB2B config={config} styles={styles} />
        </div>
      </div>
    </main> :
    null
  );
}
