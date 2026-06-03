import type { User, UserProfile, UserProfileOverrides } from "@/types/user";

export function mergeUserProfile(
  user: User,
  overrides: UserProfileOverrides,
): UserProfile {
  const firstname = overrides.firstname ?? user.name.firstname;
  const lastname = overrides.lastname ?? user.name.lastname;

  return {
    ...user,
    email: overrides.email ?? user.email,
    phone: overrides.phone ?? user.phone,
    name: { firstname, lastname },
    displayName: `${firstname} ${lastname}`.trim(),
    avatarUrl:
      overrides.avatarDataUrl ??
      `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(firstname + lastname)}`,
  };
}
