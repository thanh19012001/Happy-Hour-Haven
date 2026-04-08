import "../css/LoginForm.css";
function LoginForm() {
  return (
    <div>
      <div className="header">
        <h1>Happy Hour Heaven 🥂</h1>
        <h3>
          If drunk driving is illegal, then why are there parking lots near a
          pub?{" "}
        </h3>
      </div>
      <div className="login-wrapper">
        <div className="login-form">
          <h2 className="login-text">LOG IN</h2>
          <form>
            <label htmlFor="username">
              <span>Username</span>
              <input
                className="username-login-form"
                id="username"
                type="text"
                name="Username"
                required
                minLength="4"
                maxLength="10"
                placeholder="Enter Username Here"
              />
            </label>

            <label htmlFor="password">
              <span>Password</span>
              <input
                className="password-login-form"
                id="password"
                type="password"
                name="Password"
                required
                minLength="5"
                placeholder="Enter Password Here"
              />
            </label>

            <button type="submit">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
