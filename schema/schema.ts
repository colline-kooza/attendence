import { z } from "zod";

export const studentFormSchema=z.object({
   name:z.string({
    required_error:"name is required"
   }).min(3,{
    message:"Name must have a minimum of 3 characters"
   }),
   email:z.string({
    required_error:"Email is required"
   }).min(3,{
    message:"Email must have a minimum of 3 characters"
   }),
   password:z.string({
    required_error:"Password is required"
   }).min(3,{
    message:"Password must have a minimum of 3 characters"
   }),
})
export const LoginFormSchema=z.object({
 
   email:z.string({
    required_error:"Email is required"
   }).min(3,{
    message:"Email must have a minimum of 3 characters"
   }),
   password:z.string({
    required_error:"Password is required"
   }).min(3,{
    message:"Password must have a minimum of 3 characters"
   }),
})