import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./Auth.css";
import { useLoginMutation } from "../store/services/AuthServices";
import { setCredentials } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";

const inputClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500";
const hasValidUser = (user) => Boolean(user?.uuid || user?.id || user?.email);

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const from = location.state?.from?.pathname ?? "/";

  const [login] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const formData = new FormData(form);
      const email = formData.get("email") ?? "";
      const password = formData.get("password") ?? "";
      const response = await login({ email, password }).unwrap();
      console.log("response", response);
      const resolvedUser = response?.user ?? response?.data?.user ?? null;
      dispatch(setCredentials({ user: resolvedUser }));
      if (hasValidUser(resolvedUser)) {
        navigate(from || "/roles", { replace: true });
      } else {
        // toast.error("Invalid credentials");
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      // toast.error(error.data.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Log in</h1>
        <p className="auth-subtitle">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="login-email" className="auth-label">
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>
          <div className="auth-field">
            <label htmlFor="login-password" className="auth-label">
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className={inputClass}
            />
          </div>
          <Button type="submit" variant="primary" className="auth-submit">
            Log in
          </Button>
        </form>

        {/* <p className="auth-footer">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="auth-link">
            Sign up
          </Link>
        </p> */}
      </div>
    </div>
  );
}

export default Login;
