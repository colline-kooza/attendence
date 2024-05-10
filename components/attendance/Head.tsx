"use client"
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { getCurrentUser } from '@/lib/authProvider'
import { useSession } from 'next-auth/react';
// import { Button } from '../ui/button';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '../ui/dropdown-menu';
import AvatarPage from '../cards/Avatar';

export default function Head({ changeArrival ,arrival  }: any) {
  const { data: session, status } = useSession();
  const user = session?.user;
  const name = user?.name;

  const image = user?.image ||   'https://utfs.io/f/2c49867b-4d23-489c-b038-807f3d1d126e-2klm05.jpg'
  ;
  ;
  const initials = name ? name.slice(0, 2).toUpperCase() : 'N/A';

  return (
    <div className="flex items-center justify-between px-4 py-2 justify-center">
      <div>
       
       <AvatarPage/>
          </div>
      <div>
        <h2 className='font-bold lg:text-xl lg:block hidden'>{name}</h2>
      </div>
      <Tabs>
        <TabsList className="ml-auto">
          <TabsTrigger onClick={() => changeArrival(true)} value="all" className={`
          text-zinc-600 dark:text-zinc-200 ${arrival ? 'text-zinc-600 dark:text-zinc-200 bg-[#0c0a09]' : ''}
          `} >Check In</TabsTrigger>
          <TabsTrigger onClick={() => changeArrival(false)} value="unread" className="text-zinc-600 dark:text-zinc-200">Check Out</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
