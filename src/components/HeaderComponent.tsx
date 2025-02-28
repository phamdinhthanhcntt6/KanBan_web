"use client";

import { images } from "@/assets/image";
import MenuBarComponent from "@/components/MenuBarComponent";
import { Button } from "@/components/ui/button";
import { authSelector, removeAuth } from "@/redux/reducers/authReducer";
import { HambergerMenu, Heart, ShoppingCart } from "iconsax-react";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const HeaderComponent = () => {
  const dispatch = useDispatch();

  const auth = useSelector(authSelector);

  const router = useRouter();

  const handleLogout = async () => {
    dispatch(removeAuth({}));
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <div className="flex flex-row justify-between items-center pb-5 max-w-7xl mx-auto p-4">
      <Image
        alt="logo"
        src={images.logo}
        width={100}
        className="cursor-pointer"
      />
      <div className="flex flex-row items-center gap-x-3 max-md:hidden">
        <MenuBarComponent />
      </div>
      <div className="flex flex-row gap-x-6 items-center max-md:hidden">
        <Search size="24" className="cursor-pointer" />
        <Heart size="24" className="cursor-pointer" />
        <ShoppingCart size="24" className="cursor-pointer" />
        {auth ? (
          <div className="flex items-center">
            <Button onClick={handleLogout}>Log out</Button>
          </div>
        ) : (
          <Link href={"/login"}>
            <Button>Login</Button>
          </Link>
        )}
      </div>
      <div className="md:hidden">
        <HambergerMenu
          size={24}
          className="cursor-pointer"
          onClick={() => {
            console.log(111);
          }}
        />
      </div>
    </div>
  );
};

export default HeaderComponent;
