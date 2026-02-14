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

    if (result.success) {
      setIsSubmitted(true);
    } else {
      form.setError("root", { message: result.error });
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pt-8">
        <p className="text-2xl md:text-3xl text-white font-medium">
          You&apos;re officially on the Inner Circle waitlist.
        </p>
        <p className="text-white/80 text-lg">
          March tickets will be released to you before the public.
        </p>
        <p className="text-[#E5C158] font-medium tracking-wide">
          Keep an eye on your WhatsApp & email.
        </p>
      </div>
    );
  }

  return (
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
  );
}
