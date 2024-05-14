import express from "express";
import cors from "cors";
import chalk from "chalk";
import { startNgrok } from "./utils/ngrokManager.js"; // Adjust the path as necessary
import Table from "cli-table3";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import sitesRoutes from "./routes/sitesRoutes.js";
import collectionsRoutes from "./routes/collectionRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

// Setup App
const app = express();
const PORT = process.env.PORT || 8000;

// Express Options
app.use(
  cors({
    origin: "http://localhost:3000", // Allow only this origin to access the resources
    optionsSuccessStatus: 200, // For legacy browser support
  })
);
app.use(express.json());

// Setup Routes
app.use("/", authRoutes);
app.use("/api/sites", sitesRoutes);
app.use("/api/collections", collectionsRoutes);
app.use("/api/collections", itemRoutes);

// Start server with NGROK
const startServer = async () => {
  try {
    const ngrokUrl = await startNgrok(PORT);

    const table = new Table({
      head: ["Location", "URL"], // Define column headers
      colWidths: [30, 60], // Define column widths
    });

    table.push(
      ["Develoment URL (Frontend)", "http://localhost:3000"],
      ["Development URL (Backend)", `http://localhost:${PORT}`],
      ["Auth Callback URL", `${ngrokUrl}/auth/callback`]
    );

    console.log(table.toString());

    console.log(
      chalk.blue.inverse("\n\nNOTE:"),
      chalk.blue(
        "Add the Auth Callback URL to your App in your App Settings\n\n"
      )
    );

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server with ngrok:", error);
    process.exit(1);
  }
};

startServer();
