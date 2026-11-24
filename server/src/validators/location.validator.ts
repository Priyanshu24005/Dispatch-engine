export type LocationMessage = { lat: number; lng: number };

export const parseLocationMessage = (raw: string): LocationMessage | null => {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof data !== "object" || data === null) return null;

  const { type, lat, lng } = data as Record<string, unknown>;
  if (type !== "location") return null;
  if (typeof lat !== "number" || typeof lng !== "number") return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;

  return { lat, lng };
};