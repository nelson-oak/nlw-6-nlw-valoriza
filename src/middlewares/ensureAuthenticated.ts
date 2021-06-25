import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
  sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization
  
  if (!authToken) {
    return response.status(401).json({
      status: 'error',
      message: 'Token is missing'
    })
  }


  const [,token] = authToken.split(' ')

  try{
    const { sub } = verify(token, '4ca6386f96f125df9bd6732fdc6d239e') as IPayLoad

    request.user_id = sub

    return next()
  } catch (err) {
    return response.status(401).json({
      status: 'error',
      message: 'Invalid token'
    })
  }
}