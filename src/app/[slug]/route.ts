
import { redirect } from "next/navigation";
import { getDb } from "@/lib/mongo";

export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  const db = await getDb();
  const doc = await db.collection("links").findOne({ alias: params.slug });
  if (!doc) return redirect("/");            // or your 404 page
  redirect(doc.originalUrl);
}
