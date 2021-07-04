import { ITodo } from "../../types/ITodo";
import TodoModel from "../../models/TodoModel";
import { Request, Response } from "express";

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await TodoModel.find({});
    res.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
};

const postTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodo, "name" | "description" | "status">;

    const postTodo: ITodo = new TodoModel({
      name: body.name,
      description: body.description,
      status: body.status,
    });

    const createTodo: ITodo = await postTodo.save();
    const allTodos: ITodo[] = await TodoModel.find({});

    res
      .status(200)
      .json({ message: "Add to Todos", Todo: createTodo, Todos: allTodos });
  } catch (error) {
    throw error;
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const updateTodo: ITodo | null = await TodoModel.findByIdAndUpdate(
      { _id: id },
      body
    );

    const allTodos: ITodo[] = await TodoModel.find({});

    res
      .status(200)
      .json({ message: "Update to Todos", Todo: updateTodo, Todos: allTodos });
  } catch (error) {
    throw error;
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleteTodo: ITodo | null = await TodoModel.findByIdAndRemove(
      req.params.id
    );

    const allTodos: ITodo[] = await TodoModel.find({});

    res
      .status(200)
      .json({ message: "Update to Todos", Todo: deleteTodo, Todos: allTodos });
  } catch (error) {
    throw error;
  }
};

export { getTodos, postTodo, updateTodo, deleteTodo };
