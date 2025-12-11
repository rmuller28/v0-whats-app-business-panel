import express from "express"
import cors from "express-cors"
import dotenv from "dotenv"
import { createLogger } from "./utils/logger"
import { PrismaClient } from "@prisma/client"

// Route imports
import authRoutes from "./routes/auth"
import metaRoutes from "./routes/meta"
import templatesRoutes from "./routes/templates"
import messagesRoutes from "./routes/messages"
import webhookRoutes from "./routes/webhook"

dotenv.config()
const logger = createLogger("Server")
const prisma = new PrismaClient()
const app = express()

// Middleware
app.use(express.json())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
)

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

// Routes
app.use("/auth", authRoutes)
app.use("/meta", metaRoutes)
app.use("/templates", templatesRoutes)
app.use("/messages", messagesRoutes)
app.use("/webhook", webhookRoutes)

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error("Request error", { error: err.message, stack: err.stack })
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    status: err.status || 500,
  })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

process.on("SIGINT", async () => {
  await prisma.$disconnect()
  process.exit(0)
})
