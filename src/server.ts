import { Server } from "http";
import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

// setup event listener
process.on("unhandledRejection", () => {
  console.log("🤢 unhandledRejection is detected, shutting down...");

  // gracefully stop process that why called unhandle Rejection
  if (server) {
    server.close(() => {
      process.exit(1); // immediate stop process and it is synchronous process ( uncaughtException )
    });
  }
  process.exit(1); // if server has no process then stop immediate synchronous process ( uncaughtException )
});

// for test this processs
// route
// app.get("/", async (req: Request, res: Response) => {
//   Promise.reject();
//   res.send("server is running...");
// });

process.on("uncaughtException", () => {
  console.log("🤢 uncaughtException is detected, shutting down...");

  process.exit(1); // immediate stop process and it is synchronous process ( uncaughtException )
});

// for test this processs
// console.log(x);
