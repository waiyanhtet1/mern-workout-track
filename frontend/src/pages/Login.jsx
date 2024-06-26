import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, isLoading, error } = useSignup("login");

  const handleSubmit = async (e) => {
    e.preventDefault();

    auth(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      {isLoading ? <span class="loader"></span> : <button>Log in</button>}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
