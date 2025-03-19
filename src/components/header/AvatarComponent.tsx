"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/useAuthStore";
import { Logout, User } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AvatarComponent = () => {
  const router = useRouter();
  const { auth, removeAuth } = useAuthStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    removeAuth();
    localStorage.clear();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  if (!isClient) return null;

  return (
    <>
      {auth.token ? (
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                key={"profile"}
                className="flex gap-x-1 cursor-pointer items-center w-full"
              >
                <Link
                  href={"/profile"}
                  className="flex gap-x-1 items-center w-full"
                >
                  <User size={16} />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                key={"logout"}
                className="cursor-pointer w-full"
              >
                <div
                  onClick={handleLogout}
                  className="flex gap-x-1 items-center w-full"
                >
                  <Logout size={16} />
                  Log out
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Link href={"/login"}>
          <Button>Login</Button>
        </Link>
      )}
    </>
  );
};

export default AvatarComponent;
