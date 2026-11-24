import { body, param } from "express-validator";

export const validateCreateRequest = [
  body("pickupLat").isFloat({ min: -90, max: 90 }).toFloat().withMessage("pickupLat must be between -90 and 90"),
  body("pickupLng").isFloat({ min: -180, max: 180 }).toFloat().withMessage("pickupLng must be between -180 and 180"),
  body("dropLat").isFloat({ min: -90, max: 90 }).toFloat().withMessage("dropLat must be between -90 and 90"),
  body("dropLng").isFloat({ min: -180, max: 180 }).toFloat().withMessage("dropLng must be between -180 and 180"),
  body("receiverName").isString().trim().notEmpty().withMessage("receiverName is required"),
  body("receiverPhone").isString().matches(/^\d{10}$/).withMessage("receiverPhone must be 10 digits"),
  body("priority").optional().isIn(["normal", "urgent"]).withMessage("priority must be normal or urgent"),
];

export const validateRequestId = [param("id").isMongoId().withMessage("invalid request id")];