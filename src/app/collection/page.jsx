'use client';

import React, { useEffect, useState } from 'react';
import CollectCard from '@/components/CollectCard/CollectCard';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header/Header';


const Page = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/collections`);
        if (response.ok) {
          const CData = await response.json();
          setData(CData);

        }
        setLoading(false)

      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    }
    fetchCollection();

  }, [])

  if (loading || !data || data.length === 0) {
    return (
      <div className="max-w-7xl mx-auto sm:px-4 py-8 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="w-full max-w-xs animate-pulse rounded-xl bg-gray-100 p-4 shadow-md">
              <div className="h-40 w-full rounded-lg bg-gray-300 mb-4"></div>
              <div className="h-4 w-3/4 rounded bg-gray-300 mb-2"></div>
              <div className="h-10 w-full rounded bg-gray-300"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const metaData = {
    title: `DoorBix || Collection`,
    description: `Browse the exclusive DoorBix collection featuring a wide range of quality products carefully curated to match your style and needs.`,
    image: `https://www.doorbix.com/Image/Logo.png`,
    pageUrl: `https://www.doorbix.com/shop/collection`,
  }


  return (
    <div className="max-w-7xl mx-auto sm:px-4 py-8 lg:px-8">
      <Header title={metaData.title} description={metaData.description} imageUrl={metaData.image} pageUrl={metaData.pageUrl} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
        {data?.map((item) => (
          <CollectCard
            key={item.id}
            imageSrc={`${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${item.collectionImage}`}
            imageAlt={item.collectionName}
            buttonLabel={item.collectionName}
            onButtonClick={() => { router.push(`/collection/${item.collectionSlug}`) }}
          />
        ))}
      </div>
    </div>


  );
};

export default Page;
