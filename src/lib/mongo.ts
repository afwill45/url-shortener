import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb(): Promise<Db> {
  // Return cached connection if we already opened one
  if (cachedDb) return cachedDb;

  // 1  Connect (only once)
  const client = cachedClient ?? new MongoClient(uri);
  if (!cachedClient) await client.connect();
  cachedClient = client;

  // 2  Pick the database
  const db = client.db(process.env.MONGODB_DB || "urlshortener");

  // 3  Ensure the unique index exists (idempotent)
  await db.collection("links").createIndex({ alias: 1 }, { unique: true });

  // 4  Cache & return
  cachedDb = db;
  return cachedDb;
}
