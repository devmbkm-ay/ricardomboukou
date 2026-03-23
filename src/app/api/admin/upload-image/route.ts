import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function streamToBuffer(stream: Readable): Promise<Buffer> {
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const stream = Readable.from(file.stream());
    const buffer = await streamToBuffer(stream);

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'portfolio_projects' },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          // This part is tricky as we're in a callback.
          // The response has to be handled via the promise resolution below.
        }
      }
    );
    
    const uploadPromise = new Promise<{ secure_url: string }>((resolve, reject) => {
        uploadStream.on('finish', (result: any) => resolve({ secure_url: result.secure_url }));
        uploadStream.on('error', (error) => reject(error));
    });

    uploadStream.end(buffer);

    const { secure_url } = await uploadPromise;

    return NextResponse.json({ imageUrl: secure_url }, { status: 200 });

  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
