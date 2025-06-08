import ProductCategoryItem from "@/app/(main)/all-product/components/ProductCategoryItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AllProductPage = () => {
  return (
    <div className="flex flex-row gap-x-6 w-full">
      <div className="w-1/4">
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="category">
            <AccordionTrigger>Product Categories</AccordionTrigger>
            <AccordionContent>
              <ProductCategoryItem />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="price">
            <AccordionTrigger>Product Categories</AccordionTrigger>
            <AccordionContent>
              <ProductCategoryItem />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="color">
            <AccordionTrigger>Product Categories</AccordionTrigger>
            <AccordionContent>
              <ProductCategoryItem />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="size">
            <AccordionTrigger>Product Categories</AccordionTrigger>
            <AccordionContent>
              <ProductCategoryItem />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="w-3/4">right</div>
    </div>
  );
};

export default AllProductPage;
