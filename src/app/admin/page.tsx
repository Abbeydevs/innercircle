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
      className={`min-h-screen bg-[#0B0B0F] text-white p-6 md:p-12 ${albert.className}`}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-wider">
              Inner Circle Admin
            </h1>
            <p className="text-white/60 mt-1">
              {waitlistUsers.length}{" "}
              {waitlistUsers.length === 1 ? "person" : "people"} on the
              waitlist.
            </p>
          </div>
        </div>

        <form action={logoutAdmin}>
          <Button
            type="submit"
            variant="outline"
            className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white rounded-none uppercase tracking-widest text-xs px-6"
          >
            Logout
          </Button>
        </form>

        <WaitlistClient data={waitlistUsers} />
      </div>
    </main>
  );
}
