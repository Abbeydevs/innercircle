import { WaitlistForm } from "@/components/WaitlistForm";
import { Albert_Sans } from "next/font/google";

const albert = Albert_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`min-h-screen bg-[#0B0B0F] relative flex items-center justify-center p-6 md:p-10 overflow-hidden ${albert.className}`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-125 h-125 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.18)_0%,rgba(99,102,241,0.04)_50%,transparent_75%)] blur-2xl" />
        <div className="absolute -bottom-24 -right-24 w-100 h-100 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.12)_0%,transparent_65%)] blur-3xl" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-72 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-indigo-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-indigo-500/20 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="border border-white/[0.07] bg-white/2 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-[0_0_80px_rgba(99,102,241,0.08)]">
          <div className="flex flex-col md:flex-row md:gap-16 md:items-start">
            <div className="md:w-[45%] shrink-0 mb-10 md:mb-0 md:sticky md:top-0">
              <div className="mb-8 animate-[fadeIn_0.5s_ease_both]">
                <span className="inline-flex items-center gap-2 text-indigo-300/80 font-semibold uppercase tracking-[0.2em] text-[10px] border border-indigo-500/30 bg-indigo-500/5 px-4 py-2 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  May Edition Next
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-6 animate-[fadeInUp_0.6s_0.1s_ease_both_forwards]">
                Join the
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-br from-indigo-300 via-white to-violet-300">
                  Inner Circle
                </span>
                <br />
                May Waitlist
              </h1>

              <div className="w-12 h-px bg-indigo-500/50 mb-6 animate-[scaleX_0.5s_0.3s_ease_both_forwards] origin-left" />

              <p className="text-white/60 text-sm leading-relaxed mb-4 animate-[fadeInUp_0.6s_0.35s_ease_both_forwards]">
                A worship-driven gathering where music, presence and community
                meet.
              </p>
              <p className="text-white/35 text-xs leading-relaxed animate-[fadeInUp_0.6s_0.4s_ease_both_forwards]">
                Due to limited capacity, tickets are first released to the
                waitlist before the public.
              </p>

              <div className="hidden md:flex items-center gap-2 mt-12 animate-[fadeIn_0.8s_0.5s_ease_both_forwards]">
                {[false, false, true].map((active, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all ${
                      active ? "w-6 h-2 bg-indigo-400" : "w-2 h-2 bg-white/15"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1 animate-[fadeInUp_0.7s_0.25s_ease_both_forwards]">
              <p className="text-white/25 text-[10px] uppercase tracking-[0.25em] mb-5 font-medium">
                Your details
              </p>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
