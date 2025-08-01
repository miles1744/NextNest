import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "../styles/signin.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signInUser, signInAsGuest } = UserAuth(); 
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInUser(email, password);
      if (result.success) {
        navigate("/dashboard");
      }
    } catch {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    signInAsGuest();
    navigate("/dashboard");
  };

  return (
      <div className="signin-page">
        <form onSubmit={handleSignIn} className="signin-container">
          <h1>NextNest</h1>
          <h2>Sign in today!</h2>
          <p>
            Don't have an account?{" "}
            <Link to={"/signup"} className="signup-link">
              Sign up!
            </Link>
          </p>
    
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
    
          <button type="submit" disabled={loading}>
            Sign in
          </button>
    
          {error && <p>{error}</p>}
    
          <button
            type="button"
            onClick={handleGuest}
            style={{ marginTop: "1rem" }}
          >
            Continue as Guest
          </button>
        </form>
      </div>
    
  );
};

export default SignIn;
