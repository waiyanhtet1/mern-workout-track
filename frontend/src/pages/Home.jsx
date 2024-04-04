import { useEffect, useState } from "react";
import WorkoutDetail from "../components/WorkoutDetail";
import WorkOutForm from "../components/WorkOutForm";

const Home = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch("/api/workouts");
      const result = await response.json();

      if (response.ok) setWorkouts(result);
    };
    fetchWorkout();
  }, []);

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
