import React, { useState } from "react";
import { addTodo } from "./API";
import AddTodo from "./components/AddTodo";

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

  return (
    <section>
      <h1>Woongs Todo List</h1>
      <AddTodo saveTodo={handelSaveTodo} />
    </section>
  );
};

export default App;
