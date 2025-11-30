// src/hooks/use-auth.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { authController } from "@/controllers/auth.controller";
import type {
  LoginInput,
  RegisterInput,
  ChangePasswordInput,
} from "@/lib/validations/auth.validation";
import { useRouter } from "next/navigation";

export const authKeys = {
  currentUser: ["auth", "currentUser"] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.currentUser,
    queryFn: () => authController.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  return {
    ...useMutation({
      mutationFn: (input: RegisterInput) => authController.register(input),
      onSuccess: () => {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      },
    }),
    showSuccess,
  };
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (input: LoginInput) => authController.login(input),
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.currentUser, data.user);
      router.push("/dashboard");
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authController.logout(),
    onSuccess: () => {
      queryClient.clear();
      router.push("/auth/login");
    },
  });
}

export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: (email: string) => authController.requestPasswordReset(email),
  });
}

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (newPassword: string) =>
      authController.resetPassword(newPassword),
    onSuccess: () => {
      router.push("/auth/login");
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (input: ChangePasswordInput) =>
      authController.changePassword(input),
  });
}
