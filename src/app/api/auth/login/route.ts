// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authController } from "@/controllers/auth.controller";
import { loginSchema } from "@/lib/validations/auth.validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = loginSchema.parse(body);

    const result = await authController.login(input);

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Login failed" },
      { status: 401 }
    );
  }
}
