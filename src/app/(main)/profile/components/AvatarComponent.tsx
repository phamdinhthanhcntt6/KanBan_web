"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/useAuthStore";
import React from "react";

const AvatarComponent = () => {
  const { auth } = useAuthStore();

  return (
    <div className="flex justify-start w-full py-3 px-3 gap-x-2 items-center text-black border-b-[1px] border-gray-200">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
      </Avatar>
      <div className="flex flex-col justify-between">
        <div>Hello</div>
        {/* <div className="font-bold ">
          {auth.firstname} {auth.lastname}
        </div> */}
      </div>
    </div>
  );
};

export default AvatarComponent;
