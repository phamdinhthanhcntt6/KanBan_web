import type { Metadata } from "next";
import ProfileTabs from "./components/ProfileTabs";

export const metadata: Metadata = {
  title: "Profile",
};

const ProfilePage = () => {
  return (
    <div className="max-w-7xl px-12 mt-4">
      <div className="flex w-full justify-between flex-col gap-y-8">
        <div className="text-2xl font-semibold">My Profile</div>
        <ProfileTabs />
      </div>
    </div>
  );
};

export default ProfilePage;
