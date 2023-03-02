import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
    fullName:{
        type: String,
        required: true, //обязательное
    },
    email: {
        type: String,
        required: true,
        unique: true, //только уникальные
    },
    passwordHash: { //хранить только хэш
        type: String,
        required:true,
    },
    avatarUrl: String, //необязательный
    },
    {
        timestamps: true,
    },
);
export default mongoose.model('UserModel', UserSchema);