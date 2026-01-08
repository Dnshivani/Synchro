import mongoose from "mongoose"

const workspace = new mongoose.Schema({
    name: {
        type: String,
        required : true,
        maxLength : [50, "name is too long"]
    },
    description : {
        type : String,
        maxLength : [500, "The description limit exceeded"]
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    members : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    createdAt : {
        type : Date,
        default : Date.now()
    }
},
    {
        toJSON : {virtuals: true},
        toObject : {virtuals : true}
    });

workspace.virtual('tasks', {
    ref : 'Task',
    localField : "_id",
    foreignField : "WorkSpace",
    justOne : false
});

const WorkSpaceSchema = mongoose.model('Workspace', workspace);
export default WorkSpaceSchema;