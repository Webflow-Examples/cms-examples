import express from "express";
import { listSites } from "../controllers/sitesController.js";

const router = express.Router();

// List all sites for a given access token. See listSites controller for logic.
router.get("/", listSites);

export default router;
