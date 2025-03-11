"use client";

import handleAPI from "@/apis/handleApi";
import { images } from "@/assets/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ResetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isChecked, setIsChecked] = useState(false);

  const [email, setEmail] = useState<any>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        await handleAPI(api, values, "put");
        setIsOpen(true);
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
                  Don&apos;t you have an account yet?&nbsp;
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
            <Button
              type="submit"
              onClick={() => {
                isChecked && setIsOpen(true);
              }}
              disabled={isLoading}
            >
              {!isChecked ? "Verify" : "Confim"}
            </Button>
          </form>
        </Form>
      </div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="w-1/5">
          <AlertDialogHeader className="text-center w-full flex">
            <div className="flex items-center justify-center rounded-full">
              <div className="flex items-center justify-center rounded-full bg-[#1311180D] w-24 h-24">
                <div className="flex items-center justify-center rounded-full bg-[#1311181A] w-20 h-20">
                  <div className="flex items-center justify-center bg-[#131118] rounded-full w-16 h-16">
                    <Image alt="tick" src={images.tick} />
                  </div>
                </div>
              </div>
            </div>
            <AlertDialogTitle className="mx-auto flex">
              Password Changed Successfully
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm mx-auto flex">
              Your password has been updated successfully
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="w-full">
              <Link href={"/login"}>Back to Login</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResetPasswordPage;
