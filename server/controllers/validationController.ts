import { checkAvailabilityService } from "../services/validation/checkAvailability"
import { checkAvailabilitySchema, ParsedCheckAvailabilityRequest } from "../services/validation/derivedTypes"
import asyncHandler from "express-async-handler"
import { Request, Response } from "express"
import { HttpStatusCode } from "../constants"

export const checkAvailability = asyncHandler(async (req: Request, res: Response) => {
  const parsedRequest = checkAvailabilitySchema.parse(req.body) as ParsedCheckAvailabilityRequest

  try {
    const result = await checkAvailabilityService(parsedRequest)
    res.status(HttpStatusCode.SUCCESS).json(result)
  } catch (err) {
    console.log("Error")
    res.status(HttpStatusCode.SERVER_ERROR).json({ error: err })
  }
})