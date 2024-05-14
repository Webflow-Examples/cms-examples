import { WebflowClient } from "webflow-api";
import { getToken } from "../utils/tokens.js";

const accessToken = await getToken("user");
const webflow = new WebflowClient({ accessToken });

// List Sites
export const listSites = async (req, res) => {
  try {
    const data = await webflow.sites.list();
    res.json(data.sites); // Respond with Site Data
  } catch (error) {
    console.error("Error fetching sites:", error);
    res.status(500).send("Failed to fetch sites");
  }
};
