export function isValidUrl(url: string) {
    try {
      const u = new URL(url);
      return ["http:", "https:"].includes(u.protocol);
    } catch {
      return false;
    }
  }
  
  export function isValidAlias(s: string) {
    return /^[a-zA-Z0-9-_]{1,50}$/.test(s);  
  }
  