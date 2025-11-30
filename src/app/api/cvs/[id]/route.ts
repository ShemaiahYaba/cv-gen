// src/app/api/cvs/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cvController } from "@/controllers/cv.controller";
import { updateCvSchema } from "@/lib/validations/cv.validation";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cv = await cvController.getCv(params.id);
    return NextResponse.json(cv);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch CV" },
      { status: 400 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const input = updateCvSchema.parse(body);

    const cv = await cvController.updateCv(params.id, input);
    return NextResponse.json(cv);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update CV" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await cvController.deleteCv(params.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete CV" },
      { status: 400 }
    );
  }
}
