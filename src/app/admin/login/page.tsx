"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithCode } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Albert_Sans } from "next/font/google";

const albert = Albert_Sans({ subsets: ["latin"] });

export default function AdminLogin() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await loginWithCode(code);

    if (result.success) {
      router.push("/admin");
    } else {
      setError(result.error || "Login failed");
      setIsLoading(false);
    }
  }

  return (
    <main
      className={`min-h-screen bg-[#0B0B0F] flex items-center justify-center p-4 ${albert.className}`}
    >
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white uppercase tracking-wider">
            Admin Access
          </h1>
          <p className="text-white/60 text-sm">
            Enter your secure passcode to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Enter passcode"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="bg-white/5 border-white/10 text-center text-white placeholder:text-white/40 h-12 rounded-none focus-visible:ring-white/20 text-lg tracking-widest"
            required
          />

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <Button
            type="submit"
            disabled={isLoading || !code}
            className="w-full h-12 bg-white text-[#0B0B0F] hover:bg-white/90 font-medium uppercase tracking-wider rounded-none transition-all"
          >
            {isLoading ? "Verifying..." : "Enter"}
          </Button>
        </form>
      </div>
    </main>
  );
}
