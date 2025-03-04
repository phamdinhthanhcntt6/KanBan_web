"use client";

import handleAPI from "@/apis/handleApi";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addAuth } from "@/redux/reducers/authReducer";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const api = `/customer/login`;
      const res = await handleAPI(api, values, "post");
      dispatch(addAuth(res.data));
      setIsLoading(true);
      toast.success("Log in successfully!");
      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="font-bold text-3xl">Welcome</div>
      <div className="font--normal text-base text-[#A4A1AA] mb-8">
        Please login here
      </div>
      <div className="w-3/4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-y-4 flex flex-col"
          >
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
            <div className="flex justify-end text-xs">
              <Link href={"/reset-password"} className="hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" disabled={isLoading}>
              Login
            </Button>
            <div className="text-sm text-center">
              Don't you have an account yet?&nbsp;
              <Link href={"/signup"} className="font-semibold hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
