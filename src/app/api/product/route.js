import { Buffer } from 'buffer';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import cloudinary from '@/lib/cloudinary';


/**
 * Handle POST request to create a new product
 * including uploading product images to Cloudinary
 */
export async function POST(req) {
  await connectDB(); // Connect to MongoDB

  try {
    const formData = await req.formData();

    // Extract and validate basic product fields
    const getString = (key) => formData.get(key) || '';
    const getFloat = (key) => parseFloat(formData.get(key)) || 0;
    const getInt = (key) => parseInt(formData.get(key), 10) || 0;
    const getBoolean = (key) => formData.get(key) === 'true';

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

    // Parse JSON fields safely
    const parseJSON = (key, fallback) => {
      try {
        return JSON.parse(formData.get(key) || fallback);
      } catch {
        return fallback === '{}' ? {} : [];
      }
    };

    const productCategories = parseJSON('productCategories', '[]');
    const productTags = parseJSON('productTags', '[]');
    const shippingInfo = parseJSON('shippingInfo', '{}');
    const productOrganization = parseJSON('productOrganization', '{}');

    // Get all image files from form data
    const images = formData.getAll('images');
    if (!images.length) {
      return NextResponse.json({ error: 'At least one image is required' }, { status: 400 });
    }

    // Upload images to Cloudinary
    const savedImages = [];

    const uploadResults = await Promise.allSettled(
      images.map(async (file) => {
        if (!(file instanceof File)) {
          throw new Error('Invalid file upload');
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const base64Data = `data:${file.type};base64,${buffer.toString('base64')}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(base64Data, {
          folder: 'products',
          public_id: `${Date.now()}_${file.name.replace(/\.[^/.]+$/, '').replace(/\s+/g, '_')}`,
        });

        return {
          url: result.secure_url,
          alt: file.name,
          size: file.size,
        };
      })
    );

    // Filter successful uploads
    for (const result of uploadResults) {
      if (result.status === 'fulfilled') {
        savedImages.push(result.value);
      }
    }

    if (savedImages.length === 0) {
      return NextResponse.json({ error: 'Failed to upload any images' }, { status: 500 });
    }

    // Create a new product document
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
      productTags,
      shippingInfo: {
        isPhysicalProduct: true,
        weight: {
          value: parseFloat(shippingInfo.weight) || 0,
          unit: shippingInfo.weightUnit || 'kg',
        },
      },
      productOrganization,
      productImages: savedImages,
    });

    const savedProduct = await product.save();

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

    // Extract query params from URL
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'dateCreated';
    const order = searchParams.get('order') === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    // 🔍 Search filter (product title or tags)
    const searchFilter = {
      $or: [
        { productTitle: { $regex: search, $options: 'i' } },
        { productTags: { $regex: search, $options: 'i' } },
      ],
    };

    // 🔎 Query products
    const products = await Product.find(searchFilter)
      .select(
        'productTitle slug productSKU productPrice productComparePrice productCountInStock productRating productNumReviews productImages productStatus dateCreated'
      )
      .populate('collection', 'title') // Only populate title field of collection
      .sort({ [sort]: order })
      .skip(skip)
      .limit(limit)
      .lean(); // Return plain objects

    const total = await Product.countDocuments(searchFilter);

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('[GET /api/products/dashboard]', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}