import { apiClient } from "@/lib/api/client";
import type { User } from "@/types/user";

export async function getUserById(id: number) {
  return apiClient<User>(`/users/${id}`);
}

export async function getUsers() {
  return apiClient<User[]>("/users");
}
