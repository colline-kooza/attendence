import GalleryHead from "@/components/gallery/GalleryHead";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import getData from "@/utils/getData";

interface GalleryImage {
  id: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export default async function ParallaxScrollDemo() {
  const gallery: GalleryImage[]  = await getData("/gallery");

  // Extracting URLs from the images array in each gallery item
  const concatenatedImages = gallery.map(item => item.images[0]);
  // console.log(concatenatedImages)
  return( 
    <>
      <GalleryHead/>
      <ParallaxScroll gallery={gallery} images={concatenatedImages} />
    </>
  )
}
