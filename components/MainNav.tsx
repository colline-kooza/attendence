"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Icons } from "./Icons"


export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
    <img src="/dcsLogo.webp" alt="" className="h-12 w-20"/> 
        {/* <span className="hidden font-bold sm:inline-block">
         Attendance
        </span> */}
      </Link>
      <nav className="flex items-center gap-6 text-sm">
       

        <Link
          href="/announcements"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/announcements")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
       Announcements
        </Link>

        <Link
          href="/gallery"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/examples")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
        Gallery
        </Link>
{/* 
        <Link
          href="/view-list"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/view-list")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
      view-list
        </Link> */}
      </nav>
    </div>
  )
}