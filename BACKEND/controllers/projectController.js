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