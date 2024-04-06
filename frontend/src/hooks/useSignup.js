import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(result.error);
    } else {
      // store in locastorage
      localStorage.setItem("user", JSON.stringify(result));

      // update auth context
      dispatch({ type: "LOGIN", payload: result });
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
