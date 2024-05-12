import { Icons } from "@/components/Icons";
import { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/Page-Header";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button";
import { Announcement } from "./Annoucements";
import { SparklesCore } from "./ui/sparkles";
import { getCurrentUser } from "@/lib/authProvider";


export default async function Hero() {
  
  return (
  <div>
   <div className="overflow-hidden w-full ">
     <div className="">
      <PageHeader className="mt-[4rem] lg:mt-[3rem]">
        <Announcement />
        <PageHeaderHeading className="lg:text-6xl text-4xl">Desishub Student Attendance</PageHeaderHeading>
        <div className="w-[40rem] h-8 relative">
      {/* Gradients */}
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
    </div>
<PageHeaderDescription>
   You can effortlessly track daily attendance, Explore our features and unleash the potential of modern attendance management in education.
</PageHeaderDescription>
        <PageActions>
          <Link href="/dashboard" className={cn(buttonVariants())}>
            Get Started
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href=""
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <Icons.gitHub className="mr-2 h-4 w-4" />
            GitHub
          </Link>
        </PageActions>
       
      </PageHeader>
    
      
    </div>
   </div>
  </div>
  );
}
