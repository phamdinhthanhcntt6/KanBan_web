import { images } from "@/assets/image";
import AvatarComponent from "@/components/header/AvatarComponent";
import CartComponent from "@/components/header/CartComponent";
import MenuBarComponent from "@/components/header/MenuBarComponent";
import MenuMobileComponent from "@/components/header/MenuMobileComponent";
import { Heart } from "iconsax-react";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeaderComponent = () => {
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
        <CartComponent />
        <div>
          <AvatarComponent />
        </div>
      </div>
      <MenuMobileComponent />
    </div>
  );
};

export default HeaderComponent;
