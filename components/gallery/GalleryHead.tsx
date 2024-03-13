import React from 'react'
import { PresetSave } from './PreSave'

export default function GalleryHead() {
  return (
    <div className='lg:mx-[10rem] mb-4'>
        <div className=" h-full flex">
        <div className="container flex  items-center justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <h2 className="lg:text-xl text-lg font-semibold">Gallery</h2>
          <div className="ml-auto flex w-full space-x-2 justify-end">
            <PresetSave />
          
          </div>
        </div>
        </div>

    </div>
  )
}
