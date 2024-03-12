"use client"
import { useState } from 'react'
import CheckIn from '@/components/attendance/CheckIn'
import CheckOut from '@/components/attendance/CheckOut'
import Head from '@/components/attendance/Head'
import TableTime from '@/components/attendance/TableTime'

export default function Page() {
  const [arrival , setArrival]=useState(true)

  function changeArrival(states:any){
    setArrival(states)
  }
  return (
    <div className='lg:max-w-[50%] max-w-[95%]  mx-auto min-h-screen py-4 flex flex-col gap-8'>
   <div className=''>
   <Head changeArrival={changeArrival} arrival={arrival }/>
   </div>
    {
      arrival ? (
      <CheckIn />
      ):(
      <CheckOut/>
      )
    }
    <hr />
    <TableTime/>
    </div>
  )
}
