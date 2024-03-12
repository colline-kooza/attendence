"use client"
import { useState } from "react"
import { Icons } from "../Icons"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { StudentProps } from "@/types/types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { studentFormSchema } from "@/schema/schema"
import { useRouter } from "next/navigation"
import { saveData } from "@/actions/register"
import { Toast, ToastAction } from "../ui/toast"
import { useToast } from "../ui/use-toast"

export function CardsCreateAccount() {
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentProps>({
    resolver: zodResolver(studentFormSchema),
  });

  const router = useRouter();

  async function onSubmit(data: StudentProps) {
    // console.log(data); 

    try {
      setIsLoading(true);
      await saveData(data);
      setIsLoading(false); 
      toast({
        description: "Your have successfully registered.",
      })
      router.push("/dashboard");
    } catch (error) {
      setIsLoading(false);
      toast({
        description: "Ooops Something Went Wrong.",
      })
      console.log(error);
    }
    reset();
  }
  return (
   <form onSubmit={handleSubmit(onSubmit)}>
     <Card>
      <CardContent className="grid gap-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input {...register("name")} id="name" type="text" placeholder="john Doe" />
          {errors.name && (<p className='text-red-600 text-sm'>{errors.name.message}</p>)   }
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input {...register("email")} id="email" type="email" placeholder="m@example.com" />
          {errors.email && (<p className='text-red-600 text-sm'>{errors.email.message}</p>)   }
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input {...register("password")} id="password" type="password" />
          {errors.password && (<p className='text-red-600 text-sm'>{errors.password.message}</p>)   }
        </div>
      </CardContent>
      <CardFooter>
       {
        isLoading?(
          <Button variant="outline" type="submit" disabled={isLoading} className="w-full"> <Icons.spinner className="m-2 h-4 w-4 animate-spin" /> Create account</Button>
        ):(
          <Button type="submit" className="w-full">Create account</Button>
        )
       }
      </CardFooter>
    </Card>
   </form>
  )
}