import { Router } from "express"
import { PrismaClient } from "@prisma/client"
import { authenticateToken } from "../utils/jwt"
import { createLogger } from "../utils/logger"

const router = Router()
const prisma = new PrismaClient()
const logger = createLogger("TemplatesRoutes")

router.get("/", authenticateToken, async (req: any, res) => {
  try {
    const { metaAccountId, phoneNumberId, language, status } = req.query

    const templates = await prisma.template.findMany({
      where: {
        metaAccountId: metaAccountId as string,
        ...(phoneNumberId && { phoneNumberId: phoneNumberId as string }),
        ...(language && { language: language as string }),
        ...(status && { status: status as string }),
      },
      orderBy: { createdAt: "desc" },
    })

    res.json(templates)
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch templates" })
  }
})

router.post("/", authenticateToken, async (req: any, res) => {
  try {
    const { metaAccountId, phoneNumberId, name, language, category, content, headerType, footerText, buttons } =
      req.body

    const template = await prisma.template.create({
      data: {
        metaAccountId,
        phoneNumberId,
        name,
        language,
        category,
        content: JSON.stringify(content),
        headerType,
        footerText,
        buttons: JSON.stringify(buttons),
        templateId: `${name}_${Date.now()}`,
        status: "PENDING_APPROVAL",
      },
    })

    logger.info(`Template created: ${template.id}`)
    res.status(201).json(template)
  } catch (error: any) {
    logger.error("Template creation error", { error: error.message })
    res.status(500).json({ error: "Failed to create template" })
  }
})

router.get("/:id", authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params
    const template = await prisma.template.findUnique({ where: { id } })

    if (!template) {
      return res.status(404).json({ error: "Template not found" })
    }

    res.json({
      ...template,
      content: JSON.parse(template.content),
      buttons: template.buttons ? JSON.parse(template.buttons) : null,
    })
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch template" })
  }
})

router.patch("/:id", authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params
    const { name, language, category, content, headerType, footerText, buttons } = req.body

    const template = await prisma.template.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(language && { language }),
        ...(category && { category }),
        ...(content && { content: JSON.stringify(content) }),
        ...(headerType && { headerType }),
        ...(footerText && { footerText }),
        ...(buttons && { buttons: JSON.stringify(buttons) }),
      },
    })

    res.json(template)
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update template" })
  }
})

router.delete("/:id", authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params
    await prisma.template.delete({ where: { id } })
    res.json({ message: "Template deleted" })
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete template" })
  }
})

export default router
