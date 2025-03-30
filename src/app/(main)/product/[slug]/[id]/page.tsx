import handleAPI from "@/apis/handleApi";
import ImageItemComponent from "@/app/(main)/product/[slug]/[id]/ImageItemComponent";
import ProductItemComponent from "@/app/(main)/product/[slug]/[id]/ProductItemComponent";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductModel } from "@/models/ProductModel";
import { SubProductModel } from "@/models/SubProductModel";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Shop",
  description: "Krist",
};

interface ProductDetailProps {
  params: {
    id: string;
    slug: string;
  };
}

const SubProductDetailPage = async ({ params }: ProductDetailProps) => {
  const getProductDetail = async (id: string) => {
    const api = `/customer/product/detail?id=${id}`;
    const res = await handleAPI(api);
    return res.data ? res.data : [];
  };

  const productData = await getProductDetail(params.id);

  const product: ProductModel = productData.items;

  const subProducts: SubProductModel[] = productData.subProduct;

  const relatedProducts: ProductModel[] = productData.relatedProducts;

  let quantity = 0;
  subProducts.map((item: SubProductModel) => (quantity += item.quantity));

  const imageSubProduct = subProducts.flatMap(
    (item: SubProductModel) => item.images
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex mb-6">
        <Breadcrumb className="font-semibold">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">
                {product.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-row gap-8 max-lg:flex-col">
        <div className="flex flex-col w-5/12 max-lg:w-full">
          <div className="rounded-lg w-full flex flex-col">
            {product.images && (
              <Image
                alt=""
                src={product.images[0]}
                width={50}
                height={50}
                className="w-full h-2/3"
              />
            )}
            <ImageItemComponent images={imageSubProduct} />
          </div>
        </div>

        <div className="w-7/12 space-y-4 max-lg:w-full">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            {quantity > 0 ? (
              <div className="text-[#3CD139] bg-[#EBFAEB] py-1 px-2 rounded-md">
                In Stock
              </div>
            ) : (
              <div className="text-red-400 bg-red-100 py-1 px-2 rounded-md">
                Stock
              </div>
            )}
          </div>

          <div className="flex gap-x-1">
            {Array.from({ length: product.rating }, (_, index) => (
              <div key={index}>⭐</div>
            ))}
            <div className="text-gray-500">
              &#10088;{product.rating}.0&#10089;
            </div>
          </div>

          <ProductItemComponent product={product} subProduct={subProducts} />
        </div>
      </div>

      <div className="text-2xl font-semibold">Ralated Products</div>
    </div>
  );
};

export default SubProductDetailPage;
