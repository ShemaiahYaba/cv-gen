// src/controllers/profile.controller.ts
import { profileService } from "@/services/profile.service";
import { authService } from "@/services/auth.service";
import { UserModel } from "@/models/user.model";
import type { UpdateProfileInput } from "@/lib/validations/auth.validation";

export class ProfileController {
  async getProfile() {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error("Not authenticated");

    const profile = await profileService.getProfile(user.id);
    const userModel = UserModel.fromSupabaseUser(user, profile);

    return userModel.toJSON();
  }

  async updateProfile(input: UpdateProfileInput) {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error("Not authenticated");

    const profile = await profileService.updateProfile(user.id, {
      full_name: input.fullName,
    });

    const userModel = UserModel.fromSupabaseUser(user, profile);
    return userModel.toJSON();
  }
}

export const profileController = new ProfileController();
