import { Router } from "express"
import axios from "axios"
import { PrismaClient } from "@prisma/client"
import { authenticateToken } from "../utils/jwt"
import { createLogger } from "../utils/logger"

const router = Router()
const prisma = new PrismaClient()
const logger = createLogger("MessagesRoutes")

const META_API_VERSION = process.env.META_API_VERSION || "v18.0"
const META_API_URL = `https://graph.instagram.com/${META_API_VERSION}`

async function sendWhatsAppMessage(phoneNumberId: string, accessToken: string, data: any) {
  try {
    const response = await axios.post(`${META_API_URL}/${phoneNumberId}/messages`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    return response.data
  } catch (error: any) {
    logger.error("WhatsApp API error", { error: error.response?.data || error.message })
    throw error
  }
}

router.post("/text", authenticateToken, async (req: any, res) => {
  try {
    const { metaAccountId, phoneNumberId, wabaId, recipientPhone, text } = req.body

    const metaAccount = await prisma.metaAccount.findUnique({
      where: { id: metaAccountId },
    })

    if (!metaAccount) {
      return res.status(404).json({ error: "Meta account not found" })
    }

    const whatsappData = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipientPhone.replace(/\D/g, ""),
      type: "text",
      text: { body: text },
    }

    const whatsappResponse = await sendWhatsAppMessage(phoneNumberId, metaAccount.accessToken, whatsappData)

    const message = await prisma.sentMessage.create({
      data: {
        userId: req.userId,
        metaAccountId,
        phoneNumberId,
        wabaId,
        recipientPhone,
        messageType: "text",
        content: text,
        whatsappMsgId: whatsappResponse.messages[0].id,
        status: "SENT",
      },
    })

    res.status(201).json(message)
  } catch (error: any) {
    logger.error("Send text error", { error: error.message })
    res.status(500).json({ error: "Failed to send message" })
  }
})

router.post("/image", authenticateToken, async (req: any, res) => {
  try {
    const { metaAccountId, phoneNumberId, wabaId, recipientPhone, imageUrl, caption } = req.body

    const metaAccount = await prisma.metaAccount.findUnique({
      where: { id: metaAccountId },
    })

    const whatsappData = {
      messaging_product: "whatsapp",
      to: recipientPhone.replace(/\D/g, ""),
      type: "image",
      image: { link: imageUrl, ...(caption && { caption }) },
    }

    const whatsappResponse = await sendWhatsAppMessage(phoneNumberId, metaAccount!.accessToken, whatsappData)

    const message = await prisma.sentMessage.create({
      data: {
        userId: req.userId,
        metaAccountId,
        phoneNumberId,
        wabaId,
        recipientPhone,
        messageType: "image",
        content: imageUrl,
        whatsappMsgId: whatsappResponse.messages[0].id,
        status: "SENT",
      },
    })

    res.status(201).json(message)
  } catch (error: any) {
    res.status(500).json({ error: "Failed to send image" })
  }
})

router.post("/audio", authenticateToken, async (req: any, res) => {
  try {
    const { metaAccountId, phoneNumberId, wabaId, recipientPhone, audioUrl } = req.body

    const metaAccount = await prisma.metaAccount.findUnique({
      where: { id: metaAccountId },
    })

    const whatsappData = {
      messaging_product: "whatsapp",
      to: recipientPhone.replace(/\D/g, ""),
      type: "audio",
      audio: { link: audioUrl },
    }

    const whatsappResponse = await sendWhatsAppMessage(phoneNumberId, metaAccount!.accessToken, whatsappData)

    const message = await prisma.sentMessage.create({
      data: {
        userId: req.userId,
        metaAccountId,
        phoneNumberId,
        wabaId,
        recipientPhone,
        messageType: "audio",
        content: audioUrl,
        whatsappMsgId: whatsappResponse.messages[0].id,
        status: "SENT",
      },
    })

    res.status(201).json(message)
  } catch (error: any) {
    res.status(500).json({ error: "Failed to send audio" })
  }
})

router.post("/video", authenticateToken, async (req: any, res) => {
  try {
    const { metaAccountId, phoneNumberId, wabaId, recipientPhone, videoUrl, caption } = req.body

    const metaAccount = await prisma.metaAccount.findUnique({
      where: { id: metaAccountId },
    })

    const whatsappData = {
      messaging_product: "whatsapp",
      to: recipientPhone.replace(/\D/g, ""),
      type: "video",
      video: { link: videoUrl, ...(caption && { caption }) },
    }

    const whatsappResponse = await sendWhatsAppMessage(phoneNumberId, metaAccount!.accessToken, whatsappData)

    const message = await prisma.sentMessage.create({
      data: {
        userId: req.userId,
        metaAccountId,
        phoneNumberId,
        wabaId,
        recipientPhone,
        messageType: "video",
        content: videoUrl,
        whatsappMsgId: whatsappResponse.messages[0].id,
        status: "SENT",
      },
    })

    res.status(201).json(message)
  } catch (error: any) {
    res.status(500).json({ error: "Failed to send video" })
  }
})

router.post("/document", authenticateToken, async (req: any, res) => {
  try {
    const { metaAccountId, phoneNumberId, wabaId, recipientPhone, documentUrl, filename } = req.body

    const metaAccount = await prisma.metaAccount.findUnique({
      where: { id: metaAccountId },
    })

    const whatsappData = {
      messaging_product: "whatsapp",
      to: recipientPhone.replace(/\D/g, ""),
      type: "document",
      document: { link: documentUrl, ...(filename && { filename }) },
    }

    const whatsappResponse = await sendWhatsAppMessage(phoneNumberId, metaAccount!.accessToken, whatsappData)

    const message = await prisma.sentMessage.create({
      data: {
        userId: req.userId,
        metaAccountId,
        phoneNumberId,
        wabaId,
        recipientPhone,
        messageType: "document",
        content: documentUrl,
        whatsappMsgId: whatsappResponse.messages[0].id,
        status: "SENT",
      },
    })

    res.status(201).json(message)
  } catch (error: any) {
    res.status(500).json({ error: "Failed to send document" })
  }
})

router.post("/template", authenticateToken, async (req: any, res) => {
  try {
    const { metaAccountId, phoneNumberId, wabaId, recipientPhone, templateName, language, parameters } = req.body

    const metaAccount = await prisma.metaAccount.findUnique({
      where: { id: metaAccountId },
    })

    const whatsappData = {
      messaging_product: "whatsapp",
      to: recipientPhone.replace(/\D/g, ""),
      type: "template",
      template: {
        name: templateName,
        language: { code: language || "en" },
        ...(parameters && {
          components: [{ type: "body", parameters: parameters.map((p: string) => ({ type: "text", text: p })) }],
        }),
      },
    }

    const whatsappResponse = await sendWhatsAppMessage(phoneNumberId, metaAccount!.accessToken, whatsappData)

    const message = await prisma.sentMessage.create({
      data: {
        userId: req.userId,
        metaAccountId,
        phoneNumberId,
        wabaId,
        recipientPhone,
        messageType: "template",
        content: JSON.stringify(whatsappData.template),
        templateName,
        whatsappMsgId: whatsappResponse.messages[0].id,
        status: "SENT",
      },
    })

    res.status(201).json(message)
  } catch (error: any) {
    res.status(500).json({ error: "Failed to send template" })
  }
})

router.post("/buttons", authenticateToken, async (req: any, res) => {
  try {
    const { metaAccountId, phoneNumberId, wabaId, recipientPhone, text, buttons } = req.body

    const metaAccount = await prisma.metaAccount.findUnique({
      where: { id: metaAccountId },
    })

    const whatsappData = {
      messaging_product: "whatsapp",
      to: recipientPhone.replace(/\D/g, ""),
      type: "interactive",
      interactive: {
        type: "button",
        body: { text },
        action: {
          buttons: buttons.map((btn: any) => ({
            type: "reply",
            reply: { id: btn.id, title: btn.title },
          })),
        },
      },
    }

    const whatsappResponse = await sendWhatsAppMessage(phoneNumberId, metaAccount!.accessToken, whatsappData)

    const message = await prisma.sentMessage.create({
      data: {
        userId: req.userId,
        metaAccountId,
        phoneNumberId,
        wabaId,
        recipientPhone,
        messageType: "buttons",
        content: JSON.stringify(whatsappData.interactive),
        whatsappMsgId: whatsappResponse.messages[0].id,
        status: "SENT",
      },
    })

    res.status(201).json(message)
  } catch (error: any) {
    res.status(500).json({ error: "Failed to send buttons message" })
  }
})

router.post("/list", authenticateToken, async (req: any, res) => {
  try {
    const { metaAccountId, phoneNumberId, wabaId, recipientPhone, text, sections } = req.body

    const metaAccount = await prisma.metaAccount.findUnique({
      where: { id: metaAccountId },
    })

    const whatsappData = {
      messaging_product: "whatsapp",
      to: recipientPhone.replace(/\D/g, ""),
      type: "interactive",
      interactive: {
        type: "list",
        body: { text },
        action: { button: "Select", sections },
      },
    }

    const whatsappResponse = await sendWhatsAppMessage(phoneNumberId, metaAccount!.accessToken, whatsappData)

    const message = await prisma.sentMessage.create({
      data: {
        userId: req.userId,
        metaAccountId,
        phoneNumberId,
        wabaId,
        recipientPhone,
        messageType: "list",
        content: JSON.stringify(whatsappData.interactive),
        whatsappMsgId: whatsappResponse.messages[0].id,
        status: "SENT",
      },
    })

    res.status(201).json(message)
  } catch (error: any) {
    res.status(500).json({ error: "Failed to send list message" })
  }
})

export default router
