import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    pickupLat: { type: Number, required: true },
    pickupLng: { type: Number, required: true },
    dropLat: { type: Number, required: true },
    dropLng: { type: Number, required: true },
    receiverName: { type: String, required: true },
    receiverPhone: { type: String, required: true },
    priority: { type: String, enum: ["normal", "urgent"], default: "normal" },
    status: {
      type: String,
      enum: ["CREATED", "SEARCHING", "OFFERED", "ACCEPTED", "IN_PROGRESS", "COMPLETED", "CANCELLED", "EXPIRED"],
      default: "CREATED",
    },
    assignedRiderId: { type: String, default: null },
  },
  { timestamps: true }
);

// Named DispatchRequest because "Request" is already a built-in name in Node
export const DispatchRequest = mongoose.model("DispatchRequest", requestSchema);