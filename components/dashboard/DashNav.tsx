"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { DashBoardLinks } from "./DashBoardLinks"
import { CommandMenu } from "../CommandMenu"
// import { Icons } from "./Icons"


export function DashNav() {
  const pathname = usePathname()
  const components: { title: string; href: string;}[] = [
    {
      title: "Attendance",
      href: "/dashboard/attendence",
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