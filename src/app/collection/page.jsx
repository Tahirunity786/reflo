'use client';

import React from 'react';
import CollectCard from '@/components/CollectCard/CollectCard';

const cards = [
  { _id: 1, img: "/Image/fs_new_s1.webp", imgAlt: "Collection", Label: "T shirt" },
  { _id: 2, img: "/Image/main_clt4.webp", imgAlt: "Sweater", Label: "Sweater" },
  { _id: 3, img: "/Image/main_clt4.webp", imgAlt: "Sweater", Label: "Sweater" },
  { _id: 4, img: "/Image/main_clt4.webp", imgAlt: "Sweater", Label: "Sweater" },
  { _id: 5, img: "/Image/main_clt4.webp", imgAlt: "Sweater", Label: "Sweater" },
  { _id: 6, img: "/Image/main_clt4.webp", imgAlt: "Sweater", Label: "Sweater" },
  { _id: 7, img: "/Image/main_clt4.webp", imgAlt: "Sweater", Label: "Sweater" },
];

const Page = () => {
  return (
    <div className="max-w-7xl mx-auto sm:px-4 py-8 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
        {cards.map((item) => (
          <CollectCard
            key={item._id}
            imageSrc={item.img}
            imageAlt={item.imgAlt}
            buttonLabel={item.Label}
            onButtonClick={() => console.log(`Clicked ${item._id}`)}
          />
        ))}
      </div>
    </div>


  );
};

export default Page;
