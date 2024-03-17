import VerifyAccount from '@/components/VerifyAccount'
import React from 'react'

export default async function page({params:{id}}:any) {
  return (
    <div className=''>
    
      <VerifyAccount verificationId={id}/>
    </div>
  )
}
