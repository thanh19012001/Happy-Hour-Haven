import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QRCodeSVG } from "qrcode.react";
import { useTranslation } from "react-i18next";
import { useAvatar } from "./AvatarContext";
import AvatarUploader from "./AvatarUploader";
import LanguageSwitcher from "./LanguageSwitcher";
import { useNavigate, Link } from "@tanstack/react-router";
 
const MyAccountPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [mfaUri, setMfaUri] = useState(null);
  const [mfaCode, setMfaCode] = useState("");
  const [mfaMessage, setMfaMessage] = useState(null);
  const [showMfaSetup, setShowMfaSetup] = useState(false);
  const token = localStorage.getItem("access");
  const { setAvatar } = useAvatar();
 
  const fetchCurrentUser = async () => {
    const res = await fetch("http://localhost:8000/user/me/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch user data");
    return res.json();
  };
 
  const { data: currentUser, isLoading, isError, refetch } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    staleTime: 5 * 60 * 1000,
  });
 
  const handleUpdateAvatar = async (avatarDataUrl) => {
    try {
      const blob = await fetch(avatarDataUrl).then((r) => r.blob());
      const formData = new FormData();
      formData.append("avatar", blob, "avatar.png");
      const res = await fetch("http://127.0.0.1:8000/user/me/", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setAvatar(data.avatar);
        refetch();
        alert(t("avatarUpdatedSuccessfully", "Avatar updated successfully!"));
      }
    } catch (err) {
      console.error("Error updating avatar:", err);
    }
  };
 
  const handleStartMfaSetup = async () => {
    const res = await fetch("http://localhost:8000/mfa/setup/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMfaUri(data.uri);
    setShowMfaSetup(true);
  };
 
  const handleEnableMfa = async () => {
    const res = await fetch("http://localhost:8000/mfa/enable/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: mfaCode }),
    });
    const data = await res.json();
    if (data.detail) {
      setMfaMessage(t("mfaEnabledSuccessfully", "MFA enabled successfully!"));
      setShowMfaSetup(false);
      refetch();
    } else {
      setMfaMessage(t("invalidCodePleaseTryAgain", "Invalid code, please try again."));
    }
  };
 
  const handleDeleteAccount = async () => {
    if (!window.confirm(t("confirmDeleteAccount", "Are you sure? This cannot be undone!"))) return;
    try {
      const res = await fetch("http://127.0.0.1:8000/delete-account/", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        localStorage.removeItem("access");
        sessionStorage.removeItem("access");
        navigate({ to: "/" });
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
 
  if (isLoading) return <div>{t("loading", "Loading...")}</div>;
  if (isError) return <div>{t("errorLoadingAccountInformation", "Error loading account information.")}</div>;
 
  return (
    <>
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
 
      <div className="account-body">
        <div className="account-card">
          <h2>{t("myAccount", "My Account")}</h2>
 
          {currentUser ? (
            <>
              <p>{t("usernameUsername", "Username: {{username}}", { username: currentUser.username })}</p>
              <p>{t("memberSinceDate", "Member since: {{date}}", { date: currentUser.date_joined })}</p>
 
              <AvatarUploader
                currentAvatar={currentUser.avatar}
                onUpdateAvatar={handleUpdateAvatar}
                chooseFileLabel={t("chooseFile", "Choose File")}
              />
 
              <p>
                {t("mfaEnabledStatus", "MFA Enabled:")}{" "}
                {currentUser.mfa_enabled ? t("yes", "Yes") : t("no", "No")}
              </p>
 
              {!currentUser.mfa_enabled && !showMfaSetup && (
                <button className="account-card__btn" onClick={handleStartMfaSetup}>
                  {t("enableTwoFactorAuthentication", "Enable Two-Factor Authentication")}
                </button>
              )}
 
              {showMfaSetup && (
                <div className="mfa-setup">
                  <p>{t("scanQrCodeWithAuthenticator", "Scan this QR code with Google Authenticator:")}</p>
                  <QRCodeSVG value={mfaUri} size={200} />
                  <input
                    type="text"
                    placeholder={t("enter6DigitCode", "Enter 6-digit code")}
                    maxLength="6"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value)}
                  />
                  <button className="account-card__btn" onClick={handleEnableMfa}>
                    {t("verifyEnableMfa", "Verify & Enable MFA")}
                  </button>
                </div>
              )}
 
              {mfaMessage && <p>{mfaMessage}</p>}
 
              <div className="account-card__actions">
                <button className="account-card__btn--danger account-card__btn" onClick={handleDeleteAccount}>
                  {t("deleteAccount", "Delete Account")}
                </button>
              </div>
            </>
          ) : (
            <p>{t("userNotFoundPleaseLogInAgain", "User not found. Please log in again.")}</p>
          )}
        </div>
 
        <Link to="/home_page">
          <button className="account-card__home-btn">
            {t("home", "Home")}
          </button>
        </Link>
      </div>
    </>
  );
};
 
export default MyAccountPage;
