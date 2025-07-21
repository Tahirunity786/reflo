import { writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
export async function POST(req) {
  await connectDB();

  try {
    const formData = await req.formData();

    const productTitle = formData.get('productTitle');
    const productStatus = formData.get('productStatus');
    const productDescription = formData.get('productDescription');
    const productSKU = formData.get('productSKU');
    const productBarcode = formData.get('productBarcode');
    const productPrice = parseFloat(formData.get('productPrice'));
    const productComparePrice = parseFloat(formData.get('productComparePrice'));
    const productCostPrice = parseFloat(formData.get('productCostPrice'));
    const productProfitPrice = parseFloat(formData.get('productProfitPrice'));
    const productQuantity = parseInt(formData.get('productQuantity'), 10);
    const productTrackQuantity = formData.get('productTrackQuantity') === 'true';
    const productoutOfStock = formData.get('productoutOfStock') === 'true';

    const productCategories = JSON.parse(formData.get('productCategories') || '[]');
    const productTags = JSON.parse(formData.get('productTags') || '[]');

    const shippingInfo = JSON.parse(formData.get('shippingInfo') || '{}');
    const productOrganization = JSON.parse(formData.get('productOrganization') || '{}');

    // Handle multiple file uploads
    const images = formData.getAll('images');
    if (!images.length) {
      return NextResponse.json({ error: 'At least one image is required' }, { status: 400 });
    }
    const savedImages = await Promise.all(
      images.map(async (file) => {
        if (!(file instanceof File)) {
          throw new Error('Invalid file upload');
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}_${file.name}`;
        const uploadPath = path.join(process.cwd(), 'public', 'uploads', filename);
        await writeFile(uploadPath, buffer);
        return { url: `/uploads/${filename}`, alt: file.name, size: file.size };
      })
    );

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

    const saved = await product.save();
    return NextResponse.json({ message: 'Product saved!', product: saved }, { status: 201 });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
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