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
    required : [true, "email must present"],
    match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "please enter valid email"]
  },
  password : {
    type : String,
    reuired : [true, "password is required"],
    minlength : 6,
    select : false
  },
  avatar : {
    type : String,
    default : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  },
  workSpaces : {
    type : [{type : String}],
    ref : "workspace"
  },
  createdAt : {
    type : Date,
    default : Date.now
  }
})

export default mongoose.model("User", userModel);