"use client";

import { Carousel } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React, { ReactNode, useRef } from "react";

interface Props {
  children: ReactNode;
}

const CarouselWrapperComponent = (props: Props) => {
  const { children } = props;

  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  return (
    <Carousel
      className="w-full"
      plugins={[plugin.current]}
      opts={{
        loop: true,
      }}
    >
      {children}
    </Carousel>
  );
};

export default CarouselWrapperComponent;
