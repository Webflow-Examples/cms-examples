import express from "express";
import { listSites } from "../controllers/sitesController.js";

const router = express.Router();

router.get("/", listSites);

export default router;
