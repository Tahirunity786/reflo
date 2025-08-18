import BestSellingProducts from "@/components/BestSellingProducts/BestSellingProducts";
import CategoryShowCase from "@/components/CategoryShowCase/CategoryShowCase";
import CompactProductList from "@/components/CompactProductList/CompactProductList";
import MultiColumnProductWidget from "@/components/MultiColumnProductWidget/MultiColumnProductWidget";
import Navbar from "@/components/Navbar/Navbar";
import ProductWidget from "@/components/ProductWidget/ProductWidget";
import HappyCustomers from "@/components/ReviewWidget/ReviewWidget";
import { TopBanner } from "@/components/TopBanner/TopBanner";


export default function Home() {
  return (
    <>
      <TopBanner />
      <ProductWidget />
      <BestSellingProducts title={"Best Selling"} type={"bestSelling"}  />
      <CategoryShowCase/>
      {/* <CompactProductList /> */}
      <BestSellingProducts  title={"Featured Products"} type={"featuredProducts"} />
      <HappyCustomers/>
      {/* <MultiColumnProductWidget /> */}
    </>
  );
}
