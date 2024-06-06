import express from "express";
import {
  listCollections,
  getCollection,
  createCollectionWithFields,
  deleteCollection,
} from "../controllers/collectionController.js";

const router = express.Router();

// Route to list all collections for a specific site. See listCollections controller for logic.
router.get("/:siteId", listCollections);

// Route to get details of a specific collection. See getCollection controller for logic.
router.get("/:collectionId/details", getCollection);

// Route to create a new collection with fields. See createCollectionsWithFields controller for logic.
router.post("/:siteId", createCollectionWithFields);

// Route to delete a specific collection. See deleteCollection controller for logic.
router.delete("/:collectionId", deleteCollection);

export default router;
