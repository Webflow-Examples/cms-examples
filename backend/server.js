import { WebflowClient } from "webflow-api";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import axios from "axios";

// Convert URL to local file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 8000;

// CORS options
const corsOptions = {
  origin: "http://localhost:3000", // Allow only this origin to access the resources
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
app.use(express.json());

// Setup the Webflow Client
const accessToken = process.env.APP_TOKEN;
console.log(accessToken);
const webflow = new WebflowClient({ accessToken });

// Endpoint to get all sites
app.get("/api/sites", async (req, res) => {
  try {
    const data = await webflow.sites.list(); // Fetch sites from Webflow
    res.json(data.sites);
  } catch (error) {
    console.error("Error fetching sites:", error);
    res.status(500).send("Failed to fetch sites");
  }
});

// Endpoint to create a new collection with fields
app.post("/api/collections/:siteId", async (req, res) => {

  // Formula to create fields in a collection
  async function createFields(collectionId, fields) {

    for (const field of fields) {
      try {

        // Create new field
        const response = await webflow.collections.fields.create(
          collectionId,
          field
        );

        console.log("Field created:", response);
      } catch (error) {
        console.error("Error creating field:", field.name, error);
      }
    }
  }

  try {
    const siteId = req.params.siteId;
    const collectionDetails = {
      displayName: req.body.collection.name,
      singularName: req.body.collection.singularName,
      slug: req.body.collection.slug,
    };
    const fields = req.body.collection.fields;
    console.log(siteId)
    const collection = await webflow.collections.create(siteId, collectionDetails);
    console.log(`Created Collection: ${collection.id} successfully`)
    await createFields(collection.id, fields);
    console.log("All fields created successfully.");
  } catch (error) {
    console.error("Failed to create collection or fields:", error);
  }
});

// Endpoint to get collections for a specific site
app.get("/api/collections/:siteId", async (req, res) => {
  try {
    const data = await webflow.collections.list(req.params.siteId);
    res.json(data.collections);
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).send("Failed to fetch collections");
  }
});

// Endpoint to get collection details
app.get("/api/collections/:collectionId", async (req, res) => {

    try{
      const data = await webflow.collections.get(req.params.collectionId)
      res.json(data)

    } catch (error){
      console.error("Error fetching collection details:", error)
      res.status(500).send("Failed to fetch collection");

    }


})



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
