import BannerComponent from "@/components/banner/BannerComponent";
import ContentComponent from "@/components/content/ContentComponent";
import FooterComponent from "@/components/footer/FooterComponent";
import HeaderComponent from "@/components/header/HeaderComponent";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Krist",
  description: "Krist",
};

const HomePage = () => {
  return (
    <div className="w-full text-[#131118]">
      <HeaderComponent />
      <BannerComponent />
      <ContentComponent />
      <FooterComponent />
    </div>
  );
};

export default HomePage;
