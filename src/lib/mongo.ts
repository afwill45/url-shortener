import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb() {
  if (cachedDb) return cachedDb;
  const client = cachedClient ?? new MongoClient(uri);
  if (!cachedClient) await client.connect();
  cachedClient = client;
  cachedDb = client.db(process.env.MONGODB_DB || "urlshortener");
  return cachedDb;
}
