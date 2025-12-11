import { Router } from "express"
import bcryptjs from "bcryptjs"
import { PrismaClient } from "@prisma/client"
import { generateToken, authenticateToken } from "../utils/jwt"
import { createLogger } from "../utils/logger"

const router = Router()
const prisma = new PrismaClient()
const logger = createLogger("AuthRoutes")

router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return res.status(409).json({ error: "User already exists" })
    }

    const hashedPassword = await bcryptjs.hash(password, 10)
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    })

    const token = generateToken(user.id)
    logger.info(`User registered: ${email}`)

    res.status(201).json({
      user: { id: user.id, email: user.email, name: user.name },
      token,
    })
  } catch (error: any) {
    logger.error("Register error", { error: error.message })
    res.status(500).json({ error: "Registration failed" })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const validPassword = await bcryptjs.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = generateToken(user.id)
    logger.info(`User logged in: ${email}`)

    res.json({
      user: { id: user.id, email: user.email, name: user.name },
      token,
    })
  } catch (error: any) {
    logger.error("Login error", { error: error.message })
    res.status(500).json({ error: "Login failed" })
  }
})

router.get("/me", authenticateToken, async (req: any, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: { metaAccounts: true },
    })
    res.json(user)
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch user" })
  }
})

export default router
