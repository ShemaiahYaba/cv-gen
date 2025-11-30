// src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { authController } from "@/controllers/auth.controller";

export async function POST() {
  try {
    await authController.logout();
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Logout failed" },
      { status: 400 }
    );
  }
}
