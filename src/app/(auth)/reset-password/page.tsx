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
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

const ResetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isChecked, setIsChecked] = useState(false);

  const [email, setEmail] = useState<any>("");

  const router = useRouter();

  console.log(email);

  const dispatch = useDispatch();

  const formSchema = z.object(
    isChecked
      ? {
          password: z.string().min(6, {
            message: "Password must be at least 6 characters.",
          }),
        }
      : {
          email: z.string().email(),
        }
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isChecked
      ? {
          password: "",
        }
      : {
          email: "",
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (isChecked) {
        const api = `customer/reset-password?email=${email}`;
        const res = handleAPI(api, values, "put");
        toast.success("Updated account");
        router.push("/login");
      } else {
        const api = `/customer/check-account`;
        await handleAPI(api, values, "post");
        values.email && setEmail(values.email);
        setIsChecked(true);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex gap-x-4 items-center mb-8">
        {isChecked && (
          <ArrowLeft size={24} onClick={() => setIsChecked(false)} />
        )}
        <div className="font-bold text-3xl">Reset password</div>
      </div>
      <div className="w-3/4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-y-4 flex flex-col"
          >
            {isChecked ? (
              <>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
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
            )}
            {!isChecked && (
              <>
                <div className="text-sm text-center">
                  Don't you have an account yet?&nbsp;
                  <Link
                    href={"/signup"}
                    className="font-semibold hover:underline"
                  >
                    Sign up
                  </Link>
                </div>
                <div className="text-sm text-center">
                  Have you already created an account?&nbsp;
                  <Link
                    href={"/login"}
                    className="font-semibold hover:underline"
                  >
                    Login
                  </Link>
                </div>
              </>
            )}
            <Button type="submit" disabled={isLoading}>
              Confirm
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
