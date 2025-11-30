// src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authController } from "@/controllers/auth.controller";
import { registerSchema } from "@/lib/validations/auth.validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input = registerSchema.parse(body);

    const result = await authController.register(input);

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Registration failed" },
      { status: 400 }
    );
  }
}
