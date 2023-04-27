import { Schema, model } from "mongoose";

const foodSchema: Schema = new Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    rating: { type: Number, require: true },
    price: { type: Number, require: true },
    isActive: { type: Boolean, require: true, default: true },
    images: { type: [String], require: true, default: [] },
    user: { type: String, require: true },
},
    { timestamps: true }
);

const foodModel: any = model("food", foodSchema);
export default foodModel;