"use client";

import { images } from "@/assets/image";
import MenuBarComponent from "@/components/MenuBarComponent";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authSelector, removeAuth } from "@/redux/reducers/authReducer";
import {
  HambergerMenu,
  Heart,
  Logout,
  ShoppingCart,
  User,
} from "iconsax-react";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const HeaderComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const auth = useSelector(authSelector);

  const router = useRouter();

  const handleLogout = async () => {
    dispatch(removeAuth({}));
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <div className="flex flex-row justify-between items-center pb-5 max-w-7xl mx-auto p-4 w-full">
      <Link href={"/"}>
        <Image
          alt="logo"
          src={images.logo}
          width={100}
          className="cursor-pointer"
        />
      </Link>
      <div className="flex flex-row items-center gap-x-3 max-lg:hidden">
        <MenuBarComponent />
      </div>
      <div className="flex flex-row gap-x-4 items-center max-lg:hidden">
        <Search size="24" className="cursor-pointer" />
        <Heart size="24" className="cursor-pointer" />
        <ShoppingCart size="24" className="cursor-pointer" />
        {auth ? (
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="flex gap-x-1 cursor-pointer items-center">
                  <User size={16} />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div
                    onClick={handleLogout}
                    className="flex gap-x-1 items-center"
                  >
                    <Logout size={16} />
                    Log out
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Link href={"/login"}>
            <Button>Login</Button>
          </Link>
        )}
      </div>
      <div className="lg:hidden">
        <HambergerMenu
          size={24}
          className="cursor-pointer"
          onClick={() => {
            setIsOpen(true);
          }}
        />
      </div>
      <Drawer open={isOpen} onOpenChange={setIsOpen} direction="top">
        <DrawerContent className="top-0 inset-x-0 mt-0 rounded-t-none rounded-b-md">
          <MenuBarComponent />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default HeaderComponent;
