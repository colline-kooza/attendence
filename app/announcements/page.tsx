import AnnouncementDisplay from '@/components/Announcements/AnnouncementDisplay'
import { mails } from '@/components/Announcements/Data'
// import { useMail } from '@/components/Announcements/Use'
import React from 'react'
import AuthenticationPage from '../login/page'
import { getCurrentUser } from '@/lib/authProvider'

export default async function page() {
  const session = await getCurrentUser()
  console.log(session)
    // const [mail] = useMail()
    const id = "6c84fb90-12c4-11e1-840d-7b25c5ee775a"
  return (
    <>
   {
     session ? (
       <div className='container p-4 lg:w-[70%]'>
    <AnnouncementDisplay
    mail={mails.find((item) => item.id === id) || null}
    />
   </div>
     ) : <AuthenticationPage/>
   }
    </>
  
  )
}
