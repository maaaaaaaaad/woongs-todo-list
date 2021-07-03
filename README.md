# Full stack Todo list

**Stack**

1. Whole language: Typescript
2. Front-End: ReactJS
3. Back-End: NodeJS(Express)

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
