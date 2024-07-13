// "use client"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import {IAuthSchema, authSchema, defaultValues} from "../validation"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { useRouter } from "next/navigation"
// import { useState } from "react"

// export function SignInForm() {
//     const router = useRouter();
//     const [isLoading, setIsLoading] = useState(false);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const [errorMessage, setErrorMessage] = useState<string | null>(null);
//     //define form
//     const form = useForm<IAuthSchema>({
//         resolver: zodResolver(authSchema),
//         defaultValues: defaultValues
//     })
//     //define submit handler
//     async function onSubmit(values: IAuthSchema) {
//         // setIsLoading(true);
//         // setSuccessMessage(null);
//         // setErrorMessage(null);
//         // try {
//         //     // Send request to your backend to initiate magic link flow
//         //     const response = await axios.post('http://localhost:3001/auth/magic-link', {
//         //         email: values.email
//         //     });

//         //     if (response.status === 200) {
//         //         setSuccessMessage("Magic link sent! Please check your email.");
//                     // form.reset(); // Clear the form
//         //     } else {
//         //         // Handle unexpected status codes
//         //         setErrorMessage("An unexpected error occurred. Please try again.");
//         //     }
//         // } catch (error) {
//         //    setErrorMessage(error.response);
//         //         console.error('Error:', error);
//         // } finally {
//         //     setIsLoading(false);
//         // }
//         console.log(values)
//         setSuccessMessage('magic link sent')
//     }

//     if (successMessage) {
//         return (
//             <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
//                 <span className="block sm:inline">{successMessage}</span>
//             </div>
//         );
//     }

//     return(
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
//             <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                     <FormItem>
//                         <FormControl>
//                             <Input placeholder="Enter your email address..." {...field} className="h-12" />
//                         </FormControl>
//                         <FormDescription>
//                             {/* This is your public display name. */}
//                         </FormDescription>
//                         <FormMessage />
//                     </FormItem>
//                 )}
//             />
//             <Button type="submit" size="full" variant="primary">
//                 {isLoading ? 'Sending...' : 'Continue with Email'}
//             </Button>
//           </form>
//         </Form>
//     )
// };

