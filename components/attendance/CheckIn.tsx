"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { ScanLine } from 'lucide-react';
import { toast } from '../ui/use-toast';
import { Icons } from '../Icons';

export default function CheckIn({ changeArrival }: any) {
  const [studentId, setStudentId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [canToggleCheckIn, setCanToggleCheckIn] = useState(true);
  const [clientIp, setClientIp] = useState('');

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        setClientIp(data.ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    fetchIpAddress();
  }, []);

  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilTomorrow = tomorrow.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setCanToggleCheckIn(true);
    }, timeUntilTomorrow);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  async function handleCheckIn() {
    setIsLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    try {
      if (clientIp === '154.72.192.78') {
        const response = await fetch(`${baseUrl}/api/check-in`, {
          method: 'POST',
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
              description: 'Check In was Successful',
            });
            changeArrival(false);
            setCanToggleCheckIn(false);
          }
        } else {
          setIsLoading(false);
          toast({
            description: 'Something went wrong',
          });
        }
      } else {
        setIsLoading(false);
        toast({
          description: 'You are not connected to the job IP address. Cannot check in.',
        });
      }
    } catch (error) {
      console.error('Check-in error:', error);
      setIsLoading(false);
      toast({
        description: 'Something went wrong',
      });
    }
  }

  return (
    <div>
      <Card className='border-[#36b6fa] rounded-lg'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4 font-bold text-2xl text-[#36b6fa] '>
          TODAY
        </CardHeader>
        <CardContent className='flex flex-col gap-2'>
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
            {isLoading ? (
              <Button variant='outline' disabled={isLoading} className='flex items-center lg:gap-4 gap-3 text-lg py-7 mt-9 w-full justify-center bg-[#36b6fa] font-bold'>
                <Icons.spinner className='m-2 h-6 w-6 animate-spin' /> Checking...
              </Button>
            ) : (
              <Button onClick={handleCheckIn} disabled={!canToggleCheckIn} className='flex items-center lg:gap-4 gap-3 text-lg py-7 mt-9 w-full justify-center hover:bg-[#36b6fa] bg-[#36b6fa] font-bold'>
                <ScanLine /> Check In
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}











// "use client"
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader } from '../ui/card';
// import { Button } from '../ui/button';
// import { ScanLine } from 'lucide-react';
// import { toast } from '../ui/use-toast';
// import { Icons } from '../Icons';

// export default function CheckIn({ changeArrival }:any) {
//   const [studentId, setStudentId] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
//   const [canToggleCheckIn, setCanToggleCheckIn] = useState(true);

//   useEffect(() => {
//     const now = new Date();
//     const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
//     const timeUntilTomorrow = tomorrow.getTime() - now.getTime();

//     const timer = setTimeout(() => {
//       setCanToggleCheckIn(true);
//     }, timeUntilTomorrow);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, []);

//   setInterval(() => {
//     setCurrentTime(new Date().toLocaleTimeString());
//   }, 1000);

//   async function handleCheckIn() {
//     setIsLoading(true);
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

//     try {
//       const response = await fetch(`${baseUrl}/api/check-in`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(studentId),
//       });

//       if (response.ok) {
//         setIsLoading(false);
//         const data = await response.json();
//         if (data.message) {
//           toast({
//             description: data.message,
//           });
//           // window.location.reload()
//         } else {
//           toast({
//             description: 'Check In was Successful',
//           });
//           changeArrival(false);
//           setCanToggleCheckIn(false);
//         }
//       } else {
//         setIsLoading(false);
//         toast({
//           description: 'Something went wrong',
//         });
//       }
//     } catch (error) {
//       console.error('Check-in error:', error);
//       setIsLoading(false);
//       toast({
//         description: 'Something went wrong',
//       });
//     }
//   }

//   return (
//     <div>
//       <Card className='border-[#36b6fa] rounded-lg'>
//         <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4 font-bold text-2xl text-[#36b6fa] '>
//           TODAY
//         </CardHeader>
//         <CardContent className='flex flex-col gap-2'>
//           <div className='flex items-center justify-between '>
//             <div className='flex flex-col gap-3'>
//               <h1 className='font-bold lg:text-4xl text-3xl tracking-wide'>{currentTime}</h1>
//               <p className='text-sm font-medium text-muted-foreground tracking-wide'>Total Time Tracked</p>
//             </div>
//             <div className='flex flex-col gap-3 items-center'>
//               <h2 className='py-1 font-black px-2 bg-gray-800 rounded-lg text-[#36c9fa] text-lg'>02</h2>
//               <h3 className='text-sm text-muted-foreground -tracking-tighter'>Gate No.</h3>
//             </div>
//           </div>
//           <div>
//             {isLoading ? (
//               <Button variant='outline' disabled={isLoading} className='flex items-center lg:gap-4 gap-3 text-lg py-7 mt-9 w-full justify-center bg-[#36b6fa] font-bold '>
//                 <Icons.spinner className='m-2 h-6 w-6 animate-spin' /> Check In
//               </Button>
//             ) : (
//               <Button onClick={handleCheckIn} disabled={!canToggleCheckIn} className='flex items-center lg:gap-4 gap-3 text-lg py-7 mt-9 w-full justify-center hover:bg-[#36b6fa] bg-[#36b6fa] font-bold'>
//                 <ScanLine /> Check In
//               </Button>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
