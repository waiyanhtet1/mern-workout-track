import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();

  const onLogoutHandler = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          <div>
            <button onClick={onLogoutHandler}>Logout</button>
          </div>
          <Link to="/login">Login</Link>
          <Link to="/signup">SignUp</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
