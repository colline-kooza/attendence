import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { ScanLine } from 'lucide-react';
import { toast } from '../ui/use-toast';
import { Icons } from '../Icons';

type Coordinate = {
  lat: number;
  lon: number;
};

export default function CheckOut({ changeArrival }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [canToggleCheckOut, setCanToggleCheckOut] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilTomorrow = tomorrow.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setCanToggleCheckOut(true);
    }, timeUntilTomorrow);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  async function handleCheckOut() {
    setIsLoading(true);
    const userId = "98845899489458"; 
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;

        const workplaceLatitude = 0.3437781; 
        const workplaceLongitude = 32.6538716; 
        const distanceThreshold = 0.001;

        const distance = calculateDistance(
          userLatitude,
          userLongitude,
          workplaceLatitude,
          workplaceLongitude
        );

        if (distance <= distanceThreshold) {
          const response = await fetch(`${baseUrl}/api/check-out`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ studentId: userId }),
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
                description: 'Check Out was Successful',
              });
              changeArrival(true); // Update UI or state accordingly
              setCanToggleCheckOut(false);
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
            description: 'You need to be at the exact place to check out.',
          });
        }
      });
    } catch (error) {
      console.error('Check-out error:', error);
      setIsLoading(false);
      toast({
        description: 'Something went wrong',
      });
    }
  }

  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const earthRadiusKm = 6371;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;

    return distance;
  }

  function toRadians(degrees: number) {
    return degrees * (Math.PI / 180);
  }

  return (
    <div>
      <Card className="border-[#e11d48] rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 font-bold text-2xl text-[#e11d48] ">
          TODAY
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className='flex items-center justify-between '>
            <div className='flex flex-col gap-3'>
              <h1 className='font-bold lg:text-4xl text-3xl  tracking-wide text-[#e11d48]'>{currentTime}</h1>
              <p className='text-sm font-medium text-muted-foreground tracking-wide '>Total Time Tracked</p>
            </div>
            <div className='flex flex-col gap-3 items-center'>
              <h2 className='py-1 font-black px-2 bg-gray-800 rounded-lg text-[#36c9fa] text-lg'>04</h2>
              <h3 className='text-sm text-muted-foreground -tracking-tighter'>Gate No.</h3>
            </div>
          </div>
          <div>
            {isLoading ? (
              <Button variant="outline" disabled={isLoading} className='flex items-center lg:gap-4 gap-3 text-lg py-7 mt-9 w-full justify-center bg-[#e11d48] font-bold '>
                <Icons.spinner className="m-2 h-6 w-6 animate-spin" /> Check Out
              </Button>
            ) : (
              <Button onClick={handleCheckOut} disabled={!canToggleCheckOut} className='flex items-center lg:gap-4 gap-3 text-lg py-7 mt-9 w-full justify-center hover:bg-[#e11d48] bg-[#e11d48] font-bold'>
                <ScanLine /> Check Out
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


// "use client"
// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader } from '../ui/card';
// import { Button } from '../ui/button';
// import { ScanLine } from 'lucide-react';
// import { Icons } from '../Icons';
// import { toast } from '../ui/use-toast';

// export default function CheckOut() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

//   setInterval(() => {
//     setCurrentTime(new Date().toLocaleTimeString());
//   }, 1000);

//   async function handleCheckOut() {
//     setIsLoading(true);
//     const userId = "98845899489458";
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

//     try {
//       const response = await fetch(`${baseUrl}/api/check-out`, {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ studentId: userId }),
//       });

//       if (response.ok) {
//         setIsLoading(false);
//         const data = await response.json();
//         if (data.message) {
//           // Student has already checked out or not checked in today
//           toast({
//             description: data.message,
//           });

//         } else {
//           toast({
//             description: "Check Out was Successfully",
//           });
//         }
//       } else {
//         setIsLoading(false);
//         toast({
//           description: "Something went wrong",
//         });
//       }
//     } catch (error) {
//       console.error('Check-out error:', error);
//       setIsLoading(false);
//       toast({
//         description: "Something went wrong",
//       });
//     }
//   };

//   return (
//     <div>
//       <Card className="border-[#e11d48] rounded-lg">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 font-bold text-2xl text-[#e11d48] ">
//           TODAY
//         </CardHeader>
//         <CardContent className="flex flex-col gap-2">
//           <div className='flex items-center justify-between '>
//             <div className='flex flex-col gap-3'>
//               <h1 className='font-bold lg:text-4xl text-3xl  tracking-wide text-[#e11d48]'>{currentTime}</h1>
//               <p className='text-sm font-medium text-muted-foreground tracking-wide '>Total Time Tracked</p>
//             </div>
//             <div className='flex flex-col gap-3 items-center'>
//               <h2 className='py-1 font-black px-2 bg-gray-800 rounded-lg text-[#36c9fa] text-lg'>04</h2>
//               <h3 className='text-sm text-muted-foreground -tracking-tighter'>Gate No.</h3>
//             </div>
//           </div>
//           <div>
//             {isLoading ? (
//               <Button variant="outline" disabled={isLoading} className='flex items-center lg:gap-4 gap-3 text-lg py-7 mt-9 w-full justify-center bg-[#e11d48] font-bold '>
//                 <Icons.spinner className="m-2 h-6 w-6 animate-spin" /> Check Out
//               </Button>
//             ) : (
//               <Button onClick={handleCheckOut} className='flex items-center lg:gap-4 gap-3 text-lg py-7 mt-9 w-full justify-center hover:bg-[#e11d48] bg-[#e11d48] font-bold'>
//                 <ScanLine /> Check Out
//               </Button>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
