import React from "react";

interface Props {
  children: React.ReactNode;
}

const MainLayout = (props: Props) => {
  return (
    <div className="p-4 max-w-7xl bg-red-300 mx-auto">{props.children}</div>
  );
};

export default MainLayout;
