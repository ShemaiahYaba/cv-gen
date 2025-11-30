// src/hooks/use-cv.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cvController } from "@/controllers/cv.controller";
import type {
  CreateCvInput,
  UpdateCvInput,
} from "@/lib/validations/cv.validation";
import { useRouter } from "next/navigation";

export const cvKeys = {
  all: ["cvs"] as const,
  lists: () => [...cvKeys.all, "list"] as const,
  list: (sortBy?: string) => [...cvKeys.lists(), sortBy] as const,
  details: () => [...cvKeys.all, "detail"] as const,
  detail: (id: string) => [...cvKeys.details(), id] as const,
};

export function useUserCvs(sortBy?: "updated_at" | "created_at" | "title") {
  return useQuery({
    queryKey: cvKeys.list(sortBy),
    queryFn: () => cvController.getUserCvs(sortBy),
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useCv(id: string) {
  return useQuery({
    queryKey: cvKeys.detail(id),
    queryFn: () => cvController.getCv(id),
    staleTime: 2 * 60 * 1000, // 2 minutes
    enabled: !!id,
  });
}

export function useCreateCv() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (input: CreateCvInput) => cvController.createCv(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: cvKeys.lists() });

      // Navigate to the appropriate editor
      const editorPath = `/cv/edit/${data.cvType}?id=${data.id}`;
      router.push(editorPath);
    },
  });
}

export function useUpdateCv() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateCvInput }) =>
      cvController.updateCv(id, input),
    onSuccess: (data, variables) => {
      // Optimistically update the cache
      queryClient.setQueryData(cvKeys.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: cvKeys.lists() });
    },
  });
}

export function useDeleteCv() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cvController.deleteCv(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: cvKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: cvKeys.lists() });
    },
  });
}

export function useDuplicateCv() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cvController.duplicateCv(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cvKeys.lists() });
    },
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isFavorite }: { id: string; isFavorite: boolean }) =>
      cvController.toggleFavorite(id, isFavorite),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(cvKeys.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: cvKeys.lists() });
    },
  });
}

// Auto-save hook
export function useAutoSaveCv(id: string, debounceMs: number = 2000) {
  const updateCv = useUpdateCv();
  const queryClient = useQueryClient();

  const autoSave = (content: any) => {
    // Optimistically update cache immediately
    queryClient.setQueryData(cvKeys.detail(id), (old: any) => {
      if (!old) return old;
      return { ...old, content, updatedAt: new Date() };
    });

    // Debounced server update
    updateCv.mutate({ id, input: { content } });
  };

  return {
    autoSave,
    isSaving: updateCv.isPending,
    lastSaved: updateCv.isSuccess ? new Date() : null,
  };
}
