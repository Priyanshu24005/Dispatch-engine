const allowedMoves: Record<string, string[]> = {
  CREATED: ["SEARCHING", "CANCELLED"],
  SEARCHING: ["OFFERED", "EXPIRED", "CANCELLED"],
  OFFERED: ["ACCEPTED", "SEARCHING", "CANCELLED"],
  ACCEPTED: ["IN_PROGRESS", "SEARCHING", "CANCELLED"],
  IN_PROGRESS: ["COMPLETED"],
  COMPLETED: [],
  CANCELLED: [],
  EXPIRED: [],
};

export function canMove(from: string, to: string): boolean {
  const moves = allowedMoves[from];
  if (!moves) return false;
  return moves.includes(to);
}