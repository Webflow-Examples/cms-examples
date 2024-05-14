import express from "express";
import {
  listItems,
  createItem,
  deleteItem,
} from "../controllers/itemsController.js";

const router = express.Router();

// Route to list all items for a specific collection
router.get("/:collectionId/items", listItems);

// Route to create a new item in a specific collection
router.post("/:collectionId/items", createItem);

// Route to delete a specific item from a collection
router.delete("/:collectionId/items/:itemId", deleteItem);

export default router;
