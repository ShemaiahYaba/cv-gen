// src/domain/models/cv.model.ts
export type CvType = "ats" | "custom" | "skill-based";

export interface CvData {
  id: string;
  userId: string;
  title: string;
  cvType: CvType;
  templateId: string | null;
  content: any;
  isFavorite: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  lastAccessedAt: Date;
}

export class CvModel {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly title: string,
    public readonly cvType: CvType,
    public readonly templateId: string | null,
    public readonly content: any,
    public readonly isFavorite: boolean,
    public readonly deletedAt: Date | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly lastAccessedAt: Date
  ) {}

  static fromDatabase(data: any): CvModel {
    return new CvModel(
      data.id,
      data.userId,
      data.title,
      data.cvType as CvType,
      data.templateId,
      data.content,
      data.isFavorite,
      data.deletedAt ? new Date(data.deletedAt) : null,
      new Date(data.createdAt),
      new Date(data.updatedAt),
      new Date(data.lastAccessedAt)
    );
  }

  isDeleted(): boolean {
    return this.deletedAt !== null;
  }

  softDelete(): CvModel {
    return new CvModel(
      this.id,
      this.userId,
      this.title,
      this.cvType,
      this.templateId,
      this.content,
      this.isFavorite,
      new Date(),
      this.createdAt,
      new Date(),
      this.lastAccessedAt
    );
  }

  restore(): CvModel {
    return new CvModel(
      this.id,
      this.userId,
      this.title,
      this.cvType,
      this.templateId,
      this.content,
      this.isFavorite,
      null,
      this.createdAt,
      new Date(),
      this.lastAccessedAt
    );
  }

  updateContent(content: any): CvModel {
    return new CvModel(
      this.id,
      this.userId,
      this.title,
      this.cvType,
      this.templateId,
      content,
      this.isFavorite,
      this.deletedAt,
      this.createdAt,
      new Date(),
      this.lastAccessedAt
    );
  }

  updateTitle(title: string): CvModel {
    return new CvModel(
      this.id,
      this.userId,
      title,
      this.cvType,
      this.templateId,
      this.content,
      this.isFavorite,
      this.deletedAt,
      this.createdAt,
      new Date(),
      this.lastAccessedAt
    );
  }

  toggleFavorite(): CvModel {
    return new CvModel(
      this.id,
      this.userId,
      this.title,
      this.cvType,
      this.templateId,
      this.content,
      !this.isFavorite,
      this.deletedAt,
      this.createdAt,
      new Date(),
      this.lastAccessedAt
    );
  }

  markAsAccessed(): CvModel {
    return new CvModel(
      this.id,
      this.userId,
      this.title,
      this.cvType,
      this.templateId,
      this.content,
      this.isFavorite,
      this.deletedAt,
      this.createdAt,
      this.updatedAt,
      new Date()
    );
  }

  toJSON(): CvData {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      cvType: this.cvType,
      templateId: this.templateId,
      content: this.content,
      isFavorite: this.isFavorite,
      deletedAt: this.deletedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      lastAccessedAt: this.lastAccessedAt,
    };
  }
}
