// src/controllers/auth.controller.ts
import { authService } from "@/services/auth.service";
import { profileService } from "@/services/profile.service";
import { UserModel } from "@/models/user.model";
import type {
  RegisterInput,
  LoginInput,
  ChangePasswordInput,
} from "@/lib/validations/auth.validation";

export class AuthController {
  async register(input: RegisterInput) {
    const response = await authService.signUp(
      input.email,
      input.password,
      input.fullName
    );

    // Handle the case where the response might be undefined or null
    if (!response) {
      throw new Error("No response received from auth service");
    }

    // Handle the case where data might be undefined
    if (!response.data) {
      throw new Error("No data received from auth service");
    }

    return {
      user: response.data.user || null,
      needsVerification: !response.data.user?.email_confirmed_at,
    };
  }

  async login(input: LoginInput) {
    const { user, session } = await authService.signIn(
      input.email,
      input.password
    );

    if (!user) {
      throw new Error("Authentication failed");
    }

    const profile = await profileService.getProfile(user.id);
    const userModel = UserModel.fromSupabaseUser(user, profile);

    return {
      user: userModel.toJSON(),
      session,
    };
  }

  async logout() {
    await authService.signOut();
  }

  async requestPasswordReset(email: string) {
    await authService.resetPasswordRequest(email);
  }

  async resetPassword(newPassword: string) {
    await authService.updatePassword(newPassword);
  }

  async changePassword(input: ChangePasswordInput) {
    // Verify current password by attempting to sign in
    const user = await authService.getCurrentUser();
    if (!user?.email) {
      throw new Error("User not authenticated");
    }

    await authService.signIn(user.email, input.currentPassword);
    await authService.updatePassword(input.newPassword);
  }

  async getCurrentUser() {
    const user = await authService.getCurrentUser();
    if (!user) return null;

    const profile = await profileService.getProfile(user.id);
    const userModel = UserModel.fromSupabaseUser(user, profile);

    return userModel.toJSON();
  }
}

export const authController = new AuthController();
