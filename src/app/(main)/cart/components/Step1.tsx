"use client";

import handleAPI from "@/apis/handleApi";
import ProgressCheckOut from "@/app/(main)/cart/components/ProgressCheckOut";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
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
import { AddressModel } from "@/models/AddressModel";
import useAddressStore from "@/store/useAddressStore";
import { useAuthStore } from "@/store/useAuthStore";
import useStepStore from "@/store/useStepStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bag, Edit } from "iconsax-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const Step1 = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [addresses, setAddresses] = useState<any[]>([]);

  const { next } = useStepStore();

  const { auth } = useAuthStore();

  const [addressSelected, setAddressSelected] = useState<AddressModel>();

  const { setAddressDefault, defaultAddress } = useAddressStore();

  useEffect(() => {
    getAddresses(auth?._id);
  }, []);

  useEffect(() => {
    checkDefaultAddress(addresses);
    const defaultAdd = addresses.filter((item) => item.isDefault);
    setAddressDefault(defaultAdd[0]);
  }, [addresses]);

  const formSchema = z.object({
    name: z.string().nonempty(),
    phone: z.string().nonempty(),
    address: z.string().nonempty(),
    pincode: z.string().nonempty(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      pincode: "",
    },
  });

  useEffect(() => {
    if (addressSelected) {
      form.setValue("name", addressSelected.name);
      form.setValue("phone", addressSelected.phone);
      form.setValue("address", addressSelected.address);
      form.setValue("pincode", addressSelected.pinCode);
    }
  }, [addressSelected, form]);

  const checkDefaultAddress = (addresses: any[]) => {
    const defaultAddress = addresses.find((item) => item.isDefault);
    return defaultAddress;
  };

  const updateAddress = async (id: string, values: any) => {
    try {
      const api = `/address/update?id=${id}`;
      await handleAPI(api, values, "put");
      getAddresses(auth._id);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      name: values.name,
      phone: values.phone,
      address: values.address,
      pinCode: values.pincode,
      createdBy: auth?._id,
      isDefault: checkDefaultAddress(addresses) ? false : true,
    };
    setIsLoading(true);

    try {
      if (addressSelected) {
        await updateAddress(addressSelected._id, data);
        setAddressSelected(undefined);
        form.reset();
        return;
      }
      const api = `/address/create`;
      await handleAPI(api, data, "post");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAddresses = async (uid: string) => {
    try {
      const api = `/address?uid=${uid}`;
      const res = await handleAPI(api);
      const data = res.data;
      setAddresses(data);

      const address = data.find((item: AddressModel) => item.isDefault);
      setAddressDefault(address);
    } catch (error) {
      console.log(error);
    }
  };

  const setDefaultAddress = async (
    id: string,
    createdBy: string,
    isDefault: boolean
  ) => {
    try {
      const api = `/address/set-default?uid=${createdBy}&id=${id}`;
      const data = {
        isDefault: isDefault,
      };
      await handleAPI(api, data, "post");
      getAddresses(createdBy);
    } catch (error) {
      console.log(error);
    }
  };

  const removeAddress = async (id: string) => {
    try {
      const api = `/address/remove?id=${id}`;
      await handleAPI(api, undefined, "delete");

      const index = addresses.findIndex((item) => item._id === id);
      index !== -1 && addresses.splice(index, 1);
      setAddresses([...addresses]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-12 flex flex-col gap-y-16">
      <ProgressCheckOut step={1} />
      <div className="flex flex-col gap-y-2">
        <div className="font-bold">Select a delivery address</div>
        <div className="text-gray-500 text-xs">
          Is the address you'd like to use displayed below? If so, click the
          corresponding "Deliver to this address" button. Or you can enter a new
          delivery address.
        </div>
        <Carousel className="pb-2 max-lg:px-6 ">
          <CarouselContent className="flex w-full p-4 gap-x-8">
            {addresses &&
              addresses.map((item: AddressModel) => (
                <CarouselItem
                  key={item._id}
                  className="basis-1/2 cursor-pointer bg-gray-100 rounded-lg p-4 gap-y-2 flex flex-col"
                >
                  <div className="flex flex-row justify-between w-full items-center">
                    <div className="font-semibold">{item.name}</div>
                    <Checkbox
                      key={`checkbox_${item._id}`}
                      checked={item.isDefault}
                      onCheckedChange={(val: boolean) => {
                        setDefaultAddress(item._id, auth._id, val);
                      }}
                    />
                  </div>
                  <div className="font-medium text-xs">{item.address}</div>
                  <div className="flex flex-row gap-x-4 w-full">
                    <Button
                      variant={"outline"}
                      onClick={() => {
                        setAddressSelected(item);
                        const formElement = document.getElementById("form");
                        if (formElement) {
                          formElement.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="text-xs bg-gray-300 w-1/2 flex flex-row"
                    >
                      <Edit />
                      Edit
                    </Button>
                    <Button
                      className="text-xs bg-red-400 w-1/2 flex flex-row"
                      onClick={() => {
                        removeAddress(item._id);
                      }}
                    >
                      <Bag /> Delete
                    </Button>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
        <Button
          className="w-1/2"
          onClick={() => {
            checkDefaultAddress(addresses)
              ? next()
              : toast.error("Please select a default address");
          }}
        >
          Delivery Here
        </Button>
        <div className="w-full h-[1px] bg-gray-200 my-4"></div>
        <div className="font-bold" id="form">
          Add a new address
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pin code</FormLabel>
                  <FormControl>
                    <Input placeholder="Pin code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-1/2" disabled={isLoading}>
              {addressSelected ? "Update" : "Add a new address"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Step1;
