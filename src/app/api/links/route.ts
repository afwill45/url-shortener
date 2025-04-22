import { NextResponse } from "next/server";
import { MongoServerError } from "mongodb"; 
import { getDb } from "@/lib/mongo";
import { isValidUrl, isValidAlias } from "@/lib/validation";

export async function POST(req: Request) {
  const { originalUrl, alias } = await req.json();


  if (!isValidUrl(originalUrl))
    return NextResponse.json({ error: "Invalid URL." }, { status: 400 });

  if (!isValidAlias(alias))
    return NextResponse.json({ error: "Bad alias format." }, { status: 400 });


  const db = await getDb();
  try {
    await db.collection("links").insertOne({ alias, originalUrl });
    return NextResponse.json({ ok: true, alias });
  } catch (err: unknown) {

    if (err instanceof MongoServerError && err.code === 11000) {
      return NextResponse.json(
        { error: "Alias already taken." },
        { status: 409 }
      );
    }
    throw err;
  }
}
