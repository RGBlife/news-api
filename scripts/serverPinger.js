const cron = require("node-cron");
const axios = require("axios");

const pingServer = async () => {
  try {
    const response = await axios.get("https://articlehub-ui.netlify.app/api/heartbeat");
    console.log("Server pinged successfully:", response.status);
  } catch (error) {
    console.error("Error pinging server:", error);
  }
};

// Set up a cron job to run every 10 minutes
cron.schedule("*/10 * * * *", () => {
  console.log("Pinging server...");
  pingServer();
});

console.log("Cron job set up to ping server every 10 minutes");
