import { app } from "./app.js";
import { config } from "./config/config.js";
import connectDB from "./db/index.js";

const port = config.get("port");

connectDB()
  .then(() => {
    app.listen(port || 3000, () => {
      console.log(`⚙️ Server is running at port : ${port}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
