import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkOutForm = () => {
  const { dispatch } = useWorkoutContext();
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();

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

    if (!user) {
      setError("You must login first");
      return;
    }

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setEmptyFields(data.emptyFields);
    } else {
      setForm({ title: "", load: "", reps: "" });
      setError(null);
      dispatch({ type: "CREATE_WORKOUT", payload: data });
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        className={emptyFields.includes("title") ? "error" : ""}
        value={form.title}
        onChange={onChangeHandler}
      />

      <label htmlFor="load">Load (Kg):</label>
      <input
        type="text"
        name="load"
        className={emptyFields.includes("load") ? "error" : ""}
        value={form.load}
        onChange={onChangeHandler}
      />

      <label htmlFor="reps">Number of Reps:</label>
      <input
        type="text"
        name="reps"
        className={emptyFields.includes("reps") ? "error" : ""}
        value={form.reps}
        onChange={onChangeHandler}
      />

      {error && <div className="error">{error}</div>}
      <button type="submit">Create</button>
    </form>
  );
};

export default WorkOutForm;
