'use client'

import ProductDetail from '@/components/ProductDetail/ProductDetail'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const params = useParams();
  const [slugGlobal, setSlug] = useState('');
  const [data, setData] = useState(null);

  // Set the slug when it's available
  useEffect(() => {
    if (params?.slug) {
      setSlug(params.slug);
    }
  }, [params]);

  // Fetch product when slugGlobal is updated
  useEffect(() => {
    const retrieveProduct = async () => {
      if (!slugGlobal) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/products/${slugGlobal}`);
        if (res.ok) {
          const resData = await res.json();
          setData(resData);
        } else {
          console.error("Failed to fetch product");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    retrieveProduct();
  }, [slugGlobal]);

  return <ProductDetail slug={slugGlobal} data={data} />;
}

export default Page;
