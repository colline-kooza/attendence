import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { CardsCreateAccount } from "@/components/signup/SignUp"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
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
      <div className="container relative min-h-[600px] flex-col items-center justify-center md:grid lg:max-w-none lg:mt-0 mt-[3rem] lg:grid-cols-2 lg:px-0">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8 lg:block md:block hidden"
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 dark:text-white text-black lg:flex dark:border-r ">
        <img className="blur-[2px] object-cover w-full h-full rounded-sm" src="/student-1.jpg" alt="" />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <CardsCreateAccount />
            <p className="px-8 text-center text-sm text-muted-foreground">
              If already have an account{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                login
              </Link>{" "}
              to {" "}
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Continue
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}