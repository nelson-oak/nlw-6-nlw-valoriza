import { getCustomRepository } from "typeorm";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { UsersRepository } from "../repositories/UsersRepository";

interface IAuthenticateRequest {
  email: string
  password: string
}

export class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findOne({
      email
    })

    if (!user) {
      throw new Error('Email/Password incorrect')
    }
    
    const passwordMatch = await compare(password, user.password)
    
    if (!passwordMatch) {
      throw new Error('Email/Password incorrect')
    }

    const token = sign({
      email: user.email
    }, '4ca6386f96f125df9bd6732fdc6d239e', {
      subject: user.id,
      expiresIn: '1d'
    })

    return token
  }
}