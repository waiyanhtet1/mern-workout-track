import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import config from "../config";

const WorkOutForm = () => {
  const { dispatch } = useWorkoutContext();
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    if (!user) {
      setError("You must login first");
      return;
    }

    const response = await fetch(`${config.SERVER_URI}/api/workouts`, {
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
      setIsLoading(false);
      setEmptyFields(data.emptyFields);
    } else {
      setForm({ title: "", load: "", reps: "" });
      setError(null);
      setIsShow(false);
      setIsLoading(false);
      dispatch({ type: "CREATE_WORKOUT", payload: data });
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="form_header" onClick={() => setIsShow((prev) => !prev)}>
        <h2>Add New Workout</h2>
        <span className="material-symbols-outlined">
          {isShow ? "Close" : "Add"}
        </span>
      </div>

      {isShow && (
        <>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            className={emptyFields?.includes("title") ? "error" : ""}
            value={form.title}
            onChange={onChangeHandler}
          />

          <label htmlFor="load">Load (Kg):</label>
          <input
            type="text"
            name="load"
            className={emptyFields?.includes("load") ? "error" : ""}
            value={form.load}
            onChange={onChangeHandler}
          />

          <label htmlFor="reps">Number of Reps:</label>
          <input
            type="text"
            name="reps"
            className={emptyFields?.includes("reps") ? "error" : ""}
            value={form.reps}
            onChange={onChangeHandler}
          />

          {error && <div className="error">{error}</div>}
          {isLoading ? (
            <span className="loader" />
          ) : (
            <button type="submit">Create</button>
          )}
        </>
      )}
    </form>
  );
};

export default WorkOutForm;
