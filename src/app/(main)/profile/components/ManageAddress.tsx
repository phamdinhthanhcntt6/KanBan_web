"use client";

import handleAPI from "@/apis/handleApi";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AddressModel } from "@/models/AddressModel";
import { useAuthStore } from "@/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Add, Bag, Call, Edit } from "iconsax-react";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().nonempty(),
  phone: z.string().nonempty(),
  address: z.string().nonempty(),
  pincode: z.string().nonempty(),
});

const ManageAddressTab = () => {
  const { auth } = useAuthStore();
  const [addresses, setAddresses] = useState<AddressModel[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<AddressModel | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      pincode: "",
    },
  });

  const fetchAddresses = async () => {
    try {
      const res = await handleAPI(`/address?uid=${auth._id}`);
      setAddresses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleOpenAdd = () => {
    setSelectedAddress(null);
    form.reset();
    setDialogOpen(true);
  };

  const handleOpenEdit = (address: AddressModel) => {
    setSelectedAddress(address);
    form.setValue("name", address.name);
    form.setValue("phone", address.phone);
    form.setValue("address", address.address);
    form.setValue("pincode", address.pinCode);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await handleAPI(`/address/remove?id=${id}`, undefined, "delete");
      setAddresses((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const checkDefault = () =>
    addresses.find((a) => a.isDefault) ? false : true;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      name: values.name,
      phone: values.phone,
      address: values.address,
      pinCode: values.pincode,
      createdBy: auth._id,
      isDefault: checkDefault(),
    };

    setLoading(true);
    try {
      if (selectedAddress) {
        await handleAPI(
          `/address/update?id=${selectedAddress._id}`,
          payload,
          "put"
        );
      } else {
        await handleAPI("/address/create", payload, "post");
      }
      await fetchAddresses();
      setDialogOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <Button className="w-1/4 mb-8" onClick={handleOpenAdd}>
        <Add size={16} /> Add New Address
      </Button>

      {loading ? (
        <div className="gap-x-4 flex flex-col">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex flex-col gap-y-2">
              {[...Array(3)].map((__, i) => (
                <Skeleton key={i} className="h-4 w-1/4" />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4">
          {addresses.length ? (
            addresses.map((item) => (
              <div
                key={item._id}
                className="flex w-full justify-between border-b py-4"
              >
                <div className="flex flex-col gap-y-2">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm">{item.address}</div>
                  <div className="text-sm flex gap-x-1 items-center">
                    <Call size={20} /> {item.phone}
                  </div>
                </div>
                <div className="flex flex-col gap-y-2 justify-between">
                  <Button
                    variant="outline"
                    onClick={() => handleOpenEdit(item)}
                  >
                    <Edit /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(item._id)}
                  >
                    <Bag /> Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-x-2">
              <MapPin /> <span className="font-semibold">No Address Found</span>
            </div>
          )}
        </div>
      )}

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedAddress ? "Edit Address" : "Create Address"}
            </AlertDialogTitle>
          </AlertDialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-y-4"
            >
              {["name", "phone", "address", "pincode"].map((field) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={field as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {field.name.charAt(0).toUpperCase() +
                          field.name.slice(1)}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={field.name} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </form>
          </Form>

          <AlertDialogFooter>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                setDialogOpen(false);
                setSelectedAddress(null);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" onClick={() => form.handleSubmit(onSubmit)()}>
              {selectedAddress ? "Create" : "Update"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageAddressTab;
