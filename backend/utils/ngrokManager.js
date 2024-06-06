import ngrok from "@ngrok/ngrok";

let publicUrl; // Variable to store the current active ngrok URL

export const startNgrok = async (port) => {
  // Disconnect any existing tunnels if publicUrl is already set
  if (publicUrl) {
    console.log("An existing ngrok tunnel was found. Disconnecting...");
    await disconnectNgrok(); // Ensure that any existing tunnel is closed before opening a new one
  }

  try {
    // Start a new ngrok tunnel to the specified port
    const listener = await ngrok.forward({
      port: port,
      authtoken: process.env.NGROK_AUTH_TOKEN, // Use the auth token from the environment variables
    });
    publicUrl = listener.url();
    // console.log(`Ngrok Tunnel started at ${publicUrl}`);
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
process.on("SIGINT", () => {
  disconnectNgrok && process.exit(0);
}); // Handle interrupt signal
process.on("SIGTERM", disconnectNgrok); // Handle termination signal
process.on("SIGUSR2", disconnectNgrok); // Handle signals from tools like nodemon
