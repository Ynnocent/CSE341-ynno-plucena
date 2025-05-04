import { Router } from "express";
const router = Router();
import { getName } from "../controllers/nameController";

router.get("/", getName)

export default router;