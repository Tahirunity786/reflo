import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CollectCard from "../CollectCard/CollectCard";

const CollectionGrid = ({ pData, router }) => {
  return (
    <>
      {/* ✅ Grid for large screens */}
      <div className="hidden lg:grid grid-cols-4 gap-6 place-items-center mb-6">
        {pData?.collections?.map((item) => (
          <CollectCard
            key={item.id}
            imageSrc={`${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${item.collectionImage}`}
            imageAlt={item.collectionName}
            buttonLabel={item.collectionName}
            hSm={true}
            onButtonClick={() => router.push(`/collection/${item.collectionSlug}`)}
          />
        ))}
      </div>

      {/* ✅ Carousel for md & sm */}
      <div className="lg:hidden w-full mb-6">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            0: {
              slidesPerView: 1, // mobile
            },
            640: {
              slidesPerView: 2, // tablet
            },
          }}
        >
          {pData?.collections?.map((item) => (
            <SwiperSlide key={item.id}>
              <CollectCard
                imageSrc={`${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${item.collectionImage}`}
                imageAlt={item.collectionName}
                buttonLabel={item.collectionName}
                hSm={true}
                onButtonClick={() => router.push(`/collection/${item.collectionSlug}`)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default CollectionGrid;
