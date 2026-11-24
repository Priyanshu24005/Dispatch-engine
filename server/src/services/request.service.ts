import { DispatchRequest } from "../models/request.model.js";

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