// src/hooks/use-profile.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileController } from "@/controllers/profile.controller";
import type { UpdateProfileInput } from "@/lib/validations/auth.validation";

export const profileKeys = {
  profile: ["profile"] as const,
};

export function useProfile() {
  return useQuery({
    queryKey: profileKeys.profile,
    queryFn: () => profileController.getProfile(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateProfileInput) =>
      profileController.updateProfile(input),
    onSuccess: (data) => {
      queryClient.setQueryData(profileKeys.profile, data);
    },
  });
}
