import { images } from "@/assets/image";
import ContentComponent from "@/components/ContentComponent";
import FooterComponent from "@/components/FooterComponent";
import HeaderComponent from "@/components/HeaderComponent";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="w-full text-[#131118]">
      <HeaderComponent />
      <Image
        alt="banner"
        src={images.banner}
        className="w-full max-w-7xl mx-auto p-4"
      />
      <ContentComponent />
      <FooterComponent />
    </div>
  );
};

export default HomePage;
