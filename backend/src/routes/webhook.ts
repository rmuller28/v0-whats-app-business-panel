import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import { createLogger } from "../utils/logger"
import { authenticateToken } from "../utils/jwt"

const router = Router()
const prisma = new PrismaClient()
const logger = createLogger("WebhookRoutes")

router.get("/", (req, res) => {
  try {
    const { "hub.mode": mode, "hub.challenge": challenge, "hub.verify_token": token } = req.query

    if (mode === "subscribe" && token === process.env.META_WEBHOOK_TOKEN) {
      logger.info("Webhook verified")
      res.status(200).send(challenge)
    } else {
      res.status(403).json({ error: "Invalid verification token" })
    }
  } catch (error: any) {
    logger.error("Webhook verification error", { error: error.message })
    res.status(500).json({ error: "Verification failed" })
  }
})

router.post("/", async (req, res) => {
  try {
    const { object, entry } = req.body

    if (object !== "whatsapp_business_account") {
      return res.status(400).json({ error: "Invalid object type" })
    }

    for (const item of entry) {
      for (const change of item.changes) {
        const event = change.field
        const data = change.value

        logger.info(`Webhook event received: ${event}`, { data })

        // Find user by phone number if available
        let userId = null
        if (data.messages) {
          const phone = await prisma.phoneNumber.findUnique({
            where: { phoneNumberId: data.metadata.phone_number_id },
          })
          if (phone) {
            userId = phone.metaAccount.userId
          }
        }

        // Log webhook
        if (userId) {
          await prisma.webhookLog.create({
            data: {
              userId,
              event,
              messageData: JSON.stringify(data),
              status: "RECEIVED",
              processedAt: new Date(),
            },
          })
        }

        // Handle message status updates
        if (data.statuses) {
          for (const status of data.statuses) {
            await prisma.sentMessage.updateMany({
              where: { whatsappMsgId: status.id },
              data: { status: status.status.toUpperCase() },
            })
          }
        }

        // Handle incoming messages
        if (data.messages) {
          logger.info("Incoming message received", { sender: data.messages[0].from })
        }
      }
    }

    res.status(200).json({ success: true })
  } catch (error: any) {
    logger.error("Webhook processing error", { error: error.message })
    res.status(500).json({ error: "Webhook processing failed" })
  }
})

router.get("/logs", authenticateToken, async (req: any, res) => {
  try {
    const { metaAccountId, limit = 50 } = req.query

    const logs = await prisma.webhookLog.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
      take: Number.parseInt(limit as string),
    })

    res.json(logs)
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch webhook logs" })
  }
})

export default router
