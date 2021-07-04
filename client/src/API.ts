import axios, { AxiosResponse } from "axios";

const baseUrl: string = "http://localhost:4000";

const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todos = await axios.get(baseUrl + "/todos");
    return todos;
  } catch (error) {
    throw new Error(error);
  }
};

const addTodo = async (
  formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todo: Omit<ITodo, "_id"> = {
      name: formData.name,
      description: formData.description,
      status: false,
    };

    const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + "/post-todo",
      todo
    );
    return saveTodo;
  } catch (error) {
    throw new Error(error);
  }
};

const updateTodo = async (todo: ITodo): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todoUpdate: Pick<ITodo, "status"> = {
      status: true,
    };

    const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
      `${baseUrl}/edit-todo/${todo._id}`,
      todoUpdate
    );

    return updatedTodo;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteTodo = async (_id: string): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deleteTodo: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/delete-todo/${_id}`
    );

    return deleteTodo;
  } catch (error) {
    throw new Error(error);
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
