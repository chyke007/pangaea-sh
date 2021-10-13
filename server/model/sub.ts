
import { model, Document, Schema } from "mongoose";

const SubSchema:Schema = new Schema({
  topic: {
    type: "String",
    required: true,
  },
  url: []
  },{
    timestamps: true,
  });

export interface SubInterface extends Document{
    topic:string,
    url: Array<string>
}

export default  model<SubInterface>("sub", SubSchema);