"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QueryState } from "@/components/common/query-state";
import { useUserQuery } from "@/hooks/queries/use-user-query";
import { mergeUserProfile } from "@/lib/profile/merge-profile";
import { useAuthStore } from "@/stores/auth-store";
import { useProfileStore } from "@/stores/profile-store";

const profileSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(3),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const t = useTranslations("profile");
  const session = useAuthStore((s) => s.session);
  const overrides = useProfileStore((s) => s.overrides);
  const setOverrides = useProfileStore((s) => s.setOverrides);
  const userQuery = useUserQuery(session?.userId ?? null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (!userQuery.data) return;
    const profile = mergeUserProfile(userQuery.data, overrides);
    form.reset({
      firstname: profile.name.firstname,
      lastname: profile.name.lastname,
      email: profile.email,
      phone: profile.phone,
    });
  }, [userQuery.data, overrides, form]);

  const profile =
    userQuery.data && mergeUserProfile(userQuery.data, overrides);

  const onPhotoChange = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setOverrides({ avatarDataUrl: dataUrl });
      toast.success("Photo updated");
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = form.handleSubmit((values) => {
    setOverrides(values);
    toast.success("Profile saved");
  });

  return (
    <QueryState
      isLoading={userQuery.isLoading}
      isError={userQuery.isError}
      error={userQuery.error}
      onRetry={() => userQuery.refetch()}
    >
      {profile ? (
        <form onSubmit={onSubmit} className="max-w-lg space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile.avatarUrl} alt={profile.displayName} />
              <AvatarFallback>
                {profile.name.firstname[0]}
                {profile.name.lastname[0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Label htmlFor="photo">{t("photo")}</Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={(e) => onPhotoChange(e.target.files?.[0] ?? null)}
              />
              <p className="text-xs text-muted-foreground">{t("uploadPhoto")}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstname">{t("firstname")}</Label>
              <Input id="firstname" {...form.register("firstname")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">{t("lastname")}</Label>
              <Input id="lastname" {...form.register("lastname")} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input id="email" type="email" {...form.register("email")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t("phone")}</Label>
            <Input id="phone" {...form.register("phone")} />
          </div>
          <Button type="submit">{t("editTitle")}</Button>
        </form>
      ) : null}
    </QueryState>
  );
}
