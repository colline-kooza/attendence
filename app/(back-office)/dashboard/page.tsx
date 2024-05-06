import AuthenticationPage from '@/app/login/page'
import { PageActions } from '@/components/Page-Header'
import { ThemeCustomizer } from '@/components/ThemeCustomer'
import { ThemesTabs } from '@/components/ThemeTabs'
import MainCards from '@/components/cards/MainCards'
import { getCurrentUser } from '@/lib/authProvider'
import React from 'react'

export default async function page() {
  return (
    <>
       <div className='min-h-screen w-full py-5'>
        <MainCards/>
      </div>
    </>
   
  )
}
