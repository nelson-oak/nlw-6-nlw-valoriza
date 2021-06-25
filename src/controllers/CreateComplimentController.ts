import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

export class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { user_id } = request
    const { user_receiver, tag_id, message } = request.body

    const createComplimentService = new CreateComplimentService()

    const compliment = await createComplimentService.execute({
      user_sender: user_id,
      user_receiver,
      tag_id,
      message
    })

    return response.status(201).json(compliment)
  }
}