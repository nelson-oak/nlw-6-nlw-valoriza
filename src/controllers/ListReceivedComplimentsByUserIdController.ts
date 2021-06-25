import { Request, Response } from "express";
import { ListReceivedComplimentsByUserIdService } from "../services/ListReceivedComplimentsByUserIdService";

export class ListReceivedComplimentsByUserIdController {
  async handle(request: Request, response: Response) {
    const { user_id } = request

    const listReceivedComplimentsByUserIdService = new ListReceivedComplimentsByUserIdService()

    const compliments = await listReceivedComplimentsByUserIdService.execute(user_id)

    return response.json(compliments)
  }
}