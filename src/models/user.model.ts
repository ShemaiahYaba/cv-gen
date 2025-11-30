// src/domain/models/user.model.ts
import { User as SupabaseUser } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatarSeed: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserModel {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly fullName: string,
    public readonly avatarSeed: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static fromSupabaseUser(user: SupabaseUser, profile: any): UserModel {
    return new UserModel(
      user.id,
      user.email!,
      profile.fullName,
      profile.avatarSeed,
      new Date(profile.createdAt),
      new Date(profile.updatedAt)
    );
  }

  getAvatarUrl(): string {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${this.avatarSeed}&backgroundColor=random`;
  }

  updateProfile(updates: { fullName?: string }): UserModel {
    return new UserModel(
      this.id,
      this.email,
      updates.fullName ?? this.fullName,
      this.avatarSeed,
      this.createdAt,
      new Date()
    );
  }

  toJSON(): UserProfile {
    return {
      id: this.id,
      email: this.email,
      fullName: this.fullName,
      avatarSeed: this.avatarSeed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
