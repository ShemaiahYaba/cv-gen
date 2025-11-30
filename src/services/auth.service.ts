// src/services/auth.service.ts
import { createBrowserClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";

export class AuthService {
  private getClient() {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  // In src/services/auth.service.ts
  async signUp(email: string, password: string, fullName: string) {
    const supabase = this.getClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      console.error("Signup error:", error);
      throw error;
    }

    // Ensure we always return an object with a data property
    return { data: data || null, error: null };
  }

  async signIn(email: string, password: string) {
    const supabase = this.getClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }

  async signOut() {
    const supabase = this.getClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async resetPasswordRequest(email: string) {
    const supabase = this.getClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) throw error;
  }

  async updatePassword(newPassword: string) {
    const supabase = this.getClient();
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
  }

  async getCurrentUser(): Promise<User | null> {
    const supabase = this.getClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }

  async getSession() {
    const supabase = this.getClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  }

  onAuthStateChange(callback: (user: User | null) => void) {
    const supabase = this.getClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }
}

export const authService = new AuthService();
