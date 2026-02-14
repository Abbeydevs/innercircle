"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { joinWaitlist } from "@/actions/waitlist";

const formSchema = z.object({
  firstName: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phoneNumber: z.string().min(5, "Phone number is required"),
  attendedBefore: z.enum(["yes", "no"], {
    message: "Please select an option",
  }),
});

export function WaitlistForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
      phoneNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const result = await joinWaitlist(values);

    setIsLoading(false);

    if (result.success) {
      setIsSubmitted(true);
      form.reset();
    } else {
      form.setError("root", { message: result.error });
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-12 rounded-none focus-visible:ring-white/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-12 rounded-none focus-visible:ring-white/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-12 rounded-none focus-visible:ring-white/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="attendedBefore"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-none focus:ring-white/20">
                      <SelectValue
                        placeholder="Have you attended before?"
                        className="placeholder:text-white/40"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#0B0B0F] border-white/10 text-white rounded-none">
                    <SelectItem
                      value="yes"
                      className="focus:bg-white/10 focus:text-white"
                    >
                      Yes
                    </SelectItem>
                    <SelectItem
                      value="no"
                      className="focus:bg-white/10 focus:text-white"
                    >
                      No
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {form.formState.errors.root && (
            <p className="text-red-400 text-sm text-center">
              {form.formState.errors.root.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 mt-4 bg-white text-[#0B0B0F] hover:bg-white/90 font-medium uppercase tracking-wider rounded-none transition-all"
          >
            {isLoading ? "Joining..." : "Join the Waitlist"}
          </Button>
        </form>
      </Form>

      <AlertDialog open={isSubmitted} onOpenChange={setIsSubmitted}>
        <AlertDialogContent className="bg-[#0B0B0F] border border-white/20 rounded-lg sm:max-w-md p-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15)_0%,transparent_60%)] pointer-events-none" />

          <div className="relative z-10 p-8 space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-2xl md:text-3xl text-white font-bold text-center leading-tight w-full">
                You&apos;re on the list!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white/70 text-base text-center leading-relaxed">
                You&apos;re officially on the Inner Circle waitlist. March
                tickets will be released to you before the public.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="flex justify-center py-2">
              <div className="bg-[#E5C158]/10 border border-[#E5C158]/30 rounded-lg px-4 py-3">
                <p className="text-[#E5C158] font-medium text-sm text-center">
                  📱 Keep an eye on your WhatsApp & email
                </p>
              </div>
            </div>

            <AlertDialogFooter className="sm:justify-center mt-4">
              <AlertDialogAction className="w-full h-12  text-[#0B0B0F] hover:bg-slate-800  font-semibold uppercase tracking-wider rounded-lg transition-all shadow-lg">
                Got it
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
