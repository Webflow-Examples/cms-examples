import { WebflowClient } from "webflow-api";
import { getToken } from "./auth/tokens.js";

// Middleware function to initialize the Webflow client and attach it to the request object
const webflowClientMiddleware = async (req, res, next) => {
  try {
    // Retrieve the access token for the user
    const accessToken = await getToken("user");
    if (!accessToken) {
      // If the access token is not found, log an error and send a 401 Unauthorized response
      console.log("Access token not found for user");
      return res.status(401).send("Access token not found");
    }

    // Initialize the Webflow client with the retrieved access token
    req.webflow = new WebflowClient({ accessToken });
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Log any errors that occur during initialization and send a 500 Internal Server Error response
    console.error("Error initializing Webflow client:", error);
    res.status(500).send("Failed to initialize Webflow client");
  }
};

// Export the middleware function for use in other parts of the application
export default webflowClientMiddleware;
