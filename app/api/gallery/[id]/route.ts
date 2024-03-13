import db from "@/prisma/db";
import { NextResponse } from "next/server";

export async function DELETE(request: any, { params: { id } }: any) {
    try {
      const image = await db.gallery.delete({
        where: {
          id,
        },
      });
  
      console.log("Product deleted successfully", image);
      return NextResponse.json(image, {
        status: 200,
      });
    } catch (error) {
      console.log("Failed to delete a image", error);
      return NextResponse.json(error, { status: 500 });
    }
  }
  