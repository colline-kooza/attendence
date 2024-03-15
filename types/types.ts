import { string } from "zod"

export type StudentProps = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type LoginProps={
    email  :    String
    password  :  String 
}

  export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string;
    emailVerified: boolean;
  }
  