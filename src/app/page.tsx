import { WaitlistForm } from "@/components/WaitlistForm";
import { Albert_Sans } from "next/font/google";

const albert = Albert_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`min-h-screen bg-[#0B0B0F] relative flex items-center justify-center p-4 md:p-8 overflow-hidden ${albert.className}`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-200 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15)_0%,rgba(139,92,246,0.05)_25%,transparent_70%)] blur-3xl" />

        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-150 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.08)_0%,rgba(251,191,36,0.02)_40%,transparent_70%)] blur-2xl" />

        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_30%,transparent_60%)]" />

        <div className="absolute top-1/3 left-0 w-96 h-96 bg-[radial-gradient(ellipse_at_left,rgba(139,92,246,0.06)_0%,transparent_60%)] blur-3xl" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_right,rgba(139,92,246,0.06)_0%,transparent_60%)] blur-3xl" />
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

      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center text-center">
        <div className="space-y-3 mb-10 w-full">
          <span className="inline-block text-white/70 font-bold uppercase tracking-widest text-sm border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm bg-white/5">
            February Edition Sold Out
          </span>
          <h1 className="text-5xl font-extrabold text-white tracking-tighter">
            Join the Inner Circle March Waitlist
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
