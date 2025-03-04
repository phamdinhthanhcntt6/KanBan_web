"use client";

import handleAPI from "@/apis/handleApi";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { CategoryModel } from "@/models/CategoryModel";
import { getTreeData } from "@/utils/getTreeData";
import { ArrowDown2 } from "iconsax-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const MenuBarComponent = () => {
  const [category, setCategory] = useState<CategoryModel[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setIsLoading(true);
      const api = `/customer/get-categories`;
      const res = await handleAPI(api);
      setCategory(getTreeData(res.data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMenuChild = () => {
    return (
      <div className="w-max">
        <div className="grid grid-cols-4">
          {category &&
            category.map((item: CategoryModel) => (
              <div key={item.id} className="w-full mx-2 h-max p-1">
                <div className="font-bold text-[#131118] px-1 underline">
                  {item.title}
                </div>
                <div>
                  {item.children &&
                    item.children.map((child: CategoryModel) => (
                      <Link
                        href={`/category/${child._id}`}
                        key={child._id}
                        className="font-normal flex flex-row text-[#131118] hover:font-semibold p-1 w-full hover:bg-slate-200 hover:rounded-md"
                      >
                        {child.title}
                      </Link>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  if (isLoading) return <></>;

  return (
    <Menubar className="w-max borderNone">
      <MenubarMenu>
        <MenubarTrigger>
          <Link href={"/"}>Home</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer gap-x-1 flex">
          Shop <ArrowDown2 size={12} />
        </MenubarTrigger>
        <MenubarContent>{renderMenuChild()}</MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link href={"/our-story"}>Our Story</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link href={"/blog"}>Blog</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Link href={"/contact-us"}>Contact Us</Link>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};

export default MenuBarComponent;
