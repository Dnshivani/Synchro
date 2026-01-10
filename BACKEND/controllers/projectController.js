import project from "../models/project"

export const createNewProject = async (req, res) => {
    const {name, description, owner} = req.body;
  try {
    const newProject = await project.create({
        name : name,
        description : description,
        members : [{
            user : owner, role : 'Admin'
        }],
        ...req.body
    });
    if (newProject) {
        newProject.populate([
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
            owner : newProject.owner
        })
    }
  } catch (e) {
    res.status(403).json({
        message : "the user is not created"
    })
  }
}