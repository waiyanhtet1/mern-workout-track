import { useState } from "react";
import config from "../config";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetail = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const onDeleteHandler = async () => {
    setIsLoading(true);

    if (!user) {
      setIsLoading(false);
      return;
    }

    const response = await fetch(
      `${config.SERVER_URI}/api/workouts/${workout._id}`,
      {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    await response.json();
    if (response.ok) {
      setIsLoading(false);
      dispatch({ type: "DELETE_WORKOUT", payload: workout._id });
    }
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
      {isLoading ? (
        <span className="loader" />
      ) : (
        <span className="material-symbols-outlined" onClick={onDeleteHandler}>
          delete
        </span>
      )}
    </div>
  );
};

export default WorkoutDetail;
