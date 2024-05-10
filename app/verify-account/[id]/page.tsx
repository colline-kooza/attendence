import VerifyAccount from '@/components/VerifyAccount'
import getData from '@/utils/getData';
import React from 'react'

export default async function page({params:{id}}:any) {
  // console.log(id)
  const student = await getData(`students/${id}`);
  // console.log(students)
  // const verifiedStudent = students.find((student: any) => student. verifiactionToken === verificationId);
  return (
    <div className=''>
    
      <VerifyAccount student={student} verificationId={id}/>
    </div>
  )
}
