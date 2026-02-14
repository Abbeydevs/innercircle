import { prisma } from "@/lib/prisma";
import { Albert_Sans } from "next/font/google";
import WaitlistClient from "./WaitlistClient";
import { logoutAdmin } from "@/actions/auth";
import { Button } from "@/components/ui/button";

const albert = Albert_Sans({ subsets: ["latin"] });

export default async function AdminDashboard() {
  const waitlistUsers = await prisma.waitlistUser.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main
      className={`min-h-screen bg-[#0B0B0F] text-white p-6 md:p-12 relative overflow-hidden ${albert.className}`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-200 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.12)_0%,rgba(139,92,246,0.04)_25%,transparent_70%)] blur-3xl" />

        <div className="absolute top-1/4 right-0 w-150 h-150 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.06)_0%,rgba(251,191,36,0.02)_40%,transparent_70%)] blur-2xl" />

        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_30%,transparent_60%)]" />
      </div>

      <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">
              Inner Circle Admin
            </h1>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <p className="text-white/70 text-sm md:text-base">
                <span className="font-bold text-white text-lg">
                  {waitlistUsers.length}
                </span>{" "}
                {waitlistUsers.length === 1 ? "person" : "people"} on the
                waitlist
              </p>
            </div>
          </div>

          <form action={logoutAdmin}>
            <Button
              type="submit"
              className="bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-white/30 rounded-none uppercase tracking-widest text-xs px-6 h-10 transition-all backdrop-blur-sm"
            >
              Logout
            </Button>
          </form>
        </div>

        <WaitlistClient data={waitlistUsers} />
      </div>
    </main>
  );
}
