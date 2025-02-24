"use client";

import { Button } from "@/components/ui/button";
import { removeAuth } from "@/redux/reducers/authReducer";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const HeaderComponent = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const handleLogout = () => {
    dispatch(removeAuth({}));
    router.push("/login");
  };

  return (
    <div>
      Header
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
};

export default HeaderComponent;
