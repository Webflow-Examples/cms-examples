import { WebflowClient } from "webflow-api";
import { getToken } from "../utils/tokens.js";

const accessToken = await getToken("user");
const webflow = new WebflowClient({ accessToken });

// List Collections
export const listCollections = async (req, res) => {
  try {
    const data = await webflow.collections.list(req.params.siteId);
    res.json(data.collections); // Respond with collection data
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).send("Failed to fetch collections");
  }
};

// Get Collection Details
export const getCollection = async (req, res) => {
  try {
    const data = await webflow.collections.get(req.params.collectionId);
    res.json(data); // Respond with collection details
  } catch (error) {
    console.error("Error fetching collection details:", error);
    res.status(500).send("Failed to fetch collection");
  }
};

// Create a preset collection and corresponding fields
export const createCollectionWithFields = async (req, res) => {
  const siteId = req.params.siteId;
  const { name, singularName, slug, fields } = req.body.collection;

  // Define details of the new collection
  const collectionDetails = {
    displayName: name,
    singularName: singularName,
    slug: slug,
  };

  try {
    // Create the collection in Webflow
    const collection = await webflow.collections.create(
      siteId,
      collectionDetails
    );
    console.log(`Created Collection: ${collection.id} successfully`);

    // Create fields for the new collection
    const fieldCreationResults = await createFields(collection.id, fields);
    console.log("All fields creation attempted.");

    // Filter results to separate successful and failed field creations
    const successfulFields = fieldCreationResults.filter(
      (result) => result.success
    );
    const failedFields = fieldCreationResults.filter(
      (result) => !result.success
    );

    // Respond with detailed information about the operation
    res.status(201).send({
      message: "Collection and fields processed.",
      collectionId: collection._id,
      successfulFields: successfulFields,
      failedFields: failedFields,
    });
  } catch (error) {
    console.error("Failed to create collection or fields:", error);
    res.status(500).send({
      message: "Failed to create collection or fields",
      error: error.message,
    });
  }
};

// Function to create multiple fields for a given collection
async function createFields(collectionId, fields) {
  // Create each field in parallel and return the results
  return Promise.all(
    fields.map((field) => {
      return webflow.collections.fields
        .create(collectionId, field)
        .then((response) => ({
          success: true,
          field: field.name,
          id: response.id,
        }))
        .catch((error) => ({
          success: false,
          field: field.name,
          error: error.message,
        }));
    })
  );
}

// Delete Collection
export const deleteCollection = async (req, res) => {
  try {
    const data = await webflow.collections.deleteCollection(
      req.params.collectionId
    );
    res.json(data); // Respond with data
  } catch (error) {
    console.error("Error deleting collection:", error);
    res.status(500).send("Failed to delete collection");
  }
};
