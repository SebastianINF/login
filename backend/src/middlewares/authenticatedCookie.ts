import jwt from 'jsonwebtoken'
import { type RequestHandler } from 'express'
import { PRIVATE_KEY } from '../constants/private'

// authenticated Cookie
export const authenticatedCookie: RequestHandler = (req, res, next) => {
  const token = req.cookies.jwt

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token en la cookie.' })
  }

  try {
    const decoded = jwt.verify(token, PRIVATE_KEY) as { [key: string]: any }
    // @ts-ignore
    req.user = decoded
    next()
  } catch (error) {
    next(error)
  }
}
