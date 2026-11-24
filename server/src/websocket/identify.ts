import type { IncomingMessage } from "node:http";

// Temporary: rider id comes from the URL. Later this will verify a JWT instead.
export const getRiderId = (request: IncomingMessage): string | null => {
  const url = new URL(request.url ?? "", "http://localhost");
  const riderId = url.searchParams.get("riderId")?.trim();
  return riderId ? riderId : null;
};