import { Router } from "express"
import axios from "axios"
import { PrismaClient } from "@prisma/client"
import { authenticateToken } from "../utils/jwt"
import { createLogger } from "../utils/logger"

const router = Router()
const prisma = new PrismaClient()
const logger = createLogger("MetaRoutes")

const META_API_VERSION = process.env.META_API_VERSION || "v18.0"
const META_API_URL = `https://graph.instagram.com/${META_API_VERSION}`

router.post("/oauth/start", authenticateToken, (req: any, res) => {
  try {
    const state = Math.random().toString(36).substring(7)
    const appId = process.env.META_APP_ID
    const redirectUri = `${process.env.FRONTEND_URL}/meta-callback`

    const url =
      `https://www.facebook.com/${META_API_VERSION}/dialog/oauth?` +
      `client_id=${appId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=business_management,whatsapp_business_messaging,whatsapp_business_account_management&` +
      `state=${state}`

    res.json({ url, state })
  } catch (error: any) {
    logger.error("OAuth start error", { error: error.message })
    res.status(500).json({ error: "Failed to start OAuth" })
  }
})

router.post("/oauth/callback", authenticateToken, async (req: any, res) => {
  try {
    const { code } = req.body

    if (!code) {
      return res.status(400).json({ error: "Authorization code required" })
    }

    const appId = process.env.META_APP_ID
    const appSecret = process.env.META_APP_SECRET
    const redirectUri = `${process.env.FRONTEND_URL}/meta-callback`

    const tokenResponse = await axios.get(`${META_API_URL}/oauth/access_token`, {
      params: {
        client_id: appId,
        client_secret: appSecret,
        redirect_uri: redirectUri,
        code,
      },
    })

    const { access_token, user_id } = tokenResponse.data

    const meResponse = await axios.get(`${META_API_URL}/${user_id}?fields=id,name,email&access_token=${access_token}`)

    const businessResponse = await axios.get(`${META_API_URL}/${user_id}/businesses?access_token=${access_token}`)

    const businessId = businessResponse.data.data[0].id

    const metaAccount = await prisma.metaAccount.upsert({
      where: { businessAccountId: businessId },
      update: { accessToken: access_token },
      create: {
        userId: req.userId,
        businessAccountId: businessId,
        accessToken: access_token,
        businessName: meResponse.data.name,
        verificationStatus: "VERIFIED",
      },
    })

    logger.info(`Meta account connected: ${businessId}`)
    res.json(metaAccount)
  } catch (error: any) {
    logger.error("OAuth callback error", { error: error.message })
    res.status(500).json({ error: "OAuth callback failed" })
  }
})

router.get("/business", authenticateToken, async (req: any, res) => {
  try {
    const accounts = await prisma.metaAccount.findMany({
      where: { userId: req.userId },
    })
    res.json(accounts)
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch business accounts" })
  }
})

router.get("/apps", authenticateToken, async (req: any, res) => {
  try {
    const { metaAccountId } = req.query
    const apps = await prisma.metaApp.findMany({
      where: { metaAccountId: metaAccountId as string },
    })
    res.json(apps)
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch apps" })
  }
})

router.get("/waba", authenticateToken, async (req: any, res) => {
  try {
    const { metaAccountId } = req.query
    const wabas = await prisma.waba.findMany({
      where: { metaAccountId: metaAccountId as string },
    })
    res.json(wabas)
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch WABAs" })
  }
})

router.get("/phones", authenticateToken, async (req: any, res) => {
  try {
    const { wabaId } = req.query
    const phones = await prisma.phoneNumber.findMany({
      where: { wabaId: wabaId as string },
    })
    res.json(phones)
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch phone numbers" })
  }
})

router.post("/phones/register", authenticateToken, async (req: any, res) => {
  try {
    const { phoneNumber, wabaId, metaAccountId, displayName } = req.body

    const phone = await prisma.phoneNumber.create({
      data: {
        phoneNumber,
        wabaId,
        metaAccountId,
        displayName,
        phoneNumberId: `${Date.now()}`,
      },
    })

    res.status(201).json(phone)
  } catch (error: any) {
    res.status(500).json({ error: "Failed to register phone" })
  }
})

router.patch("/phones/:id/display-name", authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params
    const { displayName } = req.body

    const phone = await prisma.phoneNumber.update({
      where: { id },
      data: { displayName },
    })

    res.json(phone)
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update display name" })
  }
})

export default router
