import { NextResponse } from 'next/server';
import { Buffer } from 'buffer';
import connectDB from '@/lib/mongodb';
import cloudinary from '@/lib/cloudinary';
import Collection from '@/models/Collection/Collection';

export async function GET(req) {
  await connectDB();
  try {
    const collections = await Collection.find({}).populate('products');
    return NextResponse.json(collections);
  } catch (error) {
    console.error('❌ Failed to fetch collections:', error);
    return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 });
  }
}
export async function POST(req) {
    await connectDB(); // Connect to MongoDB

    try {
        const formData = await req.formData();

        // Helper functions
        const getString = (key) => formData.get(key)?.toString().trim() || '';
        const getBoolean = (key) => formData.get(key) === 'true';

        // Extract values
        const collectionName = getString('collectionTitle');
        const collectionDescription = getString('collectionDescription');
        const collectionStatus = getString('collectionStatus') || 'draft';
        const pageTitle = getString('pageTitle');
        const pageDesc = getString('pageDesc');
        const isFeatured = getBoolean('isFeatured');

        // Parse tags safely
        let collectionTags = [];
        const tagsRaw = formData.get('collectionTags');
        if (tagsRaw) {
            try {
                const parsedTags = JSON.parse(tagsRaw);
                if (Array.isArray(parsedTags)) {
                    collectionTags = parsedTags;
                } else {
                    return NextResponse.json({ error: 'Tags must be an array' }, { status: 400 });
                }
            } catch {
                return NextResponse.json({ error: 'Invalid tags JSON format' }, { status: 400 });
            }
        }

        // Validate image
        const imageFile = formData.get('images');
        if (!imageFile || !(imageFile instanceof File)) {
            return NextResponse.json({ error: 'Image file is required' }, { status: 400 });
        }

        // Upload to Cloudinary
        const buffer = Buffer.from(await imageFile.arrayBuffer());

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: 'collections',
                    use_filename: true,
                    unique_filename: false,
                    resource_type: 'image',
                },
                (error, result) => (error ? reject(error) : resolve(result))
            ).end(buffer);
        });

        // Create collection object
        const newCollection = {
            name: collectionName,
            description: collectionDescription,
            image: {
                url: uploadResult.secure_url,
                alt: imageFile.name,
                public_id: uploadResult.public_id,
                size: uploadResult.bytes,
            },
            tags: collectionTags,
            status: collectionStatus,
            pageTitle,
            pageDesc,
            isFeatured,
            createdBy: 'someUserId', // TODO: Replace with actual user ID
        };

        // Save to DB
        const Collection = (await import('@/models/Collection/Collection')).default;
        const createdCollection = await Collection.create(newCollection);

        return NextResponse.json(createdCollection, { status: 201 });
    } catch (error) {
        console.error('❌ Collection Creation Failed:', error);
        return NextResponse.json({ error: 'Failed to create collection' }, { status: 500 });
    }
}
