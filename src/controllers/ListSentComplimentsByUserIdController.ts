import { Request, Response } from "express";
import { ListSentComplimentsByUserIdService } from "../services/ListSentComplimentsByUserIdService";

export class ListSentComplimentsByUserIdController {
  async handle(request: Request, response: Response) {
    const { user_id } = request

    const listSentComplimentsByUserIdService = new ListSentComplimentsByUserIdService()

    const compliments = await listSentComplimentsByUserIdService.execute(user_id)

    return response.json(compliments)
  }
}