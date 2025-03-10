import { images } from "@/assets/image";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
};

const AuthLayout = (props: Props) => {
  const { children } = props;
  return (
    <div className="max-w-7xl mx-auto flex flex-row h-screen justify-center">
      <Image src={images.image1} alt="" className="w-7/12 max-lg:hidden" />
      <div className="h-screen w-5/12 pl-12 max-lg:px-0 max-lg:mx-auto flex items-center text-[#131118] max-lg:w-2/3">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
