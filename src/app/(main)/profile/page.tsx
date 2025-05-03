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
import type { Metadata } from "next";
import { ReactNode } from "react";
import {
  ManageAddressTab,
  MyOrdersTab,
  MyWishlistsTab,
  PersonalInformationTab,
} from "../profile/components";
import AvatarComponent from "./components/AvatarComponent";

export const metadata: Metadata = {
  title: "Profile",
};

interface Props {
  value: string;
  children: ReactNode;
}

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

const TabTrigger = (props: Props) => {
  const { value, children } = props;
  return (
    <TabsTrigger
      value={value}
      className="w-full py-3  data-[state=active]:bg-black bg-white data-[state=active]:text-white text-sm text-black font-semibold flex justify-start rounded-md gap-x-2"
    >
      {children}
    </TabsTrigger>
  );
};

const ProfilePage = () => {
  return (
    <div className="max-w-7xl px-12 mt-4">
      <div className="flex w-full justify-between flex-col gap-y-4">
        <div className="text-2xl font-semibold">My Profile</div>
        <Tabs
          defaultValue="personal_information"
          className="w-full h-max flex bg-white"
        >
          <TabsList className="flex flex-col w-1/3 grid-cols-2 h-full p-0 rounded-none border">
            <AvatarComponent />

            {MenuTabs.map((item) => (
              <TabTrigger key={item.value} value={item.value}>
                {item.icon} {item.title}
              </TabTrigger>
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
      </div>
    </div>
  );
};

export default ProfilePage;
