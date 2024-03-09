"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { ScanLine } from 'lucide-react'

export default function CheckOut() {
  const [studentId, setStudentId] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); 

  async function  handleCheckIn(){
    setIsLoading(true)
    console.log("btn clicked")
    const userId ="98845899489458"
    setIsLoading(true);

    // if (!studentId) {
    //   setIsLoading(false);
    //   return;
    // }

    try {
      const response = await fetch('http://localhost:3000/api/check-out',
      {
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userId),
      }
      ); 
   if(response.ok){
    setIsLoading(false)
    console.log(response)
   }
    } catch (error) {
      console.error('Check-in error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
    <Card className="border-[#e11d48] rounded-lg">
   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 font-bold text-2xl text-[#e11d48] ">
     TODAY
   </CardHeader>
   <CardContent className="flex flex-col gap-2">
  <div className='flex items-center justify-between '>
  <div className='flex flex-col gap-3'>
   <h1 className='font-bold lg:text-4xl text-3xl  tracking-wide'>05: 52: 00 </h1>
   <p className='text-sm font-medium text-muted-foreground tracking-wide'>Total Time Tracked</p>
  </div>   
   <div className='flex flex-col gap-3 items-center'>
     <h2 className='py-1 font-black px-2 bg-gray-800 rounded-lg text-[#36c9fa] text-lg'>02</h2>
     <h3 className='text-sm text-muted-foreground -tracking-tighter'>Gate No.</h3>
   </div>
  </div>
  <div>
  {
      isLoading ? (
        <Button className='flex items-center lg:gap-4 gap-3 text-lg py-7 mt-9 w-full justify-center bg-[#36b6fa] font-bold '>
        <ScanLine /> Loading
        </Button>
      ):(
        <Button onClick={()=>handleCheckIn()} className='flex items-center lg:gap-4 gap-3 text-lg py-7 mt-9 w-full justify-center bg-[#36b6fa] font-bold'>
        <ScanLine /> Check In
        </Button>
      )
     }
  </div>
   </CardContent>

 </Card>
</div>
  )
}
