"use client";

import MenuBarComponent from "@/components/header/MenuBarComponent";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { HambergerMenu } from "iconsax-react";
import { useState } from "react";

const MenuMobileComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
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
    </>
  );
};

export default MenuMobileComponent;
