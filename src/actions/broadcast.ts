"use server";

import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBroadcastEmail(data: {
  subject: string;
  message: string;
}) {
  try {
    const users = await prisma.waitlistUser.findMany({
      select: { email: true, firstName: true },
    });

    if (users.length === 0) {
      return {
        success: false,
        error: "There is no one on the waitlist to email.",
      };
    }

    const chunkSize = 100;

    for (let i = 0; i < users.length; i += chunkSize) {
      const chunk = users.slice(i, i + chunkSize);

      const emailsToSend = chunk.map((user) => ({
        from: "Inner Circle <onboarding@resend.dev>",
        to: user.email,
        subject: data.subject,
        html: `
          <div style="font-family: Arial, sans-serif; color: #111; max-width: 600px; line-height: 1.6;">
            <p>Hi ${user.firstName},</p>
            <div>${data.message.replace(/\n/g, "<br/>")}</div>
          </div>
        `,
      }));

      await resend.batch.send(emailsToSend);
    }

    return { success: true };
  } catch (error) {
    console.error("Broadcast Error:", error);
    return {
      success: false,
      error: "Failed to send broadcast. Please try again.",
    };
  }
}
