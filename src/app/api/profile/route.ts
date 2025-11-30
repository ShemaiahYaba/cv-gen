// src/app/api/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { profileController } from "@/controllers/profile.controller";
import { updateProfileSchema } from "@/lib/validations/auth.validation";

export async function GET() {
  try {
    const profile = await profileController.getProfile();
    return NextResponse.json(profile);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch profile" },
      { status: 400 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const input = updateProfileSchema.parse(body);

    const profile = await profileController.updateProfile(input);
    return NextResponse.json(profile);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update profile" },
      { status: 400 }
    );
  }
}
