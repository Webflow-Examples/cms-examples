import express from "express";
import { WebflowClient } from "webflow-api";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { getNgrokUrl } from "../utils/ngrokManager.js";
import { storeToken, getToken } from "../utils/tokens.js";

// Convert URL to local file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get Environment Variables from .env file in route
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const router = express.Router();

// Include scopes for your app. Be sure your App has been registered with the same scopes.
const scopes = ["sites:read", "cms:read", "cms:write"];

// Redirect root to Auth Screen or Frontend
router.get("/", async (req, res) => {
  const token = await getToken("user");
  if (!token) {
    res.redirect("/auth");
  } else {
    res.redirect("http://localhost:3000");
  }
});

// Route to start Auth Flow. Redirects to Wefblow Auth screen
router.get("/auth", (req, res) => {
  let publicUrl = getNgrokUrl();

  const authorizeUrl = WebflowClient.authorizeURL({
    scope: scopes,
    clientId: process.env.WEBFLOW_CLIENT_ID,
    redirectUri: `${publicUrl}/auth/callback`,
  });
  res.redirect(authorizeUrl);
});

// Callback URI to get code and access token
router.get("/auth/callback", async (req, res) => {
  let publicUrl = getNgrokUrl();

  const { code } = req.query;
  if (!code) {
    return res.status(400).send("Authorization code is required");
  }

  try {
    const accessToken = await WebflowClient.getAccessToken({
      clientId: process.env.WEBFLOW_CLIENT_ID,
      clientSecret: process.env.WEBFLOW_CLIENT_SECRET,
      code: code,
      redirectUri: `${publicUrl}/auth/callback`,
    });

    await storeToken("user", accessToken);
    res.redirect("http://localhost:3000");
  } catch (error) {
    console.error("Error fetching access token:", error);
    res.status(500).send("Failed to fetch access token");
  }
});

export default router;
