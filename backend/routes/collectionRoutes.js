import express from "express";
import {
  listCollections,
  getCollection,
  createCollectionWithFields,
  deleteCollection,
} from "../controllers/collectionController.js";

const router = express.Router();

// Route to list all collections for a specific site
router.get("/:siteId", listCollections);

// Route to get details of a specific collection
router.get("/:collectionId/details", getCollection);

// Route to create a new collection with fields
router.post("/:siteId", createCollectionWithFields);

// Route to delete a specific collection
router.delete("/:collectionId", deleteCollection);

export default router;
