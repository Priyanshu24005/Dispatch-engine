import { Router } from "express";
import { validateCreateRequest } from "../validators/request.validator.js";
import { createRequestHandler } from "../controllers/request.controller.js";

const router = Router();

router.post("/", validateCreateRequest, createRequestHandler);

export default router;