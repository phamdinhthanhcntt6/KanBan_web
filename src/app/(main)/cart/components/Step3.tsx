import ProgressCheckOut from "@/app/(main)/cart/components/ProgressCheckOut";
import { Button } from "@/components/ui/button";
import useAddressStore from "@/store/useAddressStore";
import { useCartStore } from "@/store/useCartStore";
import { Edit } from "lucide-react";
import Image from "next/image";

const Step3 = () => {
  const { cart } = useCartStore();

  const { defaultAddress } = useAddressStore();

  const today = new Date();

  const formattedDate = today
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, " ");

  return (
    <div className="p-12 flex flex-col gap-y-12">
      <ProgressCheckOut step={3} />
      <div className="font-semibold">Estimated Delivery: {formattedDate}</div>
      <div className="flex flex-col gap-y-4">
        {cart.map((item: any, index: number) => (
          <div
            className="border-b-[1px] border-gray-200 pb-4 flex flex-row gap-x-4"
            key={index}
          >
            <Image alt="img" src={item.image[0]} width={60} height={60} />
            <div className="flex flex-col gap-y-2">
              <div className="font-semibold">{item.title}</div>
              <div className="text-sm">
                ${item.price} x {item.count}
              </div>
              <div className="w-full flex gap-x-4 text-sm font-semibold">
                <div className="w-16">Size: {item.size}</div>
                <div className="flex gap-x-2 items-center">
                  Color:
                  <div
                    className="w-3 h-3 rounded-sm mt-[2px]"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className=" border-b-[1px] border-gray-200 pb-4">
        <div className="font-semibold">Shipping Address</div>
        <div className="flex mt-2 justify-between items-center">
          <div>
            <div className="font-semibold">{defaultAddress.name}</div>
            <div className="font-normal text-sm text-gray-500">
              {defaultAddress.address}
            </div>
          </div>
          <Button variant={"secondary"} className="p-3">
            <Edit size={16} />
          </Button>
        </div>
      </div>

      <div className="border-b-[1px] border-gray-200 pb-4">
        <div className="font-semibold">Payment Method</div>
        <div className="font-normal text-gray-500 text-sm">
          Cost on delivery
        </div>
      </div>
    </div>
  );
};

export default Step3;
