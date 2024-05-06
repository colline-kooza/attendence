"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
// import { DialogProps } from "@radix-ui/react-alert-dialog"
import {
  CircleIcon,
  FileIcon,
  LaptopIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command"
import { AttendanceRecord } from "@prisma/client"
import getData from "@/utils/getData"
import Link from "next/link"


export function CommandMenu({ ...props }:any) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { setTheme } = useTheme()
  
  const [attendance, setAttendance] = React.useState<AttendanceRecord[]>([]);

  React.useEffect(() => {
    async function fetchAttendance() {
      try {
        const fetchedAttendance: AttendanceRecord[] = await getData("/check-in");
        setAttendance(fetchedAttendance);
      } catch (error) {
        console.error("Failed to fetch attendance:", error);
      }
    }

    fetchAttendance();
  }, []);
  const calculateTotalTime = () => {
    let overallTotalTime = 0;
    return attendance?.map(record => {
      let checkIn = "";
      let checkOut = "";
      let totalTime = "null";

      if (record.checkIn && record.status !== "absent") {
        checkIn = new Date(record.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      }
      if (record.checkOut && record.status !== "absent") {
        checkOut = new Date(record.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      }
      if (record.checkIn && record.checkOut && record.status !== "absent") {
        const totalTimeInMilliseconds = new Date(record.checkOut).getTime() - new Date(record.checkIn).getTime();
        totalTime = new Date(totalTimeInMilliseconds).toISOString().substr(11, 8);
        overallTotalTime += totalTimeInMilliseconds;
      }
     
      // Include status in the returned object
      const status = record.status === "absent" ? "Absent" : "present";
      
      return {
        date: new Date(record.checkIn).toLocaleDateString(),
        checkIn,
        checkOut,
        totalTime,
        status
      };
    });
  };
  const attendanceRecords = calculateTotalTime();
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search attendance dates...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Links">
            {/* {docsConfig.mainNav
              .filter((navitem:any) => !navitem.external)
              .map((navItem:any) => (
                <CommandItem
                  key={navItem.href}
                  value={navItem.title}
                  onSelect={() => {
                    runCommand(() => router.push(navItem.href as string))
                  }}
                >
                  <FileIcon className="mr-2 h-4 w-4" />
                  {navItem.title}
                </CommandItem>
              ))} */}


           {attendanceRecords?.map((record:any, index) => (
            <div className="mr-2 flex items-center gap-2 mt-2 ">
            <CircleIcon className="h-3 w-3" />
            <Link href="/dashboard/attendence">
            {record.date}
            </Link>
            </div>
            
            ))}
          </CommandGroup>
          {/* {docsConfig.sidebarNav.map((group:any) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((navItem:any) => (
                <CommandItem
                  key={navItem.href}
                  value={navItem.title}
                  onSelect={() => {
                    runCommand(() => router.push(navItem.href as string))
                  }}
                >
                  <div className="mr-2 flex h-4 w-4 items-center justify-center">
                    <CircleIcon className="h-3 w-3" />
                  </div>
                  {navItem.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))} */}
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <SunIcon className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <MoonIcon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <LaptopIcon className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}