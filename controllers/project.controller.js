import Project from "../models/project.model.js";

// 🔥 Timeline Helper
const createTimeline = (action, message) => ({
  action,
  message,
  createdAt: new Date(),
});

// ======================================================
// ✅ CREATE PROJECT
// ======================================================

export const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,

      // Logged-in User
      createdBy: req.user.id,

      // Default Timeline
      timeline: [
        createTimeline(
          "created",
          "Project created"
        ),
      ],
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================================
// ✅ GET ALL PROJECTS
// ======================================================

export const getProjects = async (req, res) => {
  try {
    const {
      search = "",
      status,
      leadSource,
    } = req.query;

    let query = {
      createdBy: req.user.id,
    };

    // 🔍 SEARCH
    if (search) {
      query.$or = [
        {
          projectName: {
            $regex: search,
            $options: "i",
          },
        },

        {
          ownerName: {
            $regex: search,
            $options: "i",
          },
        },

        {
          phone: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // 📌 STATUS FILTER
    if (status) {
      query.status = status;
    }

    // 📌 LEAD SOURCE FILTER
    if (leadSource) {
      query.leadSource = leadSource;
    }

    const projects = await Project.find(
      query
    ).sort({
      createdAt: -1,
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================================
// ✅ GET SINGLE PROJECT
// ======================================================

export const getProjectById = async (
  req,
  res
) => {
  try {
    const project =
      await Project.findOne({
        _id: req.params.id,
        createdBy: req.user.id,
      });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================================
// ✅ UPDATE PROJECT
// ======================================================

export const updateProject = async (
  req,
  res
) => {
  try {
    const updates = {
      ...req.body,
    };

    // ❌ PROTECTED FIELDS
    delete updates.notes;
    delete updates.timeline;
    delete updates.createdBy;

    const project =
      await Project.findOneAndUpdate(
        {
          _id: req.params.id,
          createdBy: req.user.id,
        },

        {
          $set: updates,

          $push: {
            timeline:
              createTimeline(
                "updated",
                "Project updated"
              ),
          },
        },

        {
          new: true,
        }
      );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================================
// ✅ DELETE PROJECT
// ======================================================

export const deleteProject = async (
  req,
  res
) => {
  try {
    const project =
      await Project.findOneAndDelete({
        _id: req.params.id,
        createdBy: req.user.id,
      });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json({
      message:
        "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================================
// ✅ ADD PROJECT NOTE
// ======================================================

export const addProjectNote = async (
  req,
  res
) => {
  try {
    const { note } = req.body;

    if (!note) {
      return res.status(400).json({
        message: "Note is required",
      });
    }

    const project =
      await Project.findOneAndUpdate(
        {
          _id: req.params.id,
          createdBy: req.user.id,
        },

        {
          $push: {
            notes: {
              text: note,
            },

            timeline:
              createTimeline(
                "note_added",
                "Note added"
              ),
          },
        },

        {
          new: true,
        }
      );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================================
// ✅ UPDATE PROJECT STATUS
// ======================================================

export const updateProjectStatus =
  async (req, res) => {
    try {
      const { status } = req.body;

      const validStatuses = [
        "not_started",
        "in_progress",
        "on_hold",
        "completed",
      ];

      if (
        !validStatuses.includes(status)
      ) {
        return res.status(400).json({
          message: "Invalid status",
        });
      }

      const project =
        await Project.findOneAndUpdate(
          {
            _id: req.params.id,
            createdBy: req.user.id,
          },

          {
            $set: {
              status,
            },

            $push: {
              timeline:
                createTimeline(
                  "status_changed",
                  `Status changed to ${status}`
                ),
            },
          },

          {
            new: true,
          }
        );

      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      res.json(project);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// ======================================================
// ✅ UPDATE PROJECT PROGRESS
// ======================================================

export const updateProjectProgress =
  async (req, res) => {
    try {
      const { progress } = req.body;

      if (
        progress < 0 ||
        progress > 100
      ) {
        return res.status(400).json({
          message:
            "Progress must be between 0 and 100",
        });
      }

      let status = "in_progress";

      if (progress === 0) {
        status = "not_started";
      }

      if (progress === 100) {
        status = "completed";
      }

      const project =
        await Project.findOneAndUpdate(
          {
            _id: req.params.id,
            createdBy: req.user.id,
          },

          {
            $set: {
              progress,
              status,
            },

            $push: {
              timeline:
                createTimeline(
                  "progress_updated",
                  `Progress updated to ${progress}%`
                ),
            },
          },

          {
            new: true,
          }
        );

      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      res.json(project);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// ======================================================
// ✅ ADD TEAM MEMBER
// ======================================================

export const addTeamMember = async (
  req,
  res
) => {
  try {
    const { name, role, phone } =
      req.body;

    if (!name) {
      return res.status(400).json({
        message:
          "Team member name is required",
      });
    }

    const project =
      await Project.findOneAndUpdate(
        {
          _id: req.params.id,
          createdBy: req.user.id,
        },

        {
          $push: {
            assignedTeam: {
              name,
              role,
              phone,
            },

            timeline:
              createTimeline(
                "team_added",
                `${name} added to project team`
              ),
          },
        },

        {
          new: true,
        }
      );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};