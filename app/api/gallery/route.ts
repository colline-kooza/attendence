import db from '@/prisma/db';
import { NextResponse } from 'next/server';

export async function POST(request: any) {
  try {
    const { imageUrls } = await request.json();

    const newImages = await db.gallery.createMany({
      data: imageUrls.map((imageUrl: string) => ({
        images :[imageUrl], 
      })),
    });

    // console.log(newImages);

    return NextResponse.json(newImages);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: any) {
  try {
    const gallery = await db.gallery.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(gallery);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error, message: 'Failed to fetch gallery' },
      { status: 500 }
    );
  }
}

