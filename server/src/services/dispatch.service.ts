import { env } from "../config/env.js";
import { claimNextRequest } from "./request.service.js";

let busy = false;

async function dispatchOnce() {
  // skip this round if the last one is still running
  if (busy) return;
  busy = true;

  try {
    for (let i = 0; i < env.dispatchBatchSize; i++) {
      const request = await claimNextRequest();
      if (!request) break;
      console.log("Claimed request", request._id.toString());
    }
  } catch (error) {
    console.error("Dispatch error:", error);
  } finally {
    busy = false;
  }
}

export function startDispatchLoop() {
  setInterval(dispatchOnce, env.dispatchIntervalMs);
}