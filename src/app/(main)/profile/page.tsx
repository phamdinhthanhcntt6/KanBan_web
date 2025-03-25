import AvatarComponent from "./components/AvatarComponent";
import MyOrdersTab from "./components/MyOrdersTab";
import PersonalInformationTab from "./components/PersonalInformationTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Profile",
};

interface Props {
  value: string;
  children: ReactNode;
}

const TabTrigger = (props: Props) => {
  const { value, children } = props;
  return (
    <TabsTrigger
      value={value}
      className="w-full py-3 rounded-none data-[state=active]:bg-black data-[state=active]:text-white text-sm font-medium flex justify-start"
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
        <Tabs defaultValue="personal_information" className="w-full h-max flex">
          <TabsList className="flex flex-col w-1/5 grid-cols-2 h-full p-0 rounded-none">
            <AvatarComponent />
            <TabTrigger
              value="personal_information"
              children={<>Personal Information</>}
            />
            <TabTrigger value="my_orders" children={<>My Orders</>} />
          </TabsList>
          <div className="px-4">
            <TabsContent value="personal_information">
              <PersonalInformationTab />
            </TabsContent>
            <TabsContent value="my_orders">
              <MyOrdersTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
