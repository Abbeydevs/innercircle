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

  const inputClass =
    "bg-white/[0.04] border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-indigo-500/60 focus-visible:border-indigo-500/40 transition-all duration-200 hover:border-white/20";

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
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
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
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
                    className={inputClass}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
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
                    <SelectTrigger className="bg-white/4 border-white/10 text-white h-12 rounded-xl focus:ring-1 focus:ring-indigo-500/60 focus:border-indigo-500/40 hover:border-white/20 transition-all duration-200 data-placeholder:text-white/30">
                      <SelectValue
                        placeholder="Have you attended before?"
                        className="text-white/30"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#13131A] border-white/10 text-white rounded-xl shadow-xl shadow-black/40">
                    <SelectItem
                      value="yes"
                      className="focus:bg-indigo-500/10 focus:text-white rounded-lg"
                    >
                      Yes
                    </SelectItem>
                    <SelectItem
                      value="no"
                      className="focus:bg-indigo-500/10 focus:text-white rounded-lg"
                    >
                      No
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />

          {form.formState.errors.root && (
            <p className="text-red-400 text-xs text-center">
              {form.formState.errors.root.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-13 mt-2 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-[0_4px_32px_rgba(99,102,241,0.3)] hover:shadow-[0_4px_40px_rgba(99,102,241,0.5)] disabled:opacity-50"
          >
            {isLoading ? "Joining..." : "Join the Waitlist"}
          </Button>
        </form>
      </Form>

      <AlertDialog open={isSubmitted} onOpenChange={setIsSubmitted}>
        <AlertDialogContent className="bg-[#0D0D14] border border-white/10 rounded-2xl sm:max-w-md p-0 overflow-hidden shadow-[0_0_80px_rgba(99,102,241,0.15)]">
          <div className="w-full h-1 bg-linear-to-r from-indigo-600 via-violet-500 to-indigo-600" />

          <div className="p-8 space-y-5">
            <div className="flex justify-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-indigo-400"
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

            <AlertDialogHeader className="space-y-2">
              <AlertDialogTitle className="text-2xl text-white font-bold text-center tracking-tight w-full">
                You&apos;re on the list!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white/55 text-sm text-center leading-relaxed">
                You&apos;re officially on the Inner Circle waitlist. May tickets
                will be released to you before the public.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="flex justify-center">
              <div className="bg-amber-400/8 border border-amber-400/20 rounded-xl px-4 py-3">
                <p className="text-amber-300/80 font-medium text-xs text-center tracking-wide">
                  📱 Keep an eye on your WhatsApp & email
                </p>
              </div>
            </div>

            <AlertDialogFooter className="sm:justify-center mt-2">
              <AlertDialogAction className="w-full h-11 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(99,102,241,0.3)]">
                Got it
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
