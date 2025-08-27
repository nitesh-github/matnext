"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface UserResponse {
  users: User[];
  totalCount: number;
}

export async function fetchUsers(page: number): Promise<UserResponse> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    const res = await fetch(
      `${process.env.API_URL}/api/users?page=${page}&limit=10`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store", // important to always fetch fresh data
      }
    );

    if (!res.ok) throw new Error("Failed to fetch users");
    const data = await res.json();

    return data.data; // { users, totalCount }
  } catch (err) {
    console.error("Error fetching users:", err);
    return { users: [], totalCount: 0 };
  }
}
