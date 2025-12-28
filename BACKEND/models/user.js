import mongoose from "mongoose"

const userModel = new mongoose.Schema({
  name : {
    type : String,
    required : [true, "name is required"],
    trim : true
  },
  email : {
    type : String,
    unique : true,
    required : [true, "email must present"]
  },
  password : {
    type : String,
    reuired : [true, "password is required"],
    minlength : 6,
    select : flase
  },
  avatar : {
    type : String,
    default : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  },
  workSpaces : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "workspace"
  },
  createdAt : {
    type : Date,
    default : Date.now
  }
})
    
