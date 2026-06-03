"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import { getUserById } from "@/lib/api/users";

export function useUserQuery(userId: number | null) {
  return useQuery({
    queryKey: queryKeys.users.detail(userId ?? 0),
    queryFn: () => getUserById(userId!),
    enabled: userId != null,
  });
}
