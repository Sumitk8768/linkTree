import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import * as linkController from '../controllers/links.controller.js';

const router = Router();

router.post("/", authMiddleware, linkController.createLink)

router.get("/item/:linkId", authMiddleware, linkController.getLinkById)

router.patch("/:linkId", authMiddleware, linkController.updateLink)

router.delete("/:linkId", authMiddleware, linkController.deleteLink)

router.get("/:username/analytics", authMiddleware, linkController.getAnalyticsByUsername)

router.get("/:username", linkController.getLinksByUsername)


router.patch("/:linkId/click", linkController.incrementLinkClick)

export default router;
