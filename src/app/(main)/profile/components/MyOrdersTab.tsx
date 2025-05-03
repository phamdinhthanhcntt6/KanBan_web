"use client";

import handleAPI from "@/apis/handleApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useDebounce from "@/hooks/useDebounce";
import { OrderModel } from "@/models/OrderModel";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  children: ReactNode;
  id: string;
}

const MyOrdersTab = () => {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearch = useDebounce(searchText.trim(), 300);
  const [status, setStatus] = useState<"pending" | "complete" | "">("");
  const [open, setOpen] = useState<boolean>(false);

  const { auth } = useAuthStore();

  const getOrders = async () => {
    setIsLoading(true);
    try {
      const api = `/order/get-by-uid?createdBy=${auth._id}&search=${searchText}&status=${status}`;
      const res = await handleAPI(api);
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelOrder = async (id: string) => {
    try {
      setIsLoading(true);
      const api = `/order/remove?id=${id}`;
      await handleAPI(api, undefined, "delete");
      toast.success("Remove order successfully");
      getOrders();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    getOrders();
  }, [debouncedSearch, status]);

  const FilterStatusButton = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="capitalize w-36">
            Status : {status.toLowerCase() === "" ? "All" : status}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={status}
            onValueChange={(val: any) => {
              setStatus(val);
            }}
          >
            <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="pending">
              Pending
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="complete">
              Complete
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const AleartDeleteOrderDialog = (props: Props) => {
    const { children, id } = props;

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleCancelOrder(id);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return (
    <div className="flex flex-col w-full gap-y-4">
      <div className="flex justify-end items-center gap-x-4">
        <Input
          type="search"
          placeholder="Search by name"
          className="w-1/2"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <FilterStatusButton />
      </div>
      {isLoading ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      ) : (
        <div className="flex flex-col w-full gap-y-2">
          {orders.map((item, index) => (
            <div
              key={`${index}_${item.createdBy}`}
              className="flex flex-col gap-y-2"
            >
              <div className="flex flex-col gap-y-4 border-b-[1px] pb-4">
                <div className="flex gap-x-4 justify-between w-full">
                  <div className="flex flex-col gap-y-2">
                    {item.products.map((product: any) => (
                      <div className="flex items-center" key={product._id}>
                        <div className="flex gap-x-2">
                          <Image
                            src={product.image[0]}
                            alt={product.title}
                            width={50}
                            height={50}
                            className="w-20 h-20"
                            quality={80}
                            loading="lazy"
                          />
                          <div className="flex flex-col justify-between">
                            <div className="font-bold">{product.title}</div>
                            <div className="text-sm">Size: {product.size}</div>
                            <div className="text-sm">
                              Qty: {product.price} x {product.count}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="font-bold">${item.total}.00</div>

                  <div className="flex flex-col gap-y-2">
                    <Button variant="outline" onClick={() => {}}>
                      View Order
                    </Button>
                    {item.status === "pending" ? (
                      <AleartDeleteOrderDialog id={item._id}>
                        <Button variant="destructive">Cancel Order</Button>
                      </AleartDeleteOrderDialog>
                    ) : (
                      <Button>Write A Review</Button>
                    )}
                  </div>
                </div>

                <div className="text-sm">
                  {item.status === "pending" ? (
                    <div className="flex gap-x-2 items-center">
                      <Badge
                        variant="outline"
                        className="text-yellow-500 bg-yellow-100 px-4 py-2"
                      >
                        In Process
                      </Badge>
                      Your product has been In process
                    </div>
                  ) : (
                    <div className="flex gap-x-2 items-center">
                      <Badge
                        variant="outline"
                        className="text-green-500 bg-green-100 px-4 py-2"
                      >
                        Delivered
                      </Badge>
                      Your product has been delivered
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrdersTab;
