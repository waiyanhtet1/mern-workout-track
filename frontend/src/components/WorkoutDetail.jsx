import { useWorkoutContext } from "../hooks/useWorkoutContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetail = ({ workout }) => {
  const { dispatch } = useWorkoutContext();

  const onDeleteHandler = async () => {
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: "DELETE",
    });
    await response.json();
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
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={onDeleteHandler}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetail;
