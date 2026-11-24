import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { createRequest } from "../services/request.service.js";

export async function createRequestHandler(req: Request, res: Response) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  const request = await createRequest(req.body);
  res.status(201).json(request);
}