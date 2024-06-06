// List collection items
export const listItems = async (req, res) => {
  try {
    const data = await req.webflow.collections.items.listItems(
      req.params.collectionId
    );
    res.json(data.items);
  } catch (error) {
    console.error("Error fetching collection items:", error);
    res.status(500).send("Failed to fetch collection items");
  }
};

// Create collection Item
export const createItem = async (req, res) => {
  try {
    const data = await req.webflow.collections.items.createItem(
      req.params.collectionId,
      req.body
    );
    res.json(data);
  } catch (error) {
    console.error("Error creating collection item:", error);
    res.status(500).send("Failed to create collection item");
  }
};

// Delete Collection Item
export const deleteItem = async (req, res) => {
  try {
    const data = await req.webflow.collections.items.deleteItem(
      req.params.collectionId,
      req.params.itemId
    );
    res.json(data);
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).send("Failed to delete item");
  }
};
