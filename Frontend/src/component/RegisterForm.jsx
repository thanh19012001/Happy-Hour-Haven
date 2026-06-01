import useRegisterForm from "./useRegisterForm";
import { useTranslation } from 'react-i18next';
import { Link } from "@tanstack/react-router"; // Thêm import Link
import LanguageSwitcher from './LanguageSwitcher'; // Đảm bảo đường dẫn đúng

function RegisterForm() {
  const { t } = useTranslation();
  const {
    username,
    setUsername,
    password,
    setPassword,
    handleRegister,
    isLoading,
    errorMessage, // Đổi từ error thành errorMessage
    isRegister,
  } = useRegisterForm();

  return (
    <div>
      <div className="header">
        <h1>{t('happyHourHeaven', 'Happy Hour Heaven 🥂')}</h1>
        <h3>
          {t('ifDrunkDrivingIsIllegalThenWhyAreThereParkingLotsNearAPub', 
             'If drunk driving is illegal, then why are there parking lots near a pub?')}
        </h3>
        <LanguageSwitcher /> {/* Đây là chỗ dùng LanguageSwitcher */}
      </div>
      <div className="login-wrapper">
        <div className="login-form">
          <h2 className="register-text">{t('register', 'REGISTER')}</h2>
          <form onSubmit={handleRegister}>
            <label htmlFor="username">
              <span>{t('username', 'Username')}</span>
              <input
                className="username-register-form"
                id="username"
                type="text"
                name="username"
                required
                minLength="2" // Nên để 2 thay vì 1
                maxLength="10"
                placeholder={t('enterUsernameHere', 'Enter Username Here')}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </label>

            <label htmlFor="password">
              <span>{t('password', 'Password')}</span>
              <input
                className="password-register-form"
                id="password"
                type="password"
                name="password"
                required
                minLength="2" 
                placeholder={t('enterPasswordHere', 'Enter Password Here')}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </label>
            
            <button disabled={isLoading} type="submit">
              {isLoading ? t('loading', 'Loading...') : t('register', 'Register')}
            </button>

            {/* Sửa cách hiển thị error */}
            {errorMessage && (
              <p className="error">{errorMessage}</p>
            )}

            {isRegister && (
              <div className="success">
                <p>{t('registrationSuccessful', 'Registration successful!')}</p>
                <Link to="/">
                  <p>{t('backToLogin', 'Back to Login')}</p>
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
