import BannerComponent from "@/components/BannerComponent";
import ContentComponent from "@/components/ContentComponent";
import FooterComponent from "@/components/FooterComponent";
import HeaderComponent from "@/components/HeaderComponent";

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
