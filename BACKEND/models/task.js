import mongoose from "mongoose"

const task = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        trim : true
    },
    project : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project',
        required : true
    },
    assignedTo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    status : {
        type : String,
        enum : ["todo", "pending", "completed"],
        default : "todo"
    },
    priority : {
        type : String,
        enum : ["low", "medium", "high"],
        default : "medium"
    }
},
     {
        timestamps : true
     })

const taskModel = mongoose.model('Task', task);
export default taskModel;