import AuthenticationPage from '@/app/login/page'
import { PageActions } from '@/components/Page-Header'
import { ThemeCustomizer } from '@/components/ThemeCustomer'
import { ThemesTabs } from '@/components/ThemeTabs'
import { getCurrentUser } from '@/lib/authProvider'
import React from 'react'

export default async function page() {
  const session = await getCurrentUser()
  console.log(session)
  return (
    <>
    {
      session ? (
         <div className='min-h-screen w-full'>
         <PageActions className='flex flex-col'>
            <ThemeCustomizer />
            <ThemesTabs />
          </PageActions>
      </div>
      ) :<AuthenticationPage/>
    }
    </>
   
  )
}
