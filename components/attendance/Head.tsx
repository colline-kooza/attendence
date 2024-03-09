import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function Head({ changeArrival ,arrival  }: any) {
  return (
    <div className="flex items-center justify-between px-4 py-2 justify-center">
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <h2 className='font-bold lg:block hidden'>WELCOME ! KOOOZA .</h2>
      </div>
      <Tabs>
        <TabsList className="ml-auto">
          <TabsTrigger onClick={() => changeArrival(true)} value="all" className={`
          text-zinc-600 dark:text-zinc-200 ${arrival ? 'text-zinc-600 dark:text-zinc-200 bg-gray-900' : ''}
          `} >Check In</TabsTrigger>
          <TabsTrigger onClick={() => changeArrival(false)} value="unread" className="text-zinc-600 dark:text-zinc-200">Check Out</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
