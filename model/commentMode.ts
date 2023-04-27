import { Schema, model } from "mongoose";

const commentSchema: Schema = new Schema({
    foodItem: [{
        foodId:
        {
            name: { type: String, require: true },
            description: { type: String, require: true },
            rating: { type: Number, require: true },
            price: { type: Number, require: true },
        }
    }],
    Sender: { type: String, require: true },
    Text: { type: String, require: true },
},
    { timestamps: true }
);

const commentModel: any = model("comment", commentSchema);
export default commentModel;