import mongoose from "mongoose"

const Notification = new mongoose.Schema({
    toUser : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    fromUser : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    title : {
        type : String,
        required : true
    },
    message : {
        type : String
    },
    data : {
        type : mongoose.Schema.Types.Mixed
    },
    isRead : {
        type : Boolean,
        default : false
    }
})

export const notification = mongoose.Model(Notification);