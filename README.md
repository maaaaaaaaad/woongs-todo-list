# Full stack Todo list

**Stack**

1. Whole language: Typescript
2. Front-End: ReactJS
3. Back-End: NodeJS(Express)
4. API fetcher: Axios

# First, Back-End Code

## 1. Post Todo data (Create)

```javascript
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
```

- Core code

```javascript
const body = req.body as Pick<ITodo, "name" | "description" | "status">;
```

## 2. Get Todo data (Read)

```javascript
const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await TodoModel.find({});
    res.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
};
```

## 3. Update Todo data (Update)

```javascript
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
```

## 4. Delete Todo data (Delete)

```javascript
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
```

- And next, export CRUD

## 5. Routes

```javascript
import { Router } from "express";
import {
  deleteTodo,
  getTodos,
  postTodo,
  updateTodo,
} from "../controllers/todos";

const router: Router = Router();

router.get("/todos", getTodos);
router.post("/post-todo", postTodo);
router.put("/edit-todo/:id", updateTodo);
router.delete("/delete-todo/:id", deleteTodo);

export default router;
```

- Finish Back-End Code 🙂

# Second Create API Code

**Fist of all, Create a type.d.ts file**

```javascript
interface ITodo {
  _id: string;
  name: string;
  description: string;
  status: boolean;
  createAt?: string;
  updateAt?: string;
}

interface TodoProps {
  todo: ITodo;
}

type ApiDataType = {
  message: string,
  status: string,
  todos: ITodo[],
  todo?: ITodo,
};
```

## 1. Axios get API Code

```javascript
const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todos = await axios.get(baseUrl + "/todos");
    return todos;
  } catch (error) {
    throw new Error(error);
  }
};
```

## 2. Axios post API Code

```javascript
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
```

- Caution, Omit the "id" property because MongoDB will create it on the fly.

## 3. Axios put API Code

```javascript
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
```
