import { getCustomRepository } from "typeorm";
import { TagsRepository } from "../repositories/TagsRepository";

export class CreateTagService {
  async execute(name: string) {
    const tagsRepository = getCustomRepository(TagsRepository)

    if (!name) {
      throw new Error('Name is required')
    }

    const tagAlreadyExists = await tagsRepository.findOne({
      where: {
        name
      }
    })

    if (tagAlreadyExists) {
      throw new Error('Tag already exists')
    }

    const tag = tagsRepository.create({
      name
    })

    await tagsRepository.save(tag)

    return tag
  }
}