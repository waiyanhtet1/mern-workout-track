import { useWorkoutContext } from "../hooks/useWorkoutContext";

const WorkoutDetail = ({ workout }) => {
  const { dispatch } = useWorkoutContext();

  const onDeleteHandler = async () => {
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    if (response.ok) dispatch({ type: "DELETE_WORKOUT", payload: workout._id });
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{workout.createdAt}</p>
      <span onClick={onDeleteHandler}>delete</span>
    </div>
  );
};

export default WorkoutDetail;
