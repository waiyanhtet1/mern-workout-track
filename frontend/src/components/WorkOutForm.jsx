import { useState } from "react";
import { json } from "react-router-dom";

const WorkOutForm = () => {
  const [form, setForm] = useState({
    title: "",
    load: "",
    reps: "",
  });
  const [error, setError] = useState(null);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    } else {
      setForm({});
      console.log("Form Submitted!", data);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={onChangeHandler}
      />

      <label htmlFor="title">Load (Kg):</label>
      <input
        type="text"
        name="load"
        value={form.load}
        onChange={onChangeHandler}
      />

      <label htmlFor="title">Number of Reps:</label>
      <input
        type="text"
        name="reps"
        value={form.reps}
        onChange={onChangeHandler}
      />

      <div className="error">{error}</div>
      <button type="submit">Create</button>
    </form>
  );
};

export default WorkOutForm;
