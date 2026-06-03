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
import { Separator } from "@/components/ui/separator";
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
      toast.success(t("photoUpdated"));
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = form.handleSubmit((values) => {
    setOverrides(values);
    toast.success(t("saved"));
  });

  return (
    <section aria-labelledby="profile-heading" className="space-y-8">
      <div className="space-y-3">
        <p className="section-eyebrow">{t("eyebrow")}</p>
        <h1 id="profile-heading" className="heading-section">
          {t("title")}
        </h1>
        <p className="body-lead max-w-2xl">{t("subtitle")}</p>
      </div>

      <QueryState
        isLoading={userQuery.isLoading}
        isError={userQuery.isError}
        error={userQuery.error}
        onRetry={() => userQuery.refetch()}
      >
        {profile ? (
          <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <div className="surface-panel flex flex-col items-center gap-5 p-6 text-center">
              <Avatar className="size-28">
                <AvatarImage src={profile.avatarUrl} alt={profile.displayName} />
                <AvatarFallback className="text-2xl">
                  {profile.name.firstname[0]}
                  {profile.name.lastname[0]}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="font-heading text-xl">{profile.displayName}</p>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
              </div>
              <Separator className="w-full" />
              <div className="w-full space-y-2 text-left">
                <Label htmlFor="photo">{t("photo")}</Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  className="text-sm"
                  onChange={(e) => onPhotoChange(e.target.files?.[0] ?? null)}
                />
                <p className="text-xs text-muted-foreground">{t("uploadPhoto")}</p>
              </div>
            </div>

            <div className="surface-panel space-y-6 p-6 md:p-8">
              <h2 className="font-heading text-lg">{t("editTitle")}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstname">{t("firstname")}</Label>
                  <Input id="firstname" autoComplete="given-name" {...form.register("firstname")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname">{t("lastname")}</Label>
                  <Input id="lastname" autoComplete="family-name" {...form.register("lastname")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t("phone")}</Label>
                <Input id="phone" type="tel" autoComplete="tel" {...form.register("phone")} />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                {t("saveChanges")}
              </Button>
            </div>
          </form>
        ) : null}
      </QueryState>
    </section>
  );
}
