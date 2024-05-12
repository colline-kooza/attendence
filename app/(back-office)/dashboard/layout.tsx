import DashBoardHead from '@/components/dashboard/DashBoardHead'
import authOptions from '@/lib/authOptions';
import { getCurrentUser } from '@/lib/authProvider'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { Children } from 'react'

interface RootLayoutProps {
    children: React.ReactNode
  }
  export default async function Layout({ children }:RootLayoutProps) {
    const session = await getServerSession(authOptions);
    if (!session) {
      redirect("/login");
    }

    return (
    <div>
      <div className={`${session  ? ' h-[10vh]  sticky top-0 z-20' : 'h-[0px]'}`}>
    <DashBoardHead/>
    </div>
    <div className={`${session ? 'lg:p-2 lg:mt-2' : 'mt-0'}`}>
    {children}
    </div>
    </div>
  )
}
