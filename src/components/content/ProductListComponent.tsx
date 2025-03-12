"use client";

import handleAPI from "@/apis/handleApi";
import ProductViewComponent from "@/components/content/ProductViewComponent";
import { ProductModel } from "@/models/ProductModel";
import React, { useEffect, useState } from "react";
import { number } from "zod";

const ProductListComponent = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getBestSellerProducts();
  }, []);

  const getBestSellerProducts = async () => {
    setIsLoading(true);
    try {
      const api = `/customer/best-seller`;
      const res = await handleAPI(api);
      res.data && setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return;

  return (
    <div className="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 px-12">
      {products &&
        products.map((item: ProductModel, index: number) => (
          <ProductViewComponent
            id={item._id}
            src={item.images[0]}
            title={item.title}
            description={item.description}
            price={item.price}
            key={item._id}
          />
        ))}
    </div>
  );
};

export default ProductListComponent;
