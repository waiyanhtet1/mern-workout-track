import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // remove user from locastorage
    localStorage.removeItem("user");

    // dispatch from authContext
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
