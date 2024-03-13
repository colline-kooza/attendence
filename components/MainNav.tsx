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
    {/* <img src="/dcsLogo.webp" alt="" className="h-12 w-20"/>  */}
        <span className="hidden font-bold sm:inline-block">
         Desishub
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/resources"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/gallery" ? "text-foreground" : "text-foreground/60"
          )}
        >
         Resources
        </Link>

        <Link
          href="/themes"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/themes")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
       Announcements
        </Link>

        <Link
          href="/examples"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/examples")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
        Gallery
        </Link>
      </nav>
    </div>
  )
}