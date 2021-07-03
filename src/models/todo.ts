import { ITodo } from "./../types/todo";
import mongoose, { Schema } from "mongoose";

const todoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const TodoModel = mongoose.model<ITodo>("Todo", todoSchema);

export default TodoModel;
