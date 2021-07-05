import React from "react";

type Props = TodoProps & {
  updateTodo: (todo: ITodo) => void;
  deleteTodo: (_id: string) => void;
};

const TodoItemList: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  return (
    <section>
      <header>
        <h1>{todo.name}</h1>
        <div>{todo.description}</div>
      </header>
      <main>
        <button onClick={() => updateTodo(todo)}></button>
        <button onClick={() => deleteTodo(todo._id)}></button>
      </main>
    </section>
  );
};

export default TodoItemList;
