import express from "express";
import auth from "../middleware/auth.js";

import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  addNote,
  updateStatus,
} from "../controllers/leadController.js";

const router = express.Router();

// ✅ PROTECT ALL ROUTES
router.post("/", auth, createLead);
router.get("/", auth, getLeads);
router.get("/:id", auth, getLeadById);
router.put("/:id", auth, updateLead);
router.delete("/:id", auth, deleteLead);

router.post("/:id/note", auth, addNote);
router.patch("/:id/status", auth, updateStatus);

export default router;