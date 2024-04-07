import { useEffect } from "react";
import WorkoutDetail from "../components/WorkoutDetail";
import WorkOutForm from "../components/WorkOutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch(`/api/workouts`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const result = await response.json();

      if (response.ok) dispatch({ type: "SET_WORKOUT", payload: result });
    };
    if (user) fetchWorkout();
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts?.length === 0 ? (
          <h2>No Workouts yet!</h2>
        ) : (
          workouts?.map((workout) => (
            <WorkoutDetail key={workout._id} workout={workout} />
          ))
        )}
      </div>
      <WorkOutForm />
    </div>
  );
};

export default Home;
