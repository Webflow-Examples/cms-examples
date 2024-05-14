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

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const router = express.Router();

const scopes = ["sites:read", "cms:read", "cms:write"];

router.get("/", async (req, res) => {
  const token = await getToken("user");
  console.log(token);
  if (!token) {
    res.redirect("/auth");
  } else {
    res.redirect("http://localhost:3000");
  }
});

router.get("/auth", (req, res) => {
  let publicUrl = getNgrokUrl();

  const authorizeUrl = WebflowClient.authorizeURL({
    scope: scopes,
    clientId: process.env.WEBFLOW_CLIENT_ID,
    redirectUri: `${publicUrl}/auth/callback`,
  });
  res.redirect(authorizeUrl);
});

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
