import ngrok from "@ngrok/ngrok";

let publicUrl; // Variable to store the current active ngrok URL
let shuttingDown = false; // Flag to ensure single execution of signal handlers

export const startNgrok = async (port) => {
  // Disconnect any existing tunnels if publicUrl is already set
  if (publicUrl) {
    console.log("An existing ngrok tunnel was found. Disconnecting...");
    await disconnectNgrok(); // Ensure that any existing tunnel is closed before opening a new one
  }
  try {
    // Start a new ngrok tunnel to the specified port
    const listener = await ngrok.forward({
      addr: port, // Correct parameter name for ngrok connect
      authtoken: process.env.NGROK_AUTH_TOKEN, // Use the auth token from the environment variables
    });
    publicUrl = listener.url();
    console.log(`Ngrok Tunnel started at ${publicUrl}`);
    return publicUrl; // Return the new ngrok URL
  } catch (error) {
    console.error("Error starting ngrok:", error);
    throw new Error("Failed to initialize ngrok"); // Propagate the error
  }
};

export const getNgrokUrl = () => publicUrl; // Getter to access the current ngrok URL

export const disconnectNgrok = async () => {
  if (publicUrl) {
    try {
      console.log("Disconnecting ngrok...");
      await ngrok.disconnect(publicUrl); // Disconnect the specific ngrok tunnel
      await ngrok.kill(); // Optionally kill the ngrok process
      console.log("Ngrok Tunnel disconnected");
    } catch (error) {
      console.error("Failed to disconnect ngrok:", error);
    } finally {
      publicUrl = null; // Reset publicUrl after disconnection
    }
  }
};

// Ensure clean shutdown on process exit or restart
const handleShutdown = async (signal) => {
  if (shuttingDown) return; // Prevent multiple executions
  shuttingDown = true;
  console.log(`Received ${signal}, shutting down gracefully...`);
  await disconnectNgrok();
  process.exit(0);
};

process.on("SIGINT", () => handleShutdown("SIGINT")); // Handle interrupt signal
process.on("SIGTERM", () => handleShutdown("SIGTERM")); // Handle termination signal
process.on("SIGUSR2", () => handleShutdown("SIGUSR2")); // Handle signals from tools like nodemon
