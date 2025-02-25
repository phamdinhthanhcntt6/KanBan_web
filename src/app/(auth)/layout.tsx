import { images } from "@/assets/image";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = (props: Props) => {
  const { children } = props;
  return (
    <div className="max-w-7xl mx-auto flex flex-row h-screen justify-center">
      <Image src={images.image1} alt="" className="w-7/12" />
      <div className="h-screen w-5/12 pl-12 flex items-center text-[#131118]">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
