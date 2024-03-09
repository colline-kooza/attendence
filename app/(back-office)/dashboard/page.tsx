import { PageActions } from '@/components/Page-Header'
import { ThemeCustomizer } from '@/components/ThemeCustomer'
import { ThemesTabs } from '@/components/ThemeTabs'
import React from 'react'

export default function page() {
  return (
    <div className='min-h-screen w-full'>
         <PageActions className='flex flex-col'>
            <ThemeCustomizer />
            <ThemesTabs />
          </PageActions>
      </div>
  )
}
