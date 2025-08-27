// next-auth.d.ts
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?:string;
    user: DefaultSession["user"] & {
      id: string;
    };
  }
  interface User extends DefaultUser {
    id: string;
    name: string;
    email: string;
    accessToken: string; 
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    accessToken?:string;
  }
}
