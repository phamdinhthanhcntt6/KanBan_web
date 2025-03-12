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
      <div className="lg:w-max max-lg:overflow-y-scroll max-lg:h-[700px] max-lg:w-screen">
        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-lg:w-full">
          {category &&
            category.map((item: CategoryModel) => (
              <div key={item._id} className="w-full mx-2 h-max">
                <div className="font-bold text-[#131118] px-1 lg:p-1 underline">
                  {item.title}
                </div>
                <div key={item._id}>
                  {item.children &&
                    item.children.map((child: CategoryModel, index: number) => (
                      <Link
                        key={child._id}
                        href={`/category/${child._id}`}
                        className="font-normal flex flex-row text-[#131118] hover:font-semibold lg:p-1 p-[1px] w-full hover:bg-slate-200 hover:rounded-md"
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
    <Menubar className="w-max borderNone flex max-lg:flex-col max-lg:w-screen">
      <MenubarMenu key="home">
        <MenubarTrigger className="max-lg:w-screen">
          <Link href={"/"}>Home</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu key="shop">
        <MenubarTrigger className="cursor-pointer gap-x-1 flex max-lg:w-screen">
          Shop <ArrowDown2 size={12} />
        </MenubarTrigger>
        <MenubarContent className="max-lg:w-screen">
          {renderMenuChild()}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu key="our-story">
        <MenubarTrigger className="max-lg:w-screen">
          <Link href={"/our-story"}>Our Story</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu key="blog">
        <MenubarTrigger className="max-lg:w-screen">
          <Link href={"/blog"}>Blog</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu key="contact">
        <MenubarTrigger className="max-lg:w-screen">
          <Link href={"/contact-us"}>Contact Us</Link>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};

export default MenuBarComponent;
