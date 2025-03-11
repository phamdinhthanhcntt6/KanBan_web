import LoginContent from "@/app/(auth)/login/content";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return <LoginContent />;
};

export default LoginPage;
