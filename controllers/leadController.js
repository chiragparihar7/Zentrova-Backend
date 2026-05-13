import Lead from "../models/Lead.js";

export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      status: req.body.status,
      source: req.body.source,
      assignedTo: req.body.assignedTo,

      // 🔥 IMPORTANT FIX
      dealValue: Number(req.body.dealValue) || 0,
      labourValue: Number(req.body.labourValue) || 0,

      followUpDate: req.body.followUpDate,
      
      userId: req.user.id,
      notes: req.body.note
        ? [{ text: req.body.note }]
        : [],

      timeline: [{ action: "Lead created" }],
    });

    res.status(201).json({ success: true, data: lead });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ GET ALL LEADS (with filters)
export const getLeads = async (req, res) => {
  try {
    const { status, search } = req.query;

    let query = {
      userId: req.user.id,
    };

    if (status) query.status = status;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
      ];
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 });

    res.json({ success: true, count: leads.length, data: leads });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ✅ GET SINGLE LEAD
export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      userId: req.user.id, // ✅ security
    });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({ success: true, data: lead });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ UPDATE LEAD
export const updateLead = async (req, res) => {
  try {

    const { timeline, notes, ...rest } = req.body;

    const updateData = {
      ...rest,
      dealValue: Number(req.body.dealValue) || 0,
      labourValue: Number(req.body.labourValue) || 0,
    };

    let pushData = {};

    let timelineEntries = [];

    // ✅ STATUS CHANGE
    if (req.body.status) {
      timelineEntries.push({
        action: `Status changed to ${req.body.status}`,
      });
    }

    // ✅ NOTE ADD
    if (req.body.note) {
      pushData.notes = { text: req.body.note };

      timelineEntries.push({
        action: "Note added",
      });
    }

    // ✅ MULTIPLE TIMELINE SUPPORT
    if (timelineEntries.length > 0) {
      pushData.timeline = { $each: timelineEntries };
    }

    if (Object.keys(pushData).length > 0) {
      updateData.$push = pushData;
    }

    const updatedLead = await Lead.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id, // 🔥 MUST
      },
      updateData,
      { new: true }
    );
    
    res.json({
      success: true,
      data: updatedLead,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ DELETE LEAD
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      userId: req.user.id, // ✅ security
    });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    await lead.deleteOne();

    res.json({ success: true, message: "Lead deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ ADD NOTE
export const addNote = async (req, res) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      userId: req.user.id, // ✅ security
    });

    lead.notes.push({ text: req.body.text });

    lead.timeline.push({
      action: "Note added",
    });

    await lead.save();

    res.json({ success: true, data: lead });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ UPDATE STATUS ONLY
export const updateStatus = async (req, res) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      userId: req.user.id, // ✅ security
    });

    lead.status = req.body.status;

    lead.timeline.push({
      action: `Status updated to ${req.body.status}`,
    });

    await lead.save();

    res.json({ success: true, data: lead });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};