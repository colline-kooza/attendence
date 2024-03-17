"use client"
// Update the Page component
import { useState } from 'react';
import CheckIn from '@/components/attendance/CheckIn';
import CheckOut from '@/components/attendance/CheckOut';
import Head from '@/components/attendance/Head';
import TableTime from '@/components/attendance/TableTime';
import { useSession } from 'next-auth/react';
import AuthenticationPage from '@/app/login/page';

export default function Page() {
  const { data: session, status } = useSession();
  const [arrival, setArrival] = useState(true);

  function changeArrival(states:any) {
    setArrival(states);
  }

  return (
    <>
      {session ? (
        <div className='lg:max-w-[50%] max-w-[95%]  mx-auto min-h-screen py-4 flex flex-col gap-8'>
          <div className=''>
            <Head changeArrival={changeArrival} arrival={arrival} />
          </div>
          {arrival ? (
            <CheckIn changeArrival={changeArrival} />
          ) : (
            <CheckOut />
          )}
          <hr />
          <TableTime />
        </div>
      ) : (
        <AuthenticationPage />
      )}
    </>
  );
}

