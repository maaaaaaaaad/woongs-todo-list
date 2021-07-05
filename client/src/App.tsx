import React, { useState } from "react";
import { addTodo, deleteTodo, updateTodo } from "./API";
import AddTodo from "./components/AddTodo";
import TodoItemList from "./components/TodoItemList";

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handelSaveTodo = (event: React.FormEvent, formData: ITodo): void => {
    event.preventDefault();
    addTodo(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Not saved Todo data Please try again");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Not updated Todo data Please try again");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Not delete Todo data Please try again");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section>
      <h1>Woongs Todo List</h1>
      <AddTodo saveTodo={handelSaveTodo} />
      {todos.map((todo: ITodo) => (
        <TodoItemList
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </section>
  );
};

export default App;
