import express from "express";
import {
  listItems,
  createItem,
  deleteItem,
} from "../controllers/itemsController.js";

const router = express.Router();

// Route to list all items for a specific collection. See listItems controller for logic.
router.get("/:collectionId/items", listItems);

// Route to create a new item in a specific collection. See createItem controller for logic.
router.post("/:collectionId/items", createItem);

// Route to delete a specific item from a collection/ See deleteItem controller for logic.
router.delete("/:collectionId/items/:itemId", deleteItem);

export default router;
