// LogoutButton.jsx
import { useTranslation } from 'react-i18next';

const LogoutButton = ({ onLogout, className = '' }) => {
  const { t } = useTranslation();
  
  return (
    <button 
      onClick={onLogout}
      className={`logout-button ${className}`}
    >
      {t("logout", "Logout")}
    </button>
  );
};

export default LogoutButton;
