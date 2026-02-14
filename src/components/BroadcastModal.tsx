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
          className="bg-[#E5C158] hover:bg-[#c9a642] text-[#0B0B0F] font-bold rounded-none px-6"
        >
          Send Broadcast
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-[#0B0B0F] border border-white/10 text-white rounded-none sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="text-xl uppercase tracking-wider">
            New Broadcast
          </DialogTitle>
          <DialogDescription className="text-white/60">
            This email will be sent to all{" "}
            <strong className="text-white">{userCount}</strong> people on the
            waitlist.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSend} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm text-white/80 uppercase tracking-widest">
              Subject Line
            </label>
            <Input
              required
              placeholder="e.g. March Tickets Are Live!"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-12 rounded-none focus-visible:ring-white/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/80 uppercase tracking-widest">
              Message
            </label>
            <Textarea
              required
              placeholder="Type your email content here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-37.5 rounded-none focus-visible:ring-white/20"
            />
          </div>

          {status && (
            <p
              className={`text-sm ${status.type === "success" ? "text-green-400" : "text-red-400"}`}
            >
              {status.text}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading || !subject || !message}
            className="w-full h-12 bg-white text-[#0B0B0F] hover:bg-white/90 font-medium uppercase tracking-wider rounded-none transition-all mt-2"
          >
            {isLoading ? "Sending..." : `Send to ${userCount} users`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
