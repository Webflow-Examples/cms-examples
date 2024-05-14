import { WebflowClient } from "webflow-api";
import { getToken } from "./utils/tokens.js";

let webflow = null; // This will hold the client instance

export async function initializeWebflowClient() {
  const accessToken = await getToken("user");
  if (!accessToken) {
    throw new Error(
      "Failed to retrieve access token for WebflowClient initialization."
    );
  }
  webflow = new WebflowClient({ accessToken });
}

export function getWebflowClient() {
  if (!webflow) {
    throw new Error("WebflowClient is not initialized.");
  }
  return webflow;
}
