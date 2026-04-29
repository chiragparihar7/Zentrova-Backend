const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth"); // ✅ ADD THIS

const {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  addNote,
  updateStatus,
} = require("../controllers/leadController");

// ✅ PROTECT ALL ROUTES
router.post("/", auth, createLead);
router.get("/", auth, getLeads);
router.get("/:id", auth, getLeadById);
router.put("/:id", auth, updateLead);
router.delete("/:id", auth, deleteLead);

router.post("/:id/note", auth, addNote);
router.patch("/:id/status", auth, updateStatus);

module.exports = router;