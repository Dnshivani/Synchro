import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    members : [
        {
            user : {type : mongoose.Schema.Types.ObjectId , ref : 'User'},
            role : {type : String, enum : ['Admin', 'Editor', 'viewer'], default : 'Editor'}
        }
    ],
    startDate : {
        type : Date,
    },
    deadLine : {
        type : Date,
    },
    status : {
        type : String,
        enum : ['onGoing', 'completed', 'droped', 'holdOn']
    }
},{
    timeStamps : true,
    toJSON : {virtuals : true},
    toObject : {virtuals : true}
});
projectSchema.virtual('tasks', {
    ref : 'Task',
    localField : '_id',
    foreginField : 'Project'
});

const projectModel = mongoose.model('Project', projectSchema);
export default projectModel;