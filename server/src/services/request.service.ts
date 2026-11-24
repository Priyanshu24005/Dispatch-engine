import { DispatchRequest } from "../models/request.model.js";
import { canMove } from "../utils/request.states.js";

export async function createRequest(body: any) {
  const request = await DispatchRequest.create({
    pickupLat: body.pickupLat,
    pickupLng: body.pickupLng,
    dropLat: body.dropLat,
    dropLng: body.dropLng,
    receiverName: body.receiverName,
    receiverPhone: body.receiverPhone,
    priority: body.priority,
  });
  return request;
}

export async function getRequest(requestId: string) {
  return DispatchRequest.findById(requestId);
}


// Returns null if the move is not allowed or the status changed in between
export async function changeStatus(requestId: string, from: string, to: string) {
  if (!canMove(from, to)) return null;

  const filter: any = { _id: requestId, status: from };
  const update: any = { status: to };

  const updated = await DispatchRequest.findOneAndUpdate(filter, update, { new: true });
  return updated;
}