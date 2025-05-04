import handleAPI from "@/apis/handleApi";
import ProductViewComponent from "@/components/content/ProductViewComponent";
import { ProductModel } from "@/models/ProductModel";

const ProductListComponent = async () => {
  const api = `/customer/best-seller`;

  const res = await handleAPI(api);

  const products = res.data;

  return (
    <div className="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 px-12">
      {products &&
        products.map((item: ProductModel) => (
          <ProductViewComponent
            key={item._id}
            id={item._id}
            src={item.images[0]}
            title={item.title}
            description={item.description}
            price={item.price}
          />
        ))}
    </div>
  );
};

export default ProductListComponent;
