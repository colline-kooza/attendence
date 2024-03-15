
"use client"
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AvatarPage() {
    const { data: session, status } = useSession();
    const user = session?.user;
    const name = user?.name;
    const email = user?.email;
  
    const image = user?.image ||   'https://utfs.io/f/2c49867b-4d23-489c-b038-807f3d1d126e-2klm05.jpg'
    ;
    ;
    const initials = name ? name.slice(0, 2).toUpperCase() : 'N/A';
  
    return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
        <Avatar>
          <AvatarImage className='object-cover' src={image} alt="@shadcn" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium leading-none'>{name}</p>
                <p className='text-xs leading-none text-muted-foreground'>
                  {email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem >
                <a href="/"> Go To  Home</a>
           
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='cursor-pointer'
              onSelect={(event) => {
                event.preventDefault();
                signOut({
                  callbackUrl:"/login",
                });
              }}
            >
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
}
