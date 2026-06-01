import useLoginForm from "./useLoginForm";

function LoginForm() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    mfaRequired,
    mfaCode,
    setMfaCode,
    errorMessage,
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
                minLength="2"
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
                minLength="2"
                placeholder="Enter Password Here"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </label>

            {/* MFA code input — only shows if MFA is required */}
            {mfaRequired && (
              <label htmlFor="mfaCode">
                <span>MFA Code</span>
                <input
                  id="mfaCode"
                  type="text"
                  name="mfaCode"
                  minLength="6"
                  maxLength="6"
                  placeholder="Enter 6-digit code"
                  onChange={(e) => setMfaCode(e.target.value)}
                  value={mfaCode}
                />
              </label>
            )}

            <button disabled={isLoading} type="submit">
              {isLoading ? "Logging in..." : mfaRequired ? "Verify Code" : "Log in"}
            </button>
            <p>
              Not registered yet? <a href="/register">Register here</a>
            </p>
            {errorMessage && (
              <p className="error">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
