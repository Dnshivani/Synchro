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
        ref : 'User',
        required : true
    },
    members : [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            role: { type: String, enum: ['Admin', 'Editor', 'Viewer'], default: 'Editor' }
        }
    ],
    startDate : {
        type : Date,
        default : Date.now()
    },
    deadLine : {
        type : Date,
    },
    status : {
        type : String,
        enum : ['active', 'onGoing', 'completed', 'droped', 'holdOn']
    }
},{
    timeStamps : true,
    toJSON : {virtuals : true},
    toObject : {virtuals : true}
});
projectSchema.virtual('tasks', {
    ref : 'Task',
    localField : '_id',
    foreignField : 'Project'
});

const projectModel = mongoose.model('Project', projectSchema);
export default projectModel;