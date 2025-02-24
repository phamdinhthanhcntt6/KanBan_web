import { images } from "@/assets/image";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = (props: Props) => {
  const { children } = props;
  return (
    <div className="max-w-7xl mx-auto flex flex-row h-screen justify-center">
      <Image src={images.image1} alt="" className="w-7/12 !rounded-lg" />
      <div className="h-screen w-5/12 flex items-center">{children}</div>
    </div>
  );
};

export default AuthLayout;
