
import { model, Document, Schema } from "mongoose";

const PubSchema = new Schema({
  topic: {
    type: "String",
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  uri: {
    type: "String",
    required: true,
  }
},{
    timestamps: true,
  });

  export interface PubInterface extends Document{
    topic:string,
    data: Record<string, unknown>,
    uri: Array<string>
}

export default model<PubInterface>("pub", PubSchema);