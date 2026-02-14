"use server";

import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function joinWaitlist(data: {
  firstName: string;
  email: string;
  phoneNumber: string;
  attendedBefore: "yes" | "no";
}) {
  try {
    const existingUser = await prisma.waitlistUser.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "This email is already on the waitlist.",
      };
    }

    await prisma.waitlistUser.create({
      data: {
        firstName: data.firstName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        attendedBefore: data.attendedBefore === "yes",
      },
    });

    await resend.emails.send({
      from: "Inner Circle <innercircle@thesoftwarehub.tech>",
      to: data.email,
      subject: "You're on the Inner Circle Waitlist",
      html: `
        <div style="font-family: Arial, sans-serif; color: #111; max-width: 600px;">
          <h2 style="text-transform: uppercase;">Hi ${data.firstName},</h2>
          <p style="font-size: 16px;">You're officially on the Inner Circle waitlist.</p>
          <p style="font-size: 16px;">March tickets will be released to you before the public.</p>
          <p style="font-size: 16px; color: #b89a42;"><strong>Keep an eye on your WhatsApp & email.</strong></p>
        </div>
      `,
    });

    if (process.env.RESEND_AUDIENCE_ID) {
      await resend.contacts.create({
        email: data.email,
        firstName: data.firstName,
        unsubscribed: false,
        audienceId: process.env.RESEND_AUDIENCE_ID,
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Waitlist Submission Error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
}
