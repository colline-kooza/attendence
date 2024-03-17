import DashBoardHead from '@/components/dashboard/DashBoardHead'
import { getCurrentUser } from '@/lib/authProvider'
import React, { Children } from 'react'

interface RootLayoutProps {
    children: React.ReactNode
  }
  export default async function Layout({ children }:RootLayoutProps) {
    const session = await getCurrentUser()

    return (
    <div>
      <div className={`${session  ? ' h-[10vh]  sticky top-0 z-20' : 'h-[0px]'}`}>
    <DashBoardHead/>
    </div>
    <div className={`${session ? 'p-4 lg:mt-5' : 'mt-0'}`}>
    {children}
    </div>
    </div>
  )
}
