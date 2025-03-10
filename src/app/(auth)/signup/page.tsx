"use client";

import handleAPI from "@/apis/handleApi";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/useAuthStore";

const SignupPage = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const { addAuth } = useAuthStore();

  const formSchema = z.object({
    firstname: z.string().min(1, {
      message: "First name is required.",
    }),
    lastname: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await handleAPI("/customer/register", values, "post");
      addAuth(res.data);
      toast.success("Signup successful");
      router.push("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="font-bold text-3xl">Create New Account</div>
      <div className="font-normal text-base text-[#A4A1AA] mb-8">
        Please enter details
      </div>
      <div className="w-3/4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-y-4 flex flex-col"
          >
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="robertfox@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="items-top flex space-x-2">
              <Checkbox
                id="term"
                onCheckedChange={() => setIsChecked(!isChecked)}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="hover:underline text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the Terms & Conditions
                </label>
              </div>
            </div>
            <Button type="submit" disabled={isLoading || !isChecked}>
              Signup
            </Button>
            <div className="text-sm text-center">
              Have you already created an account?&nbsp;
              <Link href={"/login"} className="font-semibold hover:underline">
                Login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;
