"use client";

import handleAPI from "@/apis/handleApi";
import { Skeleton } from "@/components/ui/skeleton";
import { WishListModel } from "@/models/WishListModel";
import { useAuthStore } from "@/store/useAuthStore";
import { replaceName } from "@/utils/replaceName";
import { truncated } from "@/utils/truncatedText";
import { Bag } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  id: string;
  image: string;
  title: string;
  description: string;
}

const ProductItem = (props: Props) => {
  const { image, title, description, id } = props;

  const { auth } = useAuthStore();

  const removeProductInWishlist = async (id: string) => {
    try {
      const api = `/wishlist/remove?id=${id}&createdBy=${auth._id}`;
      await handleAPI(api, undefined, "delete");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative p-4 bg-white rounded-sm hover:shadow-2xl">
      <Bag
        className="absolute top-1 right-1 p-2 rounded-full bg-white cursor-pointer hover:bg-red-200"
        size={32}
        color="red"
        onClick={() => removeProductInWishlist(id)}
      />
      <Link
        href={`/product/${replaceName(title)}/${id}`}
        className="flex flex-col w-full cursor-pointer"
      >
        <Image
          alt="img"
          src={image}
          width={120}
          height={100}
          className="w-full rounded-sm h-56"
        />
        <div className="font-bold">{title}</div>
        <div>{truncated(description)}</div>
      </Link>
    </div>
  );
};

const MyWishlistsTab = () => {
  const [wishlist, setWishlist] = useState<WishListModel[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { auth } = useAuthStore();

  useEffect(() => {
    getWishList();
  }, []);

  const getWishList = async () => {
    setIsLoading(true);
    try {
      const api = `/wishlist/get-by-uid?uid=${auth._id}`;
      const res = await handleAPI(api);
      setWishlist(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!auth) return <></>;

  if (wishlist.length === 0) return <></>;

  return isLoading ? (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[175px] w-[250px] rounded-xl" />
      <Skeleton className="h-4 w-[250px]" />
    </div>
  ) : (
    <div className="grid grid-cols-3 gap-4 w-full">
      {wishlist.map((item: WishListModel) => (
        <ProductItem
          id={item.productId._id}
          key={item._id}
          image={item.productId.images[0]}
          title={item.productId.title}
          description={item.productId.description}
        />
      ))}
    </div>
  );
};

export default MyWishlistsTab;
