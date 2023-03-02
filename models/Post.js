import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true, //обязательное
        },
        text: {
            type: String,
            required: true,
            unique: true, //только уникальные
        },
        // tags: { 
        //     type: Array,
        //     default: [],
        // },
        viewsCount: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel',
            required: true,
        },
        imageUrl: String, //необязательный
        },
    {
        timestamps: true,
    },
);
export default mongoose.model('Post', PostSchema);