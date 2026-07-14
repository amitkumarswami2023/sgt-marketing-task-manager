import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", protect, getUsers);

router.post("/", protect, authorizeRoles("admin"), createUser);

router.put("/:id", protect, authorizeRoles("admin"), updateUser);

router.delete("/:id", protect, authorizeRoles("admin"), deleteUser);

export default router;
