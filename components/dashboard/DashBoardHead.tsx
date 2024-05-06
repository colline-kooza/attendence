"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { MainNav } from "../MainNav"
import { MobileNav } from "../MobileNav"
import { CommandMenu } from "../CommandMenu"
import { buttonVariants } from "../ui/button"
import { Icons } from "../Icons"
import { ModeToggle } from "../ModeToggle"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DashNav } from "./DashNav"
import DashBoardSide from "./DashBoardSide"
import { DashBoardLinks } from "./DashBoardLinks"
import { BellDot } from "lucide-react"
import { useSession } from "next-auth/react"
import AvatarPage from "../cards/Avatar"


export default function DashBoardHead() {
  const { data: session, status } = useSession();
  // console.log(session)
  const user = session?.user;
  const image = user?.image || 'https://utfs.io/f/2c49867b-4d23-489c-b038-807f3d1d126e-2klm05.jpg'
  ;
  const name =user?.name
  const initials = name ? name.slice(0, 2).toUpperCase() :""; 

    const components: { title: string; href: string;}[] = [
        // {
        //   title: "Attendance",
        //   href: "/dashboard/attendence",
        // }
      ]
   
  return (
   <>
   {
    session ? (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur h-[9vh] lg:h-[15vh] supports-[backdrop-filter]:bg-background/60 mt-8 ">
      <div className="container flex h-14 max-w-screen-2xl items-center mb-4 ">
        <DashNav />
        <MobileNav />
        <div className="flex flex-1 justify-end space-x-2 md:justify-end">
       
          <nav className="flex items-center">
            <Link
              href=""
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <BellDot className="h-5 w-5" />
              </div>
            </Link>
            <ModeToggle />
            <AvatarPage/>
          </nav>
        </div>
      </div>
    </header>
    ):""
   }
   </>
  )
}
