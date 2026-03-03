import taskModel from "../models/task.js";
import projectModel from "../models/project.js";


export const createTask = async (req, res) => {
	try {
		const { title, description, dueDate, priority, tags } = req.body;
		const { projectId } = req.params;
		const project = await projectModel.findById(projectId);
		if (!project) {
			return res.status(404).json({ message: "Project not found" });
		}

		const isOwner = project.owner.toString() === req.user._id.toString();
		const isMember = project.members.some(
			(m) => m.user.toString() === req.user._id.toString()
		);

		if (!isOwner && !isMember) {
			return res
				.status(403)
				.json({ message: "You are not allowed to create tasks in this project" });
		}

		const newTask = await taskModel.create({
			title,
			description,
			project: projectId,
			dueDate,
			priority,
			tags: tags || [],
		});

		await newTask.populate("assignedTo", "name email avatar");
		await newTask.populate("project", "name");

		res.status(201).json({
			message: "Task created successfully",
			data: newTask,
		});
	} catch (e) {
		res.status(500).json({
			message: "Error creating task",
			error: e.message,
		});
	}
};


export const getTasks = async (req, res) => {
	try {
		const { projectId } = req.params;

		// Verify project exists
		const project = await projectModel.findById(projectId);
		if (!project) {
			return res.status(404).json({ message: "Project not found" });
		}

		const tasks = await taskModel
			.find({ project: projectId })
			.populate("assignedTo", "name email avatar")
			.populate("project", "name")
			.sort({ createdAt: -1 });

		res.status(200).json({
			status: "success",
			count: tasks.length,
			data: tasks,
		});
	} catch (e) {
		res.status(500).json({
			message: "Error fetching tasks",
			error: e.message,
		});
	}
};

// Get a single task
export const getTask = async (req, res) => {
	try {
		const { taskId } = req.params;

		const task = await taskModel
			.findById(taskId)
			.populate("assignedTo", "name email avatar")
			.populate("project", "name description");

		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		res.status(200).json({
			message: "Task retrieved successfully",
			data: task,
		});
	} catch (e) {
		res.status(500).json({
			message: "Error fetching task",
			error: e.message,
		});
	}
};

// Update task
export const updateTask = async (req, res) => {
	try {
		const { taskId } = req.params;
		const { title, description, dueDate, status, priority, tags, assignedTo } =
			req.body;

		const task = await taskModel.findById(taskId).populate("project");
		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		// Verify user is owner or member of the project
		const project = task.project;
		const isOwner = project.owner.toString() === req.user._id.toString();
		const isMember = project.members.some(
			(m) => m.user.toString() === req.user._id.toString()
		);

		if (!isOwner && !isMember) {
			return res
				.status(403)
				.json({ message: "You are not allowed to update tasks in this project" });
		}

		// Update task fields
		if (title) task.title = title;
		if (description !== undefined) task.description = description;
		if (dueDate) task.dueDate = dueDate;
		if (status) task.status = status;
		if (priority) task.priority = priority;
		if (tags) task.tags = tags;
		if (assignedTo) task.assignedTo = assignedTo;

		await task.save();
		await task.populate("assignedTo", "name email avatar");
		await task.populate("project", "name");

		res.status(200).json({
			message: "Task updated successfully",
			data: task,
		});
	} catch (e) {
		res.status(500).json({
			message: "Error updating task",
			error: e.message,
		});
	}
};

// Delete task
export const deleteTask = async (req, res) => {
	try {
		const { taskId } = req.params;

		const task = await taskModel.findById(taskId).populate("project");
		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		// Verify user is owner of the project
		const project = task.project;
		const isOwner = project.owner.toString() === req.user._id.toString();

		if (!isOwner) {
			return res
				.status(403)
				.json({ message: "Only project owner can delete tasks" });
		}

		await taskModel.findByIdAndDelete(taskId);

		res.status(200).json({
			message: "Task deleted successfully",
		});
	} catch (e) {
		res.status(500).json({
			message: "Error deleting task",
			error: e.message,
		});
	}
};

// Get tasks assigned to current user
export const getMyTasks = async (req, res) => {
	try {
		const tasks = await taskModel
			.find({ assignedTo: req.user._id })
			.populate("project", "name description")
			.populate("assignedTo", "name email avatar")
			.sort({ dueDate: 1, createdAt: -1 });

		res.status(200).json({
			status: "success",
			count: tasks.length,
			data: tasks,
		});
	} catch (e) {
		res.status(500).json({
			message: "Error fetching your tasks",
			error: e.message,
		});
	}
};

// Get tasks by status
export const getTasksByStatus = async (req, res) => {
	try {
		const { projectId, status } = req.params;

		// Validate status
		const validStatuses = ["todo", "pending", "completed"];
		if (!validStatuses.includes(status)) {
			return res.status(400).json({
				message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
			});
		}

		const tasks = await taskModel
			.find({ project: projectId, status })
			.populate("assignedTo", "name email avatar")
			.populate("project", "name")
			.sort({ priority: -1, dueDate: 1 });

		res.status(200).json({
			status: "success",
			count: tasks.length,
			data: tasks,
		});
	} catch (e) {
		res.status(500).json({
			message: "Error fetching tasks by status",
			error: e.message,
		});
	}
};

// Assign task to a user
export const assignTask = async (req, res) => {
	try {
		const { taskId } = req.params;
		const { assignedTo } = req.body;

		const task = await taskModel.findById(taskId).populate("project");
		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		// Verify user is owner or member of the project
		const project = task.project;
		const isOwner = project.owner.toString() === req.user._id.toString();
		const isMember = project.members.some(
			(m) => m.user.toString() === req.user._id.toString()
		);

		if (!isOwner && !isMember) {
			return res
				.status(403)
				.json({ message: "You are not allowed to assign tasks in this project" });
		}

		task.assignedTo = assignedTo;
		await task.save();
		await task.populate("assignedTo", "name email avatar");
		await task.populate("project", "name");

		res.status(200).json({
			message: "Task assigned successfully",
			data: task,
		});
	} catch (e) {
		res.status(500).json({
			message: "Error assigning task",
			error: e.message,
		});
	}
};

