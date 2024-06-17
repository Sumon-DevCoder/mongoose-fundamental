"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post("/create-student", 
// validationRequest(studentValidations.createStudentValidationSchema),
user_controller_1.UserControllers.createStudent);
router.get("/", user_controller_1.UserControllers.getAllUser);
router.get("/:id", user_controller_1.UserControllers.getSingleUser);
router.delete("/:userId", user_controller_1.UserControllers.deleteUser);
exports.UserRoutes = router;
