'use client'

import ProductDetail from '@/components/ProductDetail/ProductDetail'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const params = useParams();
  const [slugGlobal, setSlug] = useState('');
  
  // Set the slug when it's available
  useEffect(() => {
    if (params?.slug) {
      setSlug(params.slug);
    }
  }, [params]);



  return <ProductDetail slug={slugGlobal}  />;
}

export default Page;
