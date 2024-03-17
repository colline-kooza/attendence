import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { CardsCreateAccount } from "@/components/signup/SignUp"
import Login from "@/components/login/Login"
import getData from "@/utils/getData"

// export const metadata: Metadata = {
//   title: "Authentication",
//   description: "Authentication forms built using the components.",
// }

export default async function AuthenticationPage() {
  const students=await getData("students")
  return (
    <>
      <div className="hidden">
        <Image
          src="/dcsLogo.webp"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/dcsLogo.webp"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative min-h-[600px] flex-col items-center justify-center md:grid lg:max-w-none mt-[8rem] lg:mt-0 md:mt-0 lg:grid-cols-2 lg:px-0">
        <Link
          href="/register"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8 lg:block md:block hidden"
          )}
        >
         Register
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
           Desishub
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
            <p className="text-lg">
    &ldquo;This platform has revolutionized how I manage student attendance,
    making it effortless to track and monitor attendance records efficiently.&rdquo;
  </p>
              <footer className="text-sm">Collinz kooza</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
              Login Account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter correct Credentials to Login 
              </p>
            </div>
            <Login students={students}/>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to {" "}
              <Link
                href="/register"
                className="underline underline-offset-4 hover:text-primary"
              >
               register
              </Link>{" "}
              {" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}