import projectModel from "../models/project.js";

export const createNewProject = async (req, res) => {
  const { name, description, members, ...otherFields } = req.body;
  const owner = req.user._id;

  const existingProject = await projectModel.findOne({
    name: name,
    owner: req.user._id,
  });

  if (existingProject) {
    return res.status(400).json({
      message: `You already have a project with this name! -- ${name}`,
    });
  }

  let projectMembers = [{ user: owner, role: "Admin" }];
  if (members && Array.isArray(members)) {
    const extraMembers = members.map((member) => {
            if (typeof member === "string") {
        return { user: member, role: "Editor" };
      }
      return member;
    });
    projectMembers = [...projectMembers, ...extraMembers];
  }

  try {
    const newProject = await projectModel.create({
      name,
      description,
      owner,
      members: projectMembers,
      ...otherFields,
    });
    if (newProject) {

      await newProject.populate([
        {
          path: "owner",
          select: "name",
        },
        {
          path: "members.user",
          select: "name",
        },
      ]);

      const membersResponse = newProject.members.map((member) => ({
        user: member.user,
        role: member.role,
        _id: member._id,
        id: member._id,
      }));

      res.status(200).json({
        message: "new project created!",
        name: newProject.name,
        id : newProject._id,
        createdAt: newProject.startDate,
        deadline: newProject.deadline,
        owner: newProject.owner,
        members: membersResponse,
      });
    }
  } catch (e) {
    res.status(403).json({
      message: e.message,
    });
  }
};

export const getMyProjects = async (req, res) => {
  try {
    const projects = await projectModel
      .find({
        $or: [{ owner: req.user._id }, { "members.user": req.user._id }],
      })
      .populate("owner", "name email")
      .populate("members.user", "name email avatar")
      .populate({
        path: "tasks",
        populate: {
          path: "assignedTo",
          select: "name email avatar",
        },
      })
      .lean();

    const cleanedProjects = projects.map((project) => {
      const members = project.members
        .filter((m) => m.user && m.user._id)
        .map((m) => ({
          userId: m.user._id,
          name: m.user.name,
          email: m.user.email,
          role: m.role,
        }));

      const tasks = (project.tasks || []).map((task) => ({
        _id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        assignedTo: task.assignedTo,
        tags: task.tags,
      }));
      
      return {
        _id: project._id,
        name: project.name,
        description: project.description,
        owner: project.owner,
        members: members,
        tasks: tasks,
        startDate: project.startDate,
      };
    });

    res.status(200).json({
      status: "success",
      count: cleanedProjects.length,
      data: {
        projects: cleanedProjects,
      },
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Could not fetch your projects",
      error: e.message,
    });
  }
};

export const getProject = async (req, res) => {
  const id = req.params.id;
  try {
    const project = await projectModel
      .findById(id)
      .populate({
        path: "members.user",
        select: "name email avatar",
      })
      .populate("owner", "name email avatar")
      .populate({
        path: "tasks",
        populate: {
          path: "assignedTo",
          select: "name email avatar",
        },
      });
    
    if (!project) {
      return res.status(404).json({
        message: "project not found",
      });
    }

    const cleanMembers = project.members
      .filter((m) => m.user !== null)
      .map((m) => ({
        userId: m.user._id,
        name: m.user.name,
        email: m.user.email,
        role: m.role,
      }));

    const cleanTasks = (project.tasks || []).map((task) => ({
      _id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      assignedTo: task.assignedTo,
      tags: task.tags,
    }));

    res.status(200).json({
      message: `This is the project referenced to ${id}`,
      data: {
        id: project._id,
        name: project.name,
        description: project.description,
        owner: project.owner,
        members: cleanMembers,
        tasks: cleanTasks,
        startDate: project.startDate,
        deadline: project.deadLine,
        status: project.status,
      },
    });
  } catch (e) {
    res.status(404).json({
      message: "project not found",
      error: e.message,
    });
  }
};

export const updateProject = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, status, deadLine } = req.body;
        const project = await projectModel
        .findById(id)
        .populate({
        path: "members.user",
        select: "name email",
      })
      .populate("owner", "name email");
        if (!project) {
            res.status(409).json({message: "project Not Found"})
        }
        const isOwner = project.owner._id.toString() === req.user._id.toString();
        if (!isOwner) {
            return res.status(403).json({message: "you are not allowed!"});
        }
        const updatedProject = await projectModel.findByIdAndUpdate(id,
            {name, description, status, deadLine},
            {new : true, runValidators : true}
        )
        .populate({
            path: "members.user",
            select: "name email avatar",
        })
        .populate("owner", "name email avatar");

        const cleanMembers = updatedProject.members
            .filter((m) => m.user !== null)
            .map((m) => ({
                userId: m.user._id,
                name: m.user.name,
                email: m.user.email,
                role: m.role,
            }));

        res.status(200).json({
            status: "success",
            message: "Project updated successfully",
            data: {
                id: updatedProject._id,
                name: updatedProject.name,
                description: updatedProject.description,
                owner: updatedProject.owner,
                members: cleanMembers,
                status: updatedProject.status,
                deadline: updatedProject.deadLine,
                startDate: updatedProject.startDate,
            },
        });
    } catch (e) {
        res.status(500).json({message : e.message});
    }
}