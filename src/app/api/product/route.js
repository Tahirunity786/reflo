export const config = {
  runtime: 'nodejs',
};

import { Buffer } from 'buffer';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import cloudinary from '@/lib/cloudinary';
import Collection from '@/models/Collection/Collection';

export async function POST(req) {
  await connectDB();

  try {
    const formData = await req.formData();

    // Utility functions
    const getString = (key) => formData.get(key) || '';
    const getFloat = (key) => parseFloat(formData.get(key)) || 0;
    const getInt = (key) => parseInt(formData.get(key), 10) || 0;
    const getBoolean = (key) => formData.get(key) === 'true';
    const parseJSON = (key, fallback = '[]') => {
      try {
        return JSON.parse(formData.get(key) || fallback);
      } catch {
        return fallback === '{}' ? {} : [];
      }
    };

    // Fields
    const productTitle = getString('productTitle');
    const productStatus = getString('productStatus');
    const productDescription = getString('productDescription');
    const productSKU = getString('productSKU');
    const productBarcode = getString('productBarcode');
    const productPrice = getFloat('productPrice');
    const productComparePrice = getFloat('productComparePrice');
    const productCostPrice = getFloat('productCostPrice');
    const productProfitPrice = getFloat('productProfitPrice');
    const productQuantity = getInt('productQuantity');
    const productTrackQuantity = getBoolean('productTrackQuantity');
    const productoutOfStock = getBoolean('productoutOfStock');

    const productCategories = parseJSON('productCategories', '[]');
    const productCollection = parseJSON('productCollection', '[]');
    const productTags = parseJSON('productTags', '[]');
    const shippingInfo = parseJSON('shippingInfo', '{}');
    const productOrganization = parseJSON('productOrganization', '{}');

    // Handle image upload
    const images = formData.getAll('images');
    if (!images.length) {
      return NextResponse.json({ error: 'At least one image is required' }, { status: 400 });
    }

    const savedImages = [];

    const uploadResults = await Promise.allSettled(
      images.map(async (file) => {
        if (!(file instanceof File)) throw new Error('Invalid file upload');

        const buffer = Buffer.from(await file.arrayBuffer());
        const base64Data = `data:${file.type};base64,${buffer.toString('base64')}`;

        const result = await cloudinary.uploader.upload(base64Data, {
          folder: 'products',
          public_id: `${Date.now()}_${file.name.replace(/\.[^/.]+$/, '').replace(/\s+/g, '_')}`,
        });

        return {
          url: result.secure_url,
          public_id: result.public_id,
          alt: file.name,
          size: file.size,
        };
      })
    );

    for (const result of uploadResults) {
      if (result.status === 'fulfilled') {
        savedImages.push(result.value);
      }
    }

    if (savedImages.length === 0) {
      return NextResponse.json({ error: 'Failed to upload any images' }, { status: 500 });
    }

    // Create the product (only now we can get _id)
    const product = new Product({
      productTitle,
      productStatus,
      productDescription,
      productSKU,
      productBarcode,
      productPrice,
      productComparePrice,
      productCostPrice,
      productProfitPrice,
      productQuantity,
      productTrackQuantity,
      productoutOfStock,
      productCategories,
      productCollection,
      productTags,
      productImages: savedImages,
      productOrganization,
      shippingInfo: {
        isPhysicalProduct: true,
        weight: {
          value: parseFloat(shippingInfo.weight) || 0,
          unit: shippingInfo.weightUnit || 'kg',
        },
      },
    });

    const savedProduct = await product.save();

    // ✅ Now update collections
    await Promise.all(
      productCollection.map((collectionId) =>
        Collection.findByIdAndUpdate(
          collectionId,
          { $addToSet: { products: savedProduct._id } },
          { new: true }
        )
      )
    );

    return NextResponse.json(
      { message: 'Product saved successfully!', product: savedProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'An unknown error occurred' },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'dateCreated';
    const order = searchParams.get('order') === 'asc' ? 1 : -1;
    const skip = (page - 1) * limit;

    const searchFilter = {
      $or: [
        { productTitle: { $regex: search, $options: 'i' } },
        { productTags: { $regex: search, $options: 'i' } },
      ],
    };

    const products = await Product.find(searchFilter)
      .select(
        'productTitle slug productSKU productPrice productComparePrice productCountInStock productRating productNumReviews productImages productStatus dateCreated'
      )
      .populate('collection', 'title')
      .sort({ [sort]: order })
      .skip(skip)
      .limit(limit)
      .lean();

    const enhancedProducts = products.map((product) => {
      const mainImage = product.productImages?.[0]?.url || null;
      const thumbnail = mainImage
        ? mainImage.replace('/upload/', '/upload/w_300,h_300,c_fill/')
        : null;

      return {
        ...product,
        thumbnail,
        mainImage,
      };
    });

    const total = await Product.countDocuments(searchFilter);

    const response = NextResponse.json({
      success: true,
      data: enhancedProducts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });

    // Set Cache-Control headers (60 seconds stale-while-revalidate)
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=59');

    return response;
  } catch (error) {
    console.error('[GET /api/products/dashboard]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}