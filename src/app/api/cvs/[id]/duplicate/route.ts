// src/app/api/cvs/[id]/duplicate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cvController } from "@/controllers/cv.controller";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cv = await cvController.duplicateCv(params.id);
    return NextResponse.json(cv, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to duplicate CV" },
      { status: 400 }
    );
  }
}
