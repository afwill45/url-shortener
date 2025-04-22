// src/app/[slug]/route.ts
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongo";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {

  const { slug } = await params;

  const db  = await getDb();
  const doc = await db.collection("links").findOne({ alias: slug });

  if (!doc) {

    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.redirect(doc.originalUrl);
}
