import jwt from "jsonwebtoken"
import { createLogger } from "./logger"

const logger = createLogger("JWT")
const secret = process.env.JWT_SECRET || "secret"

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, secret, { expiresIn: "7d" })
}

export const verifyToken = (token: string): { userId: string } | null => {
  try {
    return jwt.verify(token, secret) as { userId: string }
  } catch (error) {
    logger.error("Token verification failed", { error })
    return null
  }
}

export const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "Access token required" })
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return res.status(403).json({ error: "Invalid or expired token" })
  }

  req.userId = decoded.userId
  next()
}
