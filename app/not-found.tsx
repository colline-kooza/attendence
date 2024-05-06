import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <main>
    <div className="lg:mt-[10rem] mt-[8rem]">
        <div className="max-w-lg mx-auto space-y-3 text-center">
            <h3 className="text-indigo-600 font-semibold">
                404 Error
            </h3>
            <p className="text-[#e11d48]  text-4xl font-bold sm:text-5xl">
                Page not found
            </p>
            <p className="text-gray-600 dark:text-gray-500 ">
                Sorry, the page you are looking for could not be found or has been removed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/" className="block py-2 px-4 text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg">
                    Go back
                </Link>
                <Link href="/" className="block py-2 px-4 text-gray-700 hover:bg-gray-50 font-medium duration-150 active:bg-gray-100 border rounded-lg">
                    Contact support
                </Link>
            </div>
        </div>
    </div>
</main>
  )
}
