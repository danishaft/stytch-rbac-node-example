// 'use client'
// import Cookies from 'js-cookie'
// import { ICreateOrgSchema, createOrgSchema, createOrgValues } from "../validation";
// import { CreateOrgForm } from "@/components/layout/CreateOrgForm";
// import { useRouter } from "next/navigation";
// import { useFetch } from '@/app/utils';
// import { useCallback, useEffect, useState } from 'react';


// export default function CreateOrgPage() {
//   const router = useRouter();
//   const [formValues, setFormValues] = useState<ICreateOrgSchema | null>(null);
//   const [shouldFetch, setShouldFetch] = useState(false);

//   const handleCreateOrg = useCallback((values: ICreateOrgSchema) => {
//     const {firstName, lastName, workspaceName} = values
//     setFormValues({
//       firstName,
//       lastName,
//       workspaceName
//     });
//     setShouldFetch(true);
//   },[]);

//   const {data, loading, error} = useFetch<{
//     status: number;
//     message: string;
//     session_token: string;
//     organization: any
//   }>('/auth/create-org', {
//     method: 'POST',
//     data: {
//       first_name: formValues?.firstName,
//       last_name: formValues?.lastName,
//       organization_name: formValues?.workspaceName
//     },
//   }, shouldFetch);
//   console.log(data, error)

//   let errorMsg = null;
//   useEffect(() => {
//     if (data) {
//       setShouldFetch(false);
//       Cookies.set('session_token', data.session_token)
//       let sessionToken = Cookies.get('session_token')
//       console.log('sessionToken', sessionToken)
//       Cookies.remove('intermediate_session_token')
//       console.log(data.message);
//       router.replace("/workspace");
//     }
//     if (error) {
//       setShouldFetch(false);
//       router.replace("/sign-in")
//     }
//   }, [data, error, router]);

  
//   if(error){
//     errorMsg = error.response?.data?.message ?? error.message ?? 'Failed to create workspace';
//   }

//   return (
//     <main className="container min-h-screen max-w-[100rem] flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="w-full max-w-sm bg-white rounded-lg p-6 sm:p-8">
//         <p className="text-xl text-dark md:text-2xl lg:text-3xl font-semibold text-center mb-10 md:mb-8">
//           Create your workspace
//         </p>
//         <hr className="mb-7" />
//         <CreateOrgForm
//             schema={createOrgSchema}
//             defaultValues={createOrgValues}
//             onSubmit={handleCreateOrg}
//             buttonText="Update"
//             errorMsg={errorMsg}
//             isLoading={loading}
//         />
//       </div>
//     </main>
//   );
// };



'use client'
import { ICreateOrgSchema, createOrgSchema, createOrgValues } from "../validation";
import { CreateOrgForm } from "@/components/custom/organization/CreateOrgForm";
import { useRouter } from "next/navigation";
import { useStytchMemberSession } from '@stytch/nextjs/b2b';
import { OrgAndMemberResponse, useAuth, } from "@/app/utils";
import fetchApi from "@/app/utils/api";
import { AppStores } from "@/lib/zustand";



export default function CreateOrgPage() {
  const router = useRouter();
  const {isAuthenticated, loading} = useAuth();
  const updateUserStore = AppStores.useUserStore((state) => state.updateUserInfo)
  const updateOrgStore = AppStores.useOrgStore((state) => state.updateOrgInfo)

  const handleUpdate = async (values: ICreateOrgSchema) => {
    const {firstName, lastName, workspaceName} = values
    try{
      const response = await fetchApi.put<OrgAndMemberResponse>(`/organizations`, {
        firstName, 
        lastName,
        workspaceName
      });
      console.log(response.data)
      if(response.data){
        updateUserStore(response.data.newUser)
        updateOrgStore(response.data.newOrg)
        router.replace("/workspace/inbox")
      }
    }catch(error){
      console.log(error)
    }
  
  };
  if(!isAuthenticated) return null;
  return (
    <main className="container min-h-screen max-w-[100rem] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm bg-white rounded-lg p-6 sm:p-8">
        <p className="text-xl text-dark md:text-2xl lg:text-3xl font-semibold text-center mb-10 md:mb-8">
          Create your workspace
        </p>
        <hr className="mb-7" />
        <CreateOrgForm
            schema={createOrgSchema}
            defaultValues={createOrgValues}
            onSubmit={handleUpdate}
            buttonText="Update"
            // errorMsg={errorMsg}
            // isLoading={loading}
        />
      </div>
    </main>
  );
};