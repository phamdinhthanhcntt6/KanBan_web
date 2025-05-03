"use client";

import handleAPI from "@/apis/handleApi";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import { useAuthStore } from "@/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const PersonalInformationTab = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { auth } = useAuthStore();

  const formSchema = z.object({
    firstname: z.string().min(1, {
      message: "First name is required.",
    }),
    lastname: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email(),
    contact: z.string().min(1, { message: "Contact is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      contact: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const api = `/customer/update/?id=${auth._id}`;

    const body = {
      ...auth,
      firstname: values.firstname,
      lastname: values.lastname,
      contact: values.contact,
    };

    try {
      await handleAPI(api, body, "put");
      setIsLoading(true);
      toast.success("Update successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    form.setValue("firstname", auth.firstname);
    form.setValue("lastname", auth.lastname);
    form.setValue("email", auth.email);
    form.setValue("contact", auth.contact);
  }, []);

  return (
    <>
      <div className="flex w-full items-center px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full gap-y-6 flex flex-col"
          >
            <div className="w-full justify-between flex">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
              </Avatar>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin" />} <Edit />
                Update profile
              </Button>
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      type="email"
                      placeholder="robertfox@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full gap-x-6">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className="w-full">
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
                  <FormItem className="w-full">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact</FormLabel>
                  <FormControl>
                    <Input placeholder="Contact" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </>
  );
};

export default PersonalInformationTab;
