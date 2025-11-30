// src/services/profile.service.ts
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/db/schema";

export class ProfileService {
  private getClient() {
    return createClient();
  }

  async getProfile(userId: string): Promise<Profile> {
    const supabase = this.getClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  }

  async updateProfile(
    userId: string,
    updates: { full_name?: string }
  ): Promise<Profile> {
    const supabase = this.getClient();
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export const profileService = new ProfileService();
