import { useEffect } from "react";
import WorkoutDetail from "../components/WorkoutDetail";
import WorkOutForm from "../components/WorkOutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch("/api/workouts");
      const result = await response.json();

      if (response.ok) dispatch({ type: "SET_WORKOUT", payload: result });
    };
    fetchWorkout();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetail key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkOutForm />
    </div>
  );
};

export default Home;
