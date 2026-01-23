import projectModel from "../models/project.js"

export const createNewProject = async (req, res) => {
    const {name, description} = req.body;
    const owner = await req.user._id;

  try {
    const newProject = await projectModel.create({
        name : name,
        description : description,
        owner : owner,
        members : [{
            user : owner, role : 'Admin'
        }],
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
                { members: req.user._id }
            ]
        })
        .populate('owner', 'name') 
        .sort({ createdAt: -1 });      

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error?.response?.data });
    }
};

export const getProject = async (req, res) => {
    const {id} = req.params.id;
    try {
        const project = await projectModel.findById(id);
        if (project) {
            res.status(200).json({
                message : `This is the project referenced to ${id}`,
                ...project
            })
        }
    } catch(e) {
    res.status(404).json({
        message: "project not found"
    })
}
} 