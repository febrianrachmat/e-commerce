"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/api/auth";
import { useAuthStore } from "@/stores/auth-store";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "johnd", password: "m38rmF$" },
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (token) => {
      setSession({ token, userId: 1 });
      toast.success("Logged in");
      router.push("/profile");
    },
    onError: () => {
      toast.error("Login failed");
    },
  });

  return (
    <form
      className="max-w-sm space-y-4"
      onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
    >
      <p className="text-sm text-muted-foreground">{t("hint")}</p>
      <div className="space-y-2">
        <Label htmlFor="username">{t("username")}</Label>
        <Input id="username" autoComplete="username" {...form.register("username")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">{t("password")}</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          {...form.register("password")}
        />
      </div>
      <Button type="submit" disabled={mutation.isPending}>
        {t("loginTitle")}
      </Button>
    </form>
  );
}
