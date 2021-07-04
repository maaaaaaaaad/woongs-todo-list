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
