import cron from "node-cron";
import axios from "axios";
import server from "./src/routes/index.js";
import { env } from "./src/config/index.js";

server.listen(env.PORT, async () => {
  if (parseInt(env.LOCAL != 1)) {
    cron.schedule("*/3 * * * *", async () => {
      try {
        const response = await axios.get("https://api.advancedtechspace.com");
        // console.log(`Health check response: ${response.status}`);
      } catch (error) {
        console.error(`Health check error: ${error.message}`);
      }
    });
  }

  console.log("API working just fine.");
});
