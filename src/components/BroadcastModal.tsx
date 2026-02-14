"use client";

import { useState } from "react";
import { sendBroadcastEmail } from "@/actions/broadcast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Send } from "lucide-react";

export function BroadcastModal({ userCount }: { userCount: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    const result = await sendBroadcastEmail({ subject, message });

    setIsLoading(false);

    if (result.success) {
      setStatus({ type: "success", text: "Broadcast sent successfully!" });
      setTimeout(() => {
        setIsOpen(false);
        setSubject("");
        setMessage("");
        setStatus(null);
      }, 2000);
    } else {
      setStatus({ type: "error", text: result.error || "Failed to send." });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={userCount === 0}
          className="bg-[#E5C158] hover:bg-[#d4b350] text-[#0B0B0F] font-semibold rounded-none px-6 transition-all shadow-lg shadow-[#E5C158]/20 flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Send Broadcast
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-[#0B0B0F] border border-white/20 text-white rounded-lg sm:max-w-135 backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.1)_0%,transparent_50%)] pointer-events-none rounded-lg" />

        <div className="relative z-10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold uppercase tracking-tight">
              New Broadcast
            </DialogTitle>
            <DialogDescription className="text-white/60 mt-2">
              This email will be sent to all{" "}
              <span className="font-bold text-white">{userCount}</span> people
              on the waitlist.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSend} className="space-y-5 mt-6">
            <div className="space-y-2">
              <label className="text-xs text-white/70 uppercase tracking-widest font-medium">
                Subject Line
              </label>
              <Input
                required
                placeholder="e.g. March Tickets Are Live!"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 h-12 rounded-lg focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:border-white/30 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-white/70 uppercase tracking-widest font-medium">
                Message
              </label>
              <Textarea
                required
                placeholder="Type your email content here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 min-h-37.5 rounded-lg focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:border-white/30 transition-all resize-none"
              />
            </div>

            {status && (
              <div
                className={`p-3 rounded-lg text-sm font-medium ${
                  status.type === "success"
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}
              >
                {status.text}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || !subject || !message}
              className="w-full h-12 bg-white text-[#0B0B0F] hover:bg-white/90 font-semibold uppercase tracking-wider rounded-lg transition-all mt-2 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#0B0B0F]/30 border-t-[#0B0B0F] rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send to {userCount} {userCount === 1 ? "user" : "users"}
                </>
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
