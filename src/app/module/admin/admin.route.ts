import express from "express";
import { AdminControllers } from "./admin.controller";

const router = express.Router();

router.get("/", AdminControllers.getAllAdmin);

router.get("/:id", AdminControllers.getSingleAdmin);

router.patch("/:id", AdminControllers.updateSingleAdmin);

router.delete("/:id", AdminControllers.deleteSingleAdmin);

export const AdminRoutes = router;
