"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { DashBoardLinks } from "./DashBoardLinks"
import { CommandMenu } from "../CommandMenu"
import { useSession } from "next-auth/react"
// import { Icons } from "./Icons"


export function DashNav() {
  const { data: session }: { data: any | null | undefined } = useSession();
  const userId = session?.user?.id;

  // const userId = session?.id;
  // console.log(userId);

  const pathname = usePathname()
  const components: { title: string; href: string;}[] = [
    {
      title: "Attendance",
      href: "/dashboard/attendence",
    },
    {
      title: "view-list",
      href: userId ? `/dashboard/over-view/${userId}` : "/dashboard",
    },

  ]
  return (
    <div className="flex flex-col gap-3 ">
    <div className="lg:flex items-center hidden gap-8 ">
   <div>
    <CommandMenu/>
   </div>
    </div>
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
    <Link
          href="/dashboard"
          className={cn(
            "transition-colors hover:text-foreground/80 font-semibold text-white",
            pathname === "/dashboard" ? "text-foreground" : "text-foreground/60"
          )}
        >
         Overview
        </Link>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
      <DashBoardLinks components={components}/>
      </nav>
     </div>
     </div>
  )
}