// src/app/page.tsx
import ShortenerForm from "@/components/ShortenerForm";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <ShortenerForm />
    </main>
  );
}
