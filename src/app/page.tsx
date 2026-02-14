import { WaitlistForm } from "@/components/WaitlistForm";
import { Albert_Sans } from "next/font/google";

const albert = Albert_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`min-h-screen bg-[#0B0B0F] relative flex items-center justify-center p-4 md:p-8 ${albert.className}`}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-150 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-white/10 via-[#0B0B0F]/0 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center text-center">
        <div className="space-y-6 mb-10 w-full">
          <span className="inline-block text-white/70 font-bold uppercase tracking-widest text-sm border border-white/20 px-4 py-1.5 rounded-full">
            February Edition Sold Out
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight">
            Join the Inner Circle
            <br />
            March Waitlist
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-sm mx-auto leading-relaxed">
            Inner Circle is a worship-driven gathering where music, presence and
            community meet.
          </p>
          <p className="text-white/60 text-sm max-w-xs mx-auto">
            Due to limited capacity, tickets are first released to the waitlist
            before the public.
          </p>
        </div>

        <div className="w-full text-left">
          <WaitlistForm />
        </div>
      </div>
    </main>
  );
}
