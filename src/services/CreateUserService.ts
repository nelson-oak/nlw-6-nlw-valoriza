import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { hash } from 'bcryptjs'
import { classToPlain } from 'class-transformer'

interface IUserRequest {
  name: string
  email: string
  password: string
  admin?: boolean
}

export class CreateUserService {
  async execute({ name, email, password, admin = false }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository)

    if (!email) {
      throw new Error ('Email is required')
    }

    const userAlreadyExists = await usersRepository.findOne({
      email
    })

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      admin
    })

    await usersRepository.save(user)

    return classToPlain(user)
  }
}