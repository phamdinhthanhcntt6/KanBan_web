"use client";

import handleAPI from "@/apis/handleApi";
import ProductViewComponent from "@/components/content/ProductViewComponent";
import { ProductModel } from "@/models/ProductModel";
import React, { useEffect, useState } from "react";

const ProductListComponent = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [page] = useState<number>(1);

  const [pageSize] = useState(8);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const api = `customer/get-products?page=${page}&pageSize=${pageSize}`;
      const res = await handleAPI(api);
      res.data.items && setProducts(res.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6">
      {products &&
        products.map((item: ProductModel) => (
          <ProductViewComponent
            id={item._id}
            src={item.images[0]}
            key={item._id}
            title={item.title}
            description={item.description}
          />
        ))}
    </div>
  );
};

export default ProductListComponent;
