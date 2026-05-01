import useRegisterForm from "./useRegisterForm";
import "../css/RegisterForm.css";

function RegisterForm() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    handleRegister,
    isLoading,
    isError,
    error,
  } = useRegisterForm();
  return (
    <div>
      <div className="header">
        <h1>Happy Hour Heaven 🥂</h1>
        <h3>
          If drunk driving is illegal, then why are there parking lots near a
          pub?
        </h3>
      </div>
      <div className="register-wrapper">
        <div className="register-form">
          <h2 className="register-text">REGISTER</h2>
          <form onSubmit={handleRegister}>
            <label htmlFor="username">
              <span>Username</span>
              <input
                className="username-register-form"
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
                className="password-register-form"
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
              {isLoading ? "Loading..." : "Register"}
            </button>

            {<p className={isError ? "error" : "success"}>{error?.Message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
