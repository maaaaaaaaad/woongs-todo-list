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
