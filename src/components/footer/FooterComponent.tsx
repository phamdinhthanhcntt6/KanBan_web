"use client";

import { Input } from "@/components/ui/input";
import {
  ArrowDown2,
  ArrowRight,
  CallCalling,
  Facebook,
  Google,
  Instagram,
  Location,
  Paypal,
  Sms,
  Youtube,
} from "iconsax-react";
import Link from "next/link";
import { useState } from "react";

const information = [
  {
    href: "my-account",
    title: "My Account",
  },
  {
    href: "/login",
    title: "Login",
  },
  {
    href: "/my-cart",
    title: "My Cart",
  },
  {
    href: "/my-wishlist",
    title: "My Wishlist",
  },
  {
    href: "/checkout",
    title: "Checkout",
  },
];

const service = [
  {
    href: "/about-us",
    title: "About Us",
  },
  {
    href: "/careers",
    title: "Careers",
  },
  {
    href: "/delivery-information",
    title: "Delivery Information",
  },
  {
    href: "/privacy-policy",
    title: "Privacy Policy",
  },
  {
    href: "/term-and-conditions",
    title: "Term & Conditions",
  },
];

const FooterComponent = () => {
  const [email, setEmail] = useState<string>("");

  const [isVisibleInformation, setIsVisibleInformation] =
    useState<boolean>(false);

  const [isVisibleService, setIsVisibleService] = useState<boolean>(false);

  const onSubmit = (val: string) => {
    console.log(val);
  };

  return (
    <div className="mt-20 w-full bg-[#131118] text-white">
      <div className="max-w-7xl flex w-full mx-auto p-12 max-lg:p-6 justify-between max-lg:flex-col max-lg:gap-y-4">
        <div className="flex flex-col gap-y-4 max-lg:w-full">
          <div className="text-4xl font-bold">Krist</div>
          <div className="flex items-center gap-x-2">
            <CallCalling size={16} /> (704) 555-0127
          </div>
          <div className="flex items-center gap-x-2">
            <Sms size={16} /> krist@exmaple.com
          </div>
          <div className="flex  gap-x-2 items-start">
            <Location size={16} className="mt-1" />
            <div className="flex flex-col">
              <div>3891 Rachview Dr.Rachardson,</div>
              <div>California 62639</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex justify-between">
            <div className="font-bold underline">Information</div>
            <ArrowDown2
              size={24}
              className={`${
                isVisibleInformation && "rotate-180"
              } duration-500 lg:hidden`}
              onClick={() => setIsVisibleInformation(!isVisibleInformation)}
            />
          </div>
          {information.map((item: { href: string; title: string }) => (
            <Link
              href={item.href}
              key={item.href}
              className={`hover:underline ${
                isVisibleInformation && "hidden"
              } max-lg:hidden`}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex justify-between">
            <div className="font-bold underline">Service</div>
            <ArrowDown2
              size={24}
              className={`${
                isVisibleService && "rotate-180"
              } duration-500 lg:hidden`}
              onClick={() => {
                setIsVisibleService(!isVisibleService);
              }}
            />
          </div>
          {service.map((item: { href: string; title: string }) => (
            <Link
              href={item.href}
              key={item.href}
              className={`hover:underline ${
                isVisibleService && "hidden"
              } max-lg:hidden`}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="w-1/4 flex flex-col gap-y-2 max-lg:w-full">
          <div className="font-bold underline">Subcribe</div>
          <div className="text-sm">
            Enter your email below to be first to know about new collections and
            product launches.
          </div>
          <div className="items-center flex flex-row border-white border p-1 rounded-lg max-lg:w-1/2 max-md:w-full">
            <Sms size={32} />
            <Input
              placeholder="Email"
              type="email"
              className="input-email no-border"
              onChange={(val) => {
                setEmail(val.target.value);
              }}
            />
            <ArrowRight
              size={24}
              className="cursor-pointer"
              onClick={() => {
                onSubmit(email);
              }}
            />
          </div>
        </div>
      </div>
      <div className="px-12 w-full flex mx-auto max-w-7xl">
        <div className="w-full h-[1px] bg-white" />
      </div>
      <div className="w-full max-w-7xl flex mx-auto py-2 justify-between px-12">
        <div className="flex gap-x-2">
          <div className="px-1 py-1 bg-white rounded-md cursor-pointer">
            <Paypal size={24} color="black" />
          </div>
          <div className="px-1 py-1 bg-white rounded-md cursor-pointer">
            <Google size={24} color="black" />
          </div>
        </div>
        <div>2025 Krist All Rights are reserved</div>
        <div className="flex gap-x-2">
          <Facebook size={24} className="cursor-pointer" />
          <Instagram size={24} className="cursor-pointer" />
          <Youtube size={24} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
