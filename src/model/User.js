import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userId: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    nickName: {type: String, required: true, unique: true},
    date: {type: Date, required: true, default: Date.now},
    

});

const User = mongoose.model("User", UserSchema);

export default User;