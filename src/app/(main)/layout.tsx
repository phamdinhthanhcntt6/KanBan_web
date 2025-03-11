import FooterComponent from "@/components/footer/FooterComponent";
import HeaderComponent from "@/components/header/HeaderComponent";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const MainLayout = (props: Props) => {
  const { children } = props;
  return (
    <div>
      <div className="p-4 max-w-7xl mx-auto flex flex-col">
        <HeaderComponent />
        {children}
      </div>
      <FooterComponent />
    </div>
  );
};

export default MainLayout;
