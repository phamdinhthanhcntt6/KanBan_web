import FooterComponent from "@/components/FooterComponent";
import HeaderComponent from "@/components/HeaderComponent";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const MainLayout = (props: Props) => {
  return (
    <div>
      <div className="p-4 max-w-7xl mx-auto flex flex-col">
        <HeaderComponent />
        {props.children}
      </div>
      <FooterComponent />
    </div>
  );
};

export default MainLayout;
