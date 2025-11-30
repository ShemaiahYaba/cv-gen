// src/components/dashboard/create-cv-modal.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCvSchema,
  type CreateCvInput,
} from "@/lib/validations/cv.validation";
import { useCreateCv } from "@/hooks/use-cv";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";

interface CreateCvModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCvModal({ open, onOpenChange }: CreateCvModalProps) {
  const createCv = useCreateCv();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreateCvInput>({
    resolver: zodResolver(createCvSchema),
    defaultValues: {
      cvType: "ats",
    },
  });

  const onSubmit = (data: CreateCvInput) => {
    createCv.mutate(data, {
      onSuccess: () => {
        reset();
        onOpenChange(false);
      },
    });
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New CV</DialogTitle>
          <DialogDescription>
            Choose a title and type for your new CV
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">CV Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Software Engineer Resume"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>CV Type *</Label>
            <RadioGroup
              value={watch("cvType")}
              onValueChange={(value) => setValue("cvType", value as any)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ats" id="ats" />
                <Label htmlFor="ats" className="font-normal cursor-pointer">
                  ATS Format - Optimized for applicant tracking systems
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom" className="font-normal cursor-pointer">
                  Custom Format - Full creative control
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="skill-based" id="skill-based" />
                <Label
                  htmlFor="skill-based"
                  className="font-normal cursor-pointer"
                >
                  Skill-Based - Highlight skills over experience
                </Label>
              </div>
            </RadioGroup>
            {errors.cvType && (
              <p className="text-sm text-destructive">
                {errors.cvType.message}
              </p>
            )}
          </div>

          {createCv.error && (
            <p className="text-sm text-destructive">
              {createCv.error instanceof Error
                ? createCv.error.message
                : "Failed to create CV"}
            </p>
          )}

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={createCv.isPending}>
              {createCv.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create CV
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
