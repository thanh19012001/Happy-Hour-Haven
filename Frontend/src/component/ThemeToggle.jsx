
import "../css/themeToggle.css";
export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      className="toggle-btn"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="toggle-track">
        <div className="toggle-thumb" />
      </div>
      <span className="toggle-icon">{isDark ? "🌙" : "☀️"}</span>
      <span className="toggle-label">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}