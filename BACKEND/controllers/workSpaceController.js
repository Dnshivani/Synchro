import WorkSpace from "../models/workSpace.js"
export  const createWorkSpace = async (req, res) => {
    const {name, description} = await req.body;
    try {
        const newWorkspace = await WorkSpace.create({
            name : name,
            description : description,
            owner : req.user._id,
            members : [req.user._id]
        })
        if (newWorkspace) {
            await newWorkspace.populate([
                {path:'owner', select:'name'},
                {path:'members', select:'name'}
            ])
            res.status(200).json({
                message : "The new Workspace created",
                name : newWorkspace.name,
                description : newWorkspace.description,
                owner : newWorkspace.owner
            })
        }
    }catch (e) {
        res.status(403).json({
            message: e.message(),
            todo : "The user is not registered , do register"
        })
    }
}