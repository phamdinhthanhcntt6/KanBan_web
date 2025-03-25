import React from "react";

const LoadingComponent = () => {
  return (
    <div className="flex items-center justify-center w-2/3 h-full">
      <div className="relative w-16 h-16">
        <div className="absolute w-16 h-16 border-8 border-solid border-gray-200 rounded-full"></div>
        <div className="absolute w-16 h-16 border-8 border-solid border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingComponent;
