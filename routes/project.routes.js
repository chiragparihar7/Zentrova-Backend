import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addProjectNote,
  updateProjectStatus,
  updateProjectProgress,
} from "../controllers/project.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// 🔐 All routes protected
router.use(protect);

// CRUD
router.post("/", createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.patch("/:id", updateProject);
router.delete("/:id", deleteProject);

// Extra Features
router.post("/:id/note", addProjectNote);
router.patch("/:id/status", updateProjectStatus);
router.patch("/:id/progress", updateProjectProgress);

export default router;