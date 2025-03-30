"use client";

import handleAPI from "@/apis/handleApi";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { CategoryModel } from "@/models/CategoryModel";
import { useCateStore } from "@/store/useCateStore";
import { getTreeData } from "@/utils/getTreeData";
import { ArrowDown2 } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MenuBarComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const pathname = usePathname();

  const { cate, syncCate } = useCateStore();

  useEffect(() => {
    cate.length == 0 && getData();
  }, []);

  const getData = async () => {
    if (isDataFetched) return;

    try {
      setIsLoading(true);
      const api = `/customer/get-categories`;
      const res = await handleAPI(api);
      syncCate(getTreeData(res.data));
      setIsDataFetched(true);
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
          {cate &&
            cate.map((item: any) => (
              <div key={item._id} className="w-full mx-2 h-max">
                <div className="font-bold text-[#131118] px-1 lg:p-1 underline">
                  {item.title}
                </div>
                <div key={item._id}>
                  {item.children &&
                    item.children.map((child: CategoryModel, index: number) => (
                      <Link
                        key={`${index}-${child._id}`}
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
        <MenubarTrigger
          className={`max-lg:w-screen ${pathname === "/" && "bg-slate-200"}`}
        >
          <Link href={"/"}>Home</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu key="shop">
        <MenubarTrigger
          className={`cursor-pointer gap-x-1 flex max-lg:w-screen ${
            pathname.startsWith("/shop") && "bg-slate-200"
          }`}
        >
          Shop <ArrowDown2 size={12} />
        </MenubarTrigger>
        <MenubarContent className="max-lg:w-screen">
          {renderMenuChild()}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu key="our-story">
        <MenubarTrigger
          className={`max-lg:w-screen ${
            pathname.startsWith("/our-story") && "bg-slate-200"
          }`}
        >
          <Link href={"/our-story"}>Our Story</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu key="blog">
        <MenubarTrigger
          className={`max-lg:w-screen ${
            pathname.startsWith("/blog") && "bg-slate-200"
          }`}
        >
          <Link href={"/blog"}>Blog</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu key="contact">
        <MenubarTrigger
          className={`max-lg:w-screen ${
            pathname.startsWith("/contact-us") && "bg-slate-200"
          }`}
        >
          <Link href={"/contact-us"}>Contact Us</Link>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};

export default MenuBarComponent;
