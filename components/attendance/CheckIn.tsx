"use client"
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
export default function CheckIn({ changeArrival }: any) {
  const [studentId, setStudentId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [canToggleCheckIn, setCanToggleCheckIn] = useState(true);

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

  // async function handleCheckIn() {
  //   setIsLoading(true);
  //   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  //   try {
  //     navigator.geolocation.getCurrentPosition(async (position) => {
  //       const userLatitude = position.coords.latitude;
  //       const userLongitude = position.coords.longitude;

  //       const workplaceLatitude = 0.3437781;
  //       const workplaceLongitude = 32.6538716;
  //       const distanceThreshold = 0.001; 

  //       const distance = calculateDistance(
  //         userLatitude,
  //         userLongitude,
  //         workplaceLatitude,
  //         workplaceLongitude
  //       );

  //       if (distance <= distanceThreshold) {
  //         const response = await fetch(`${baseUrl}/api/check-in`, {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify(studentId),
  //         });

  //         if (response.ok) {
  //           setIsLoading(false);
  //           const data = await response.json();
  //           if (data.message) {
  //             toast({
  //               description: data.message,
  //             });
  //           } else {
  //             toast({
  //               description: 'Check In was Successful',
  //             });
  //             changeArrival(false);
  //             setCanToggleCheckIn(false);
  //           }
  //         } else {
  //           setIsLoading(false);
  //           toast({
  //             description: 'Something went wrong',
  //           });
  //         }
  //       } else {
  //         setIsLoading(false);
  //         toast({
  //           description: 'You need to be at the exact place to check in.',
  //         });
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Check-in error:', error);
  //     setIsLoading(false);
  //     toast({
  //       description: 'Something went wrong',
  //     });
  //   }
  // }

  function calculateDistance(lat1:any, lon1:any, lat2:any, lon2:any) {
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

  function toRadians(degrees:any) {
    return degrees * (Math.PI / 180);
  }
  async function handleCheckIn() {
    setIsLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;
  
        const rangeCoordinates = [
          { lat: 0.3463026, lon: 32.6466738 },
          { lat: 0.3437781, lon: 32.6538716 },
          // { lat: 0.3398983, lon: 32.6390378 }
        ];
  
        const isInRange = checkInRange(userLatitude, userLongitude, rangeCoordinates);
  
        if (isInRange) {
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
            description: 'You need to be within the specified range to check in.',
          });
        }
      });
    } catch (error) {
      console.error('Check-in error:', error);
      setIsLoading(false);
      toast({
        description: 'Something went wrong',
      });
    }
  }
  
  function checkInRange(userLat:any, userLon:any, rangeCoordinates:any) {
    const distanceThreshold = 1.5; 
  
    for (const coord of rangeCoordinates) {
      const distance = calculateDistance(userLat, userLon, coord.lat, coord.lon);
      if (distance <= distanceThreshold) {
        return true;
      }
    }
    return false;
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
