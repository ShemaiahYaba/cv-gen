// src/services/cv.service.ts
import { createClient } from "@/lib/supabase/client";
import type { Cv } from "@/db/schema";
import type { CvType } from "@/models/cv.model";

export class CvService {
  private getClient() {
    return createClient();
  }

  async createCv(
    title: string,
    cvType: CvType,
    content: any,
    templateId?: string
  ): Promise<Cv> {
    const supabase = this.getClient();
    const { data, error } = await supabase
      .from("cvs")
      .insert({
        title,
        cv_type: cvType,
        content,
        template_id: templateId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserCvs(
    sortBy: "updated_at" | "created_at" | "title" = "updated_at",
    ascending: boolean = false
  ): Promise<Cv[]> {
    const supabase = this.getClient();
    const { data, error } = await supabase
      .from("cvs")
      .select("*")
      .is("deleted_at", null) // Only fetch non-deleted CVs
      .order(sortBy, { ascending });

    if (error) throw error;
    return data || [];
  }

  async getCv(id: string): Promise<Cv> {
    const supabase = this.getClient();
    // Update last_accessed_at
    await supabase
      .from("cvs")
      .update({ last_accessed_at: new Date().toISOString() })
      .eq("id", id)
      .is("deleted_at", null);

    const { data, error } = await supabase
      .from("cvs")
      .select("*")
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (error) throw error;
    return data;
  }

  async updateCv(
    id: string,
    updates: {
      title?: string;
      content?: any;
      is_favorite?: boolean;
    }
  ): Promise<Cv> {
    const supabase = this.getClient();
    const { data, error } = await supabase
      .from("cvs")
      .update(updates)
      .eq("id", id)
      .is("deleted_at", null)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteCv(id: string): Promise<void> {
    const supabase = this.getClient();
    // Soft delete - set deleted_at timestamp
    const { error } = await supabase
      .from("cvs")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id)
      .is("deleted_at", null);

    if (error) throw error;
  }

  async duplicateCv(id: string): Promise<Cv> {
    const supabase = this.getClient();
    // Get original CV
    const { data: original, error: fetchError } = await supabase
      .from("cvs")
      .select("*")
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (fetchError) throw fetchError;

    // Create duplicate
    const { data, error } = await supabase
      .from("cvs")
      .insert({
        title: `${original.title} (Copy)`,
        cv_type: original.cv_type,
        content: original.content,
        template_id: original.template_id,
        is_favorite: false,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async toggleFavorite(id: string, isFavorite: boolean): Promise<Cv> {
    const supabase = this.getClient();
    const { data, error } = await supabase
      .from("cvs")
      .update({ is_favorite: isFavorite })
      .eq("id", id)
      .is("deleted_at", null)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export const cvService = new CvService();
