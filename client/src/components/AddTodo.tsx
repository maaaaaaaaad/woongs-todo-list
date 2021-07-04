import React, { useState } from "react";

type Props = {
  saveTodo: (event: React.FormEvent, formData: ITodo) => void;
};

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<ITodo | {}>();

  const handleForm = (event: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value,
    });
    formData && console.log(formData);
  };

  return (
    <form onSubmit={(event) => formData && saveTodo(event, formData as ITodo)}>
      <section>
        <div>
          <label htmlFor="name"></label>
          <input
            onChange={handleForm}
            type="text"
            id="name"
            placeholder="Name"
            autoComplete="off"
            required
          />
        </div>
        <div>
          <label htmlFor="description"></label>
          <input
            onChange={handleForm}
            type="text"
            id="description"
            placeholder="Description"
            autoComplete="off"
            required
          />
        </div>
      </section>
      <button disabled={formData === undefined ? true : false}>Add Todo</button>
    </form>
  );
};

export default AddTodo;
