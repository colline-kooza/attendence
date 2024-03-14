"use client"
import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import Image from "next/image";
import { toast } from "../ui/use-toast";
import { Toast } from "../ui/toast";
import { useRouter } from "next/navigation";

export function PresetSave() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading , setLoading ]=useState(false)
 const router =useRouter()
  const handleImageUpload = (uploadedImages: { url: string; name: string }[]) => {
    const newImageUrls = [...imageUrls, ...uploadedImages.map((image) => image.url)];
    setImageUrls(newImageUrls);
    alert('Upload Completed');
  };

  const handleImageRemove = (index: number) => {
    const updatedImageUrls = [...imageUrls];
    updatedImageUrls.splice(index, 1);
    setImageUrls(updatedImageUrls);
  };

  const handleSave = async () => {
    setLoading(true)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    try {
      if (imageUrls.length > 0) {
        const response = await fetch(`${baseUrl}/api/gallery`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrls }),
        });
        if (response.ok) {
          toast({
            description: "upload Success",
          });
          router.push("/gallery")
          setLoading(false)
        } else {
          toast({
            description: "Some thing wrong Happened",
          });
          setLoading(false)
        }
      } else {
        toast({
          description: "Images Not Found",
        });
        setLoading(false)
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving images");
      setLoading(false)
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Upload</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Save Images</DialogTitle>
          <DialogDescription>
            This is to inform you that images that are of low standards, uneducative, will be deleted after upload.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {imageUrls.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {imageUrls.map((imageUrl, index) => (
                <div key={index} className="relative">
                  <Image src={imageUrl} alt="gallery image" objectFit="cover" className="rounded-lg w-[40%]" width={30} height={30}/>
                  <button
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <UploadButton
              endpoint="galleryImages"
              onClientUploadComplete={handleImageUpload}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          )}
        </div>
        <DialogFooter>
         {
          loading ? 
          <Button variant="outline"  disabled={loading} onClick={handleSave}>Saving</Button>
          :
          <Button onClick={handleSave}>Save</Button>
         }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
