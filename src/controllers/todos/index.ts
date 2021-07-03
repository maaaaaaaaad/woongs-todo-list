import { ITodo } from "./../../types/todo";
import TodoModel from "../../models/todo";
import { Request, Response } from "express";

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await TodoModel.find();
    res.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
};

const postTodo = () => {};
