import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { createRequest, getRequest, changeStatus } from "../services/request.service.js";

export async function createRequestHandler(req: Request, res: Response) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  const request = await createRequest(req.body);
  res.status(201).json(request);
}

export async function cancelRequestHandler(req: Request, res: Response) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  const requestId = String(req.params.id);
  const request = await getRequest(requestId);
  if (!request) {
    res.status(404).json({ error: "request not found" });
    return;
  }

  const updated = await changeStatus(requestId, request.status, "CANCELLED");
  if (!updated) {
    res.status(409).json({ error: "cannot cancel a request that is " + request.status });
    return;
  }
  res.json(updated);
}