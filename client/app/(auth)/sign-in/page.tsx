'use client'
import { AuthForm } from "@/components/layout/AuthForm";
import { IAuthSchema, authSchema, defaultValues } from "../validation";
import axios from 'axios';

async function handleSignIn(values: IAuthSchema) {
//   const response = await axios.post('http://localhost:3001/auth/magic-link', {
//     email: values.email
//   });
  
//   if (response.status !== 200) {
//     throw new Error("An unexpected error occurred. Please try again.");
//   }
    const response = 'log in successfull'
    console.log(response)
}

export default function SignInPage() {
  return (
    <main className="container min-h-screen max-w-[100rem] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm bg-white rounded-lg p-6 sm:p-8">
        <p className="text-xl text-dark md:text-2xl lg:text-3xl font-semibold text-center mb-10 md:mb-8">
          Log in to Collabo
        </p>
        <hr className="mb-7" />
        <AuthForm
          authSchema={authSchema}
          defaultValues={defaultValues}
          onSubmit={handleSignIn}
          buttonText="Continue with Email"
        />
      </div>
    </main>
  );
}

