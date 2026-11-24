import { Router } from "express";
import { validateCreateRequest, validateRequestId } from "../validators/request.validator.js";
import { createRequestHandler, cancelRequestHandler } from "../controllers/request.controller.js";

const router = Router();

router.post("/", validateCreateRequest, createRequestHandler);
router.post("/:id/cancel", validateRequestId, cancelRequestHandler);

export default router;