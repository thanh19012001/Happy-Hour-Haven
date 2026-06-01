import LanguageSwitcher from "./LanguageSwitcher";
import useLoginForm from "./useLoginForm";
import { useTranslation } from "react-i18next";

function LoginForm() {
  const { t } = useTranslation();
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
        <h1>{t("happyHourHeaven", "Happy Hour Heaven 🥂")}</h1>
        <h3>
          {t(
            "ifDrunkDrivingIsIllegalThenWhyAreThereParkingLotsNearAPub",
            "If drunk driving is illegal, then why are there parking lots near a pub?",
          )}
        </h3>
        <LanguageSwitcher />
      </div>
      <div className="login-wrapper">
        <div className="login-form">
          <h2 className="login-text">{t("login", "LOG IN")}</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              <span>{t("username", "Username")}</span>
              <input
                className="username-login-form"
                id="username"
                type="text"
                name="username"
                required
                minLength="2"
                maxLength="20"
                placeholder={t("enterUsernameHere", "Enter Username Here")}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </label>
            <label htmlFor="password">
              <span>{t("password", "Password")}</span>
              <input
                className="password-login-form"
                id="password"
                type="password"
                name="password"
                required
                minLength="2"
                placeholder={t("enterPasswordHere", "Enter Password Here")}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </label>

            {mfaRequired && (
              <label htmlFor="mfaCode">
                <span>{t("mfaCode", "MFA Code")}</span>
                <input
                  id="mfaCode"
                  type="text"
                  name="mfaCode"
                  minLength="6"
                  maxLength="6"
                  placeholder={t("enter6DigitCode", "Enter 6-digit code")}
                  onChange={(e) => setMfaCode(e.target.value)}
                  value={mfaCode}
                />
              </label>
            )}

            <button disabled={isLoading} type="submit">
              {isLoading
                ? t("loggingIn", "Logging in...")
                : mfaRequired
                  ? t("verifyCode", "Verify Code")
                  : t("logIn", "Log in")}
            </button>
            <p>
              {t("notRegisteredYet", "Not registered yet?")}{" "}
              <a href="/register">{t("registerHere", "Register here")}</a>
            </p>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
