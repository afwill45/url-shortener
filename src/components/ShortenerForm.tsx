"use client";

import { useState } from "react";

export default function ShortenerForm() {
  const [url, setUrl]       = useState("");
  const [alias, setAlias]   = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError]   = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); 
    setError(""); setResult(null);

    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl: url.trim(), alias: alias.trim() }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Unknown error");
      return;
    }
    setResult(`${window.location.origin}/${data.alias}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input
        className="input"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <input
        className="input"
        placeholder="alias"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        required
      />
      <button className="btn" type="submit">Shorten</button>

      {error && <p className="text-red-500">{error}</p>}
      {result && (
        <p className="text-green-600">
          Short URL:&nbsp;
          <a href={result} className="underline" target="_blank">{result}</a>
          &nbsp;<button
            type="button"
            onClick={() => navigator.clipboard.writeText(result)}
            className="ml-2 text-sm"
          >
            copy
          </button>
        </p>
      )}
    </form>
  );
}
