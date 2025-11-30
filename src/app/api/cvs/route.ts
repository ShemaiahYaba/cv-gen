// src/app/api/cvs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cvController } from "@/controllers/cv.controller";
import { createCvSchema } from "@/lib/validations/cv.validation";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sortBy = searchParams.get("sortBy") as
      | "updated_at"
      | "created_at"
      | "title"
      | undefined;

    const cvs = await cvController.getUserCvs(sortBy);
    return NextResponse.json(cvs);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch CVs" },
      { status: 400 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = createCvSchema.parse(body);

    const cv = await cvController.createCv(input);
    return NextResponse.json(cv, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create CV" },
      { status: 400 }
    );
  }
}
