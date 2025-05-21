import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    token: {
        type: String,
        required:true,
    },
    association: {
        type:String,
    },
    expire: {
        type: Date,
        default: new Date(Date.now() + (1000 * 60 * 60)),
        expires: 0,
    },
},
    { timestamp: true, }
)
export default mongoose.model("Session",SessionSchema)