'use client'
// import Cookies from 'js-cookie';
// import { Button } from '@/components/ui/button';
// import { useRouter, useSearchParams } from 'next/navigation';
// import React, { useCallback, useEffect, useState } from 'react';
// import { useFetch } from '@/app/utils';
// import Spinner from '@/components/ui/spinner';
 
// function Discovery() {
//     const searchParams = useSearchParams();
//     const router = useRouter();
//     const token = searchParams.get('token');
//     const tokenType = searchParams.get('stytch_token_type');
//     const [shouldFetch, setShouldFetch] = useState(false);

//     useEffect(() => {
//       console.log('Discovery component rendered');
//       setShouldFetch(true)
//     }, [token, tokenType]);
    
//     const { data, loading, error } = useFetch<{
//       organizations: any[];
//       email: string;
//       ist: string;
//     }>('/auth/authenticate-token', {
//       method: 'POST',
//       data: { token, tokenType }
//     }, shouldFetch);

//     const organizations = data?.organizations || [];
//     const email = data?.email || '';

//     const selectOrg = useCallback((organizationId: string) => {
//       router.push(`/sign-in/${organizationId}`);
//     }, [router]);
  
//     const createOrg = useCallback(() => {
//       router.push('/create-org');
//     }, [router]);

//     let errorMessage = null

//     // Handle data and error
//     if (data && data.ist) {
//       Cookies.set('intermediate_session_token', data.ist);
//     }

//     if (error) {
//       console.error(error);
//       errorMessage = error ? 'Failed to authenticate magic link' : null;
//     }
//     console.log(error)
    
//   return (
//     <main className="container min-h-screen max-w-[100rem] flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       {loading ? (
//         <Spinner />
//       ) : errorMessage ? (
//         <div className='w-full max-w-sm bg-white rounded-lg p-6 sm:p-8'>
//           <p className="text-red-500">{errorMessage}</p>
//         </div>
//       ) : (
//         <div className="w-full max-w-sm bg-white rounded-lg p-6 sm:p-8">
//           <p className="text-xl text-dark md:text-2xl lg:text-3xl font-semibold text-center mb-10 md:mb-8">{`Select a workspace ${email} to continue`}</p>
//           <hr className="mb-7" />
//           {organizations.map((org) => (
//               <Button key={org.organization_id} variant={'outline'} size={'full'} onClick={() => selectOrg(org.organization_id)}>
//                   {org.organization_name}
//               </Button>
//           ))}
//           <span>or</span>
//           <Button variant={'outline'} size={'full'} onClick={createOrg}>Create new workspace</Button>
//         </div>
//       )}
//     </main>
//   );
// }

// export default React.memo(Discovery)

import React, { useState, useEffect } from "react";
import {
  AuthFlowType,
  B2BProducts,
  StytchB2BUIConfig,
  StytchEventType,
} from "@stytch/vanilla-js";
import { StytchB2B } from "@stytch/nextjs/b2b";
import { useRouter } from "next/navigation";
import fetchApi from "@/app/utils/api";
import { OrgAndMemberResponse } from "@/app/utils";
import { AppStores } from "@/lib/zustand";
import { UpdateIcon } from "@radix-ui/react-icons";

const Discovery = () => {
  const router = useRouter();
  const [config] = useState<StytchB2BUIConfig>({
    authFlowType: AuthFlowType.Discovery,
    products: [B2BProducts.emailMagicLinks],
    sessionOptions: {
      sessionDurationMinutes: 60,
    },
  });
  const updateUserStore = AppStores.useUserStore((state) => state.updateUserInfo)
  const updateOrgStore = AppStores.useOrgStore((state) => state.updateOrgInfo)
  console.log('in authenticate')

  return config ? (
    <div className=" container flex items-center justify-center h-screen">
      <StytchB2B
      config={config}
      callbacks={{
        onEvent: async ({type, data}) => {
            if (
                type === StytchEventType.B2BDiscoveryIntermediateSessionExchange ||
                type === StytchEventType.B2BDiscoveryOrganizationsCreate
            ){
                if(data && data.organization){
                  console.log(data)
                  try{
                    const response = await fetchApi.post<OrgAndMemberResponse>(`/organizations`, {
                      org: data.organization, 
                      member: data.member,
                    });
                    console.log(response.data)
                    if(response.data.newUser){
                      updateUserStore(response.data.newUser)
                      updateOrgStore(response.data.newOrg)
                      router.replace("/register")
                    }else {
                        router.replace("/workspace/inbox")
                    }
                  }catch(error){
                    console.log(error)
                  }
                    // const api = new URL("/api/organizations", process.env.NEXT_PUBLIC_API_URL);
                    // return fetch(api, {
                    //     method: "POST",
                    //     headers: {
                    //       'Content-Type': 'application/json',
                    //     },
                    //     body: JSON.stringify({
                    //       org: data.organization,
                    //       member: data.member,
                    //     }),
                    //     credentials: "include",
                    // }).then(res => (
                    //     res.json()
                    // )).then(result => {
                    //     if(result.isNewUser){
                    //       router.replace("/register")
                    //     }else {
                    //       router.replace("/workspace/inbox")
                    //     }
                    // }).catch(error => {
                    //     console.error(error);
                    // })
                }
            }
        },
      }} 
      />
    </div>
  ) : null;
};

export default Discovery;