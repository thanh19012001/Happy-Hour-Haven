import "../css/LoginForm.css";
import useLoginForm from "./useLoginForm";

function LoginForm() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    errorMessage,
    isError,
    isLoading,
    handleSubmit,
  } = useLoginForm();
  return (
    <div>
      <div className="header">
        <h1>Happy Hour Heaven 🥂</h1>
        <h3>
          If drunk driving is illegal, then why are there parking lots near a
          pub?
        </h3>
      </div>
      <div className="login-wrapper">
        <div className="login-form">
          <h2 className="login-text">LOG IN</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              <span>Username</span>
              <input
                className="username-login-form"
                id="username"
                type="text"
                name="username"
                required
                minLength="4"
                maxLength="10"
                placeholder="Enter Username Here"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </label>

            <label htmlFor="password">
              <span>Password</span>
              <input
                className="password-login-form"
                id="password"
                type="password"
                name="password"
                required
                minLength="5"
                placeholder="Enter Password Here"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </label>
            <button disabled={isLoading} type="submit">
              {isLoading ? "Logging in ..." : "Log in"}
            </button>
            <p>
              Not registered yet? <a href="/register">Register here</a>
            </p>

            {errorMessage && (
              <p className={isError ? "error" : "success"}>{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
