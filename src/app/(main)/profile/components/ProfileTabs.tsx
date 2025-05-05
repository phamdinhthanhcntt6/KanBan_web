"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Box,
  Card,
  Heart,
  Map,
  Notification,
  Setting2,
  User,
} from "iconsax-react";
import {
  ManageAddressTab,
  MyOrdersTab,
  MyWishlistsTab,
  PersonalInformationTab,
} from "../../profile/components";
import AvatarComponent from "./AvatarComponent";

const MenuTabs = [
  {
    value: "personal_information",
    icon: <User color="white" size={24} />,
    title: "Personal Information",
    children: <PersonalInformationTab />,
  },
  {
    value: "my_orders",
    icon: <Box color="white" size={24} />,
    title: "My Orders",
    children: <MyOrdersTab />,
  },
  {
    value: "my_wishlists",
    icon: <Heart color="white" size={24} />,
    title: "My Wishlists",
    children: <MyWishlistsTab />,
  },
  {
    value: "manage_address",
    icon: <Map color="white" size={24} />,
    title: "Manage Address",
    children: <ManageAddressTab />,
  },
  {
    value: "save_cards",
    icon: <Card color="white" size={24} />,
    title: "Save Cards",
    children: <ManageAddressTab />,
  },
  {
    value: "notifications",
    icon: <Notification color="white" size={24} />,
    title: "Notifications",
    children: <ManageAddressTab />,
  },
  {
    value: "settings",
    icon: <Setting2 color="white" size={24} />,
    title: "Settings",
    children: <ManageAddressTab />,
  },
];

const ProfileTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "personal_information";
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    const tab = searchParams.get("tab") || "personal_information";
    setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.replace(`?tab=${value}`);
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="w-full h-max flex bg-white"
    >
      <TabsList className="flex flex-col w-1/4 h-full p-0 rounded-none border">
        <AvatarComponent />
        {MenuTabs.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className="w-full py-3 data-[state=active]:bg-black bg-white data-[state=active]:text-white text-sm text-black font-semibold flex justify-start rounded-md gap-x-2"
          >
            {item.icon} {item.title}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="px-4 w-full h-full">
        {MenuTabs.map((item) => (
          <TabsContent
            key={item.value}
            value={item.value}
            className="w-full h-full p-1"
          >
            {item.children}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default ProfileTabs;
