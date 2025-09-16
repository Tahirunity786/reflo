import BestSellingProducts from "@/components/BestSellingProducts/BestSellingProducts";
import CategoryShowCase from "@/components/CategoryShowCase/CategoryShowCase";
import CompactProductList from "@/components/CompactProductList/CompactProductList";
import CountdownBanner from "@/components/CountdownBanner/CountdownBanner";
import FAQSection from "@/components/FAQSection/FAQSection";
import Features from "@/components/Features/Features";
import Header from "@/components/Header/Header";
import MultiColumnProductWidget from "@/components/MultiColumnProductWidget/MultiColumnProductWidget";
import ProductWidget from "@/components/ProductWidget/ProductWidget";
import PromotionModal from "@/components/PromotionModal/PromotionModal";
import RecentlyViewedWidget from "@/components/RecentlyViewedWidget/RecentlyViewedWidget";
import HappyCustomers from "@/components/ReviewWidget/ReviewWidget";
import Testimonials from "@/components/Testimonials/Testimonials";
import { TopBanner } from "@/components/TopBanner/TopBanner";


export default function Home() {
  const metaData = {
    title: `DoorBix || Online Shopping for Quality Products`,
    description: `Welcome to DoorBix – your trusted destination for quality products, great deals, and a seamless online shopping experience tailored to your needs.`,
    image: `https://www.doorbix.com/Image/Logo.png`,
    pageUrl: `https://www.doorbix.com`,
  }


  return (
    <>
      <Header title={metaData.title} description={metaData.description} imageUrl={metaData.image} pageUrl={metaData.pageUrl} />
      <TopBanner />
      <PromotionModal/>
      <Features />
      <CountdownBanner
        durationInHours={12}
        ctaHref="/shop"
        ctaText="Shop & Save"
      />
      <ProductWidget />
      <BestSellingProducts title={"Best Selling"} type={"bestSelling"} smatPad={true} />
      {/* <CategoryShowCase /> */}
      {/* <CompactProductList /> */}
      <BestSellingProducts title={"Featured Products"} type={"featuredProducts"} smatPad={true} />
      {/* <HappyCustomers /> */}
      <Testimonials />
      {/* <FAQSection/> */}
      {/* <MultiColumnProductWidget /> */}
      <RecentlyViewedWidget />
    </>
  );
}
