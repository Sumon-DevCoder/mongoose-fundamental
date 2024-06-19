"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
const mongoose_1 = __importDefault(require("mongoose"));
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.database_url);
            server = app_1.default.listen(config_1.default.port, () => {
                console.log(`Example app listening on port ${config_1.default.port}`);
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}
main();
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
