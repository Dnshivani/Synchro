import projectModel from "../models/project.js"

export const createNewProject = async (req, res) => {
    const {name, description, members} = req.body;
    const owner = await req.user._id;
    const existingProject = await projectModel.findOne({ 
        name: name, 
        owner: req.user._id 
    });

    if (existingProject) {
        return res.status(400).json({ 
            message: `You already have a project with this name! -- ${name}`
        });
    }
    let projectMembers = [req.user._id]; 
    if (members && Array.isArray(members)) {
      projectMembers = [...new Set([...projectMembers, ...members])]; 
    }
  try {
    const newProject = await projectModel.create({
        name : name,
        description : description,
        owner : owner,
        members : projectMembers,
        ...req.body
    });
    if (newProject) {
        await newProject.populate([
            {
                path : 'owner', select : 'name'
            },
            {
                path : 'members', select : 'name'
            }
        ])
        res.status(200).json({
            message : "new project created!",
            name : newProject.name,
            createdAt : newProject.startDate,
            deadline : newProject.deadline,
            owner : newProject.owner,
            members : newProject.members
        })
    }
  } catch (e) {
    res.status(403).json({
        message : e.message
    })
  }
}

export const getMyProjects = async (req, res) => {
    try {
        const projects = await projectModel.find({
            $or: [
                { owner: req.user._id },
                { "members.user": req.user._id }
            ]
        })
        .populate('owner', 'name email')
        .populate('members.user', 'name email avatar')
        .lean();

        const cleanedProjects = projects.map(project => ({
            ...project,
            members: project.members
                .filter(m => m.user !== null)
                .map(m => ({
                    userId: m.user._id,
                    name: m.user.name,
                    role: m.role
                }))
        }));

        res.status(200).json({
            status: "success",
            count: cleanedProjects.length,
            data: {
                projects: cleanedProjects
            }
        });
    } catch (e) {
        res.status(500).json({ 
            status: "error", 
            message: "Could not fetch your projects",
            error: e.message 
        });
    }
};

export const getProject = async (req, res) => {
    const id = req.params.id;
    try {
        const project = await projectModel.findById(id)
            .populate({
                path: 'members.user',   
                select: 'name email'
            })
            .populate('owner', 'name email'); 
        const cleanMembers = project.members
            .filter(m => m.user !== null) 
            .map(m => ({
                userId: m.user._id,
                name: m.user.name,
                email: m.user.email,
                role: m.role
            }));
        if (project) {
            const projectData = project.toObject();
            res.status(200).json({
                message : `This is the project referenced to ${id}`,
                data: {
                id: project._id,
                name: project.name,
                description: project.description,
                owner: project.owner,
                members: cleanMembers, 
                startDate: project.startDate
            }
            })
        }
    } catch(e) {
    res.status(404).json({
        message: "project not found"
    })
}
} 