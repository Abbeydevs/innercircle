"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function loginWithCode(code: string) {
  try {
    const validCode = await prisma.adminCode.findUnique({
      where: { code: code },
    });

    if (!validCode) {
      return { success: false, error: "Invalid passcode." };
    }

    await prisma.adminCode.update({
      where: { id: validCode.id },
      data: { lastUsedAt: new Date() },
    });

    const token = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(JWT_SECRET);

    (await cookies()).set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "An error occurred during login." };
  }
}
