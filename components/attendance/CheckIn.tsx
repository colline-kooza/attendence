"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { ScanLine } from 'lucide-react';
import { toast } from '../ui/use-toast';
import { date } from 'zod';
import { Icons } from '../Icons';

export default function CheckIn() {
  const [studentId, setStudentId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  setInterval(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, 1000);

  async function handleCheckIn() {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/check-in', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentId),
      });

      if (response.ok) {
        setIsLoading(false);
        const data = await response.json();
        if (data.message) {
          toast({
            description: data.message,
          });
        } else {
          toast({
            description: "Check In was Successfully",
          });
        }
      } else {
        setIsLoading(false);
        toast({
          description: "Something went wrong",
        });
      }
    } catch (error) {
      console.error('Check-in error:', error);
      setIsLoading(false);
      toast({
        description: "Something went wrong",
      });
    }
  };

  return (
    <div>
      <Card className="border-[#36b6fa] rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 font-bold text-2xl text-[#36b6fa] ">
          TODAY
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className='flex items-center justify-between '>
            <div className='flex flex-col gap-3'>
              <h1 className='font-bold lg:text-4xl text-3xl tracking-wide'>{currentTime}</h1>
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
                <Button variant="outline"  disabled={isLoading}  className='flex items-center lg:gap-4 gap-3 text-lg py-7 mt-9 w-full justify-center bg-[#36b6fa] font-bold '>
                 <Icons.spinner className="m-2 h-6 w-6 animate-spin" />  Check In
                </Button>
              ) : (
                <Button onClick={handleCheckIn} className='flex items-center lg:gap-4 gap-3 text-lg py-7 mt-9 w-full justify-center hover:bg-[#36b6fa] bg-[#36b6fa] font-bold'>
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
