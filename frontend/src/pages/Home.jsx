import { useEffect, useState } from "react";
import WorkoutDetail from "../components/WorkoutDetail";

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
          workouts.map((workout) => <WorkoutDetail workout={workout} />)}
      </div>
    </div>
  );
};

export default Home;
