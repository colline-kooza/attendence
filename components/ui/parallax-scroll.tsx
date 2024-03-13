"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { toast } from "./use-toast";
import { usePathname, useSearchParams } from "next/navigation";


export const ParallaxScroll = ({
  images,
  className,
  gallery 
}: {
  images: any[];
  className?: string;
  gallery: { id: string; images: string[] }[]; 

}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const searchParams = useSearchParams()
 
  const search = searchParams.get('admin')
  console.log(search)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [fullViewIndex, setFullViewIndex] = useState<number | null>(null);
  // console.log(fullViewIndex);
 
  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  const deleteImage = async (index: number) => {
    if (index < 0 || index >= images.length) {
      console.error('Invalid index:', index);
      return;
    }
  
    const imageUrlToDelete = images[index];
  
    if (!imageUrlToDelete) {
      console.error('Image not found for index:', index);
      return;
    }
  
    let imageIdToDelete = null;
  
    for (const galleryItem of gallery) {
      if (galleryItem.images.includes(imageUrlToDelete)) {
        imageIdToDelete = galleryItem.id;
        break;
      }
    }
  
    if (!imageIdToDelete) {
      console.error('Image ID not found for URL:', imageUrlToDelete);
      return;
    }
  
    setFullViewIndex(null);
  
    try {
      const confirmed = window.confirm('Are you sure you want to delete this image?');
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
      if (confirmed) {
        const response = await fetch(`${baseUrl}/api/gallery/${imageIdToDelete}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          // console.log('Image deleted successfully');
          toast({
            description: "Deleted successfully",
          })
          window.location.reload()
        } else {
          console.error('Failed to delete image');
          toast({
            description: "Failed to delete image",
          })
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
};


  return (
    <div
      className={cn(
        "h-[40rem] items-start overflow-y-auto w-full ",
        className
      )}
      ref={gridRef}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start  max-w-5xl mx-auto gap-10 pb-20 px-10"
        ref={gridRef}
      >
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst }}
              key={"grid-1" + idx}
              className="relative"
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => setFullViewIndex(idx)}
            >
              <Image
                src={el}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
              {hoverIndex === idx && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-40 transition-opacity duration-300 hover:opacity-100">
                   {
                   search  =="1010" && (
                    <button className="text-white mx-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={() => deleteImage(idx)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                   )}
                  <button
                    className="text-white mx-2"
                    onClick={() => setFullViewIndex(idx)}
                  >
                    View
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <motion.div
              style={{ y: translateSecond }}
              key={"grid-2" + idx}
              className="relative"
              onMouseEnter={() => setHoverIndex(idx + third)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => setFullViewIndex(idx + third)}
            >
              <Image
                src={el}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
              {hoverIndex === idx + third && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-40 transition-opacity duration-300 hover:opacity-100">
                  {/* <Image
                    src={fullViewIndex}
                    className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                    height="400"
                    width="400"
                    alt="thumbnail"
                  /> */}
                  {
                  search  =="1010" && (
                    <button className="text-white mx-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={() => deleteImage(idx + third)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                   )}
                  <button
                    className="text-white mx-2"
                    onClick={() => setFullViewIndex(idx)}
                  >
                    View
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="grid lg:block hidden  gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div
              style={{ y: translateThird }}
              key={"grid-2" + idx}
              className="relative"
              onMouseEnter={() => setHoverIndex(idx + 2 * third)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => setFullViewIndex(idx + 2 * third)}
            >
              <div>
                <Image
                  src={el}
                  className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-3 !p-3"
                  height="400"
                  width="400"
                  alt="thumbnail"
                />
              </div>
              {hoverIndex === idx + 2 * third && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-40 transition-opacity duration-300 hover:opacity-100">
                  {
                 search  =="1010" && (
                    <button className="text-white mx-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={() => deleteImage(idx + 2 * third)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                   )}
                  <button
                    className="text-white mx-2"
                    onClick={() => setFullViewIndex(idx)}
                  >
                    View
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      {fullViewIndex !== null && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80">
          <div className="relative">
            <Image
              src={images[fullViewIndex]}
              className="max-w-screen-lg max-h-screen"
              alt="full-view"
              width={280}
              height={40}
            />
            <button
              className="absolute top-0 right-0 m-4 text-white"
              onClick={() => setFullViewIndex(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
