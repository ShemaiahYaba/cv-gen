// src/controllers/cv.controller.ts
import { cvService } from "@/services/cv.service";
import { authService } from "@/services/auth.service";
import { CvModel } from "@/models/cv.model";
import type {
  CreateCvInput,
  UpdateCvInput,
} from "@/lib/validations/cv.validation";

export class CvController {
  async createCv(input: CreateCvInput) {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error("Not authenticated");

    const cv = await cvService.createCv(
      input.title,
      input.cvType,
      input.content || {},
      input.templateId
    );

    const cvModel = CvModel.fromDatabase(cv);
    return cvModel.toJSON();
  }

  async getUserCvs(sortBy?: "updated_at" | "created_at" | "title") {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error("Not authenticated");

    const cvs = await cvService.getUserCvs(sortBy);
    return cvs.map((cv) => CvModel.fromDatabase(cv).toJSON());
  }

  async getCv(id: string) {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error("Not authenticated");

    const cv = await cvService.getCv(id);
    const cvModel = CvModel.fromDatabase(cv);
    return cvModel.toJSON();
  }

  async updateCv(id: string, input: UpdateCvInput) {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error("Not authenticated");

    const cv = await cvService.updateCv(id, {
      title: input.title,
      content: input.content,
      is_favorite: input.isFavorite,
    });

    const cvModel = CvModel.fromDatabase(cv);
    return cvModel.toJSON();
  }

  async deleteCv(id: string) {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error("Not authenticated");

    await cvService.deleteCv(id);
  }

  async duplicateCv(id: string) {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error("Not authenticated");

    const cv = await cvService.duplicateCv(id);
    const cvModel = CvModel.fromDatabase(cv);
    return cvModel.toJSON();
  }

  async toggleFavorite(id: string, isFavorite: boolean) {
    const user = await authService.getCurrentUser();
    if (!user) throw new Error("Not authenticated");

    const cv = await cvService.toggleFavorite(id, isFavorite);
    const cvModel = CvModel.fromDatabase(cv);
    return cvModel.toJSON();
  }
}

export const cvController = new CvController();
