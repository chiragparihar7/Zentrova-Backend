const express = require("express");
const router = express.Router();

const {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  addNote,
  updateStatus,
} = require("../controllers/leadController");

router.post("/", createLead);
router.get("/", getLeads);
router.get("/:id", getLeadById);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

// Extra features
router.post("/:id/note", addNote);
router.patch("/:id/status", updateStatus);

module.exports = router;