import { useTheme } from "../../context/ThemeContext";

import {
  FaSun,
  FaMoon,
  FaDesktop,
  FaPalette,
  FaMagic,
  FaCompressAlt,
} from "react-icons/fa";

function DisplaySettings() {
  const { theme, setTheme } = useTheme();

  return (
    <div>

      <h3 className="settings-title">
        Display Settings
      </h3>

      {/* Theme */}

      <div className="settings-card">

        <div className="settings-card-header">

          <FaDesktop />

          <h5>Theme</h5>

        </div>

        <div className="theme-grid">

          <button
            className={
              theme === "light"
                ? "theme-option active"
                : "theme-option"
            }
            onClick={() => setTheme("light")}
          >
            <FaSun />
            <span>Light</span>
          </button>

          <button
            className={
              theme === "dark"
                ? "theme-option active"
                : "theme-option"
            }
            onClick={() => setTheme("dark")}
          >
            <FaMoon />
            <span>Dark</span>
          </button>

          <button
            className={
              theme === "system"
                ? "theme-option active"
                : "theme-option"
            }
            onClick={() => setTheme("system")}
          >
            <FaDesktop />
            <span>System</span>
          </button>

        </div>

      </div>

      {/* Accent */}

      <div className="settings-card">

        <div className="settings-card-header">

          <FaPalette />

          <h5>Accent Color</h5>

        </div>

        <div className="color-picker">

          <span className="color blue"></span>

          <span className="color purple"></span>

          <span className="color green"></span>

          <span className="color orange"></span>

          <span className="color red"></span>

        </div>

      </div>

      {/* Toggles */}

      <div className="settings-card">

        <div className="toggle-row">

          <div>

            <FaMagic />

            <span>Animations</span>

          </div>

          <label className="switch">

            <input type="checkbox" defaultChecked />

            <span className="slider"></span>

          </label>

        </div>

        <hr />

        <div className="toggle-row">

          <div>

            <FaCompressAlt />

            <span>Compact Mode</span>

          </div>

          <label className="switch">

            <input type="checkbox" />

            <span className="slider"></span>

          </label>

        </div>

      </div>

    </div>
  );
}

export default DisplaySettings;