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
  //   <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
  //   <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
  //     Aceternity
  //   </h1>
   
  // </div>
   <div className="overflow-hidden">
     <div className="container relative  ">
      <PageHeader>
        <Announcement />
        <PageHeaderHeading className="lg:text-6xl text-4xl">Desishub Student Attendance</PageHeaderHeading>
        <div className="w-[40rem] h-8 relative">
      {/* Gradients */}
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

      {/* Core component */}
      {/* <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1} 
        particleDensity={1200}
        className="w-full h-full"
        particleColor="#FFFFFF"
      /> */}

      {/* Radial Gradient to prevent sharp edges */}
      {/* <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div> */}
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
  );
}
