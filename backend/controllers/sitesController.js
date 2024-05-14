import { WebflowClient } from "webflow-api";
import { getToken } from "../utils/tokens.js";

// List Sites
export const listSites = async (req, res) => {
  try {
    const accessToken = await getToken("user");
    console.log(accessToken);
    const webflow = new WebflowClient({ accessToken });

    const data = await webflow.sites.list();
    res.json(data.sites);
  } catch (error) {
    console.error("Error fetching sites:", error);
    res.status(500).send("Failed to fetch sites");
  }
};
