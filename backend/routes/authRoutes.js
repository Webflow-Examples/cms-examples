import express from "express";
import { WebflowClient } from "webflow-api";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { getNgrokUrl } from "../utils/ngrokManager.js";
import { storeToken, getToken } from "../auth/tokens.js";

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
  try {
    const token = await getToken("user");
    if (!token) {
      console.log("No token found. Redirecting to auth screen...");
      return res.redirect("/auth");
    } else {
      console.log("Token found. Redirecting to frontend...");
      return res.redirect("http://localhost:3000");
    }
  } catch (error) {
    console.error("Error handling token:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to start Auth Flow. Redirects to Webflow Auth screen
router.get("/auth", async (req, res) => {
  try {
    // Check if a user is using a Site Token. If so, store the site token in the database and skip auth screen
    const siteToken = process.env.SITE_TOKEN;
    if (siteToken) {
      await storeToken("user", siteToken);
      console.log("Site token found and stored. Redirecting to frontend...");
      return res.redirect("http://localhost:3000");
    } else {
      const publicUrl = await getNgrokUrl();
      const authorizeUrl = WebflowClient.authorizeURL({
        scope: scopes,
        clientId: process.env.WEBFLOW_CLIENT_ID,
        redirectUri: `${publicUrl}/auth/callback`,
      });
      res.redirect(authorizeUrl);
    }
  } catch (error) {
    console.error("Error starting auth flow:", error);
    res.status(500).send("Failed to start auth flow");
  }
});

// Callback URI to get code and access token
router.get("/auth/callback", async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send("Authorization code is required");
  }

  try {
    const publicUrl = await getNgrokUrl();
    const accessToken = await WebflowClient.getAccessToken({
      clientId: process.env.WEBFLOW_CLIENT_ID,
      clientSecret: process.env.WEBFLOW_CLIENT_SECRET,
      code: code,
      redirectUri: `${publicUrl}/auth/callback`,
    });

    await storeToken("user", accessToken); // Use access_token
    console.log("Access token obtained and stored. Redirecting to frontend...");
    res.redirect("http://localhost:3000");
  } catch (error) {
    console.error("Error fetching access token:", error);
    res.status(500).send("Failed to fetch access token");
  }
});

export default router;
