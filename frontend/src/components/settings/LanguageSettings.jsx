import { useEffect, useState } from "react";
import {
  FaLanguage,
  FaFont,
  FaPalette,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

function LanguageSettings() {

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  );

  const [fontSize, setFontSize] = useState(
    localStorage.getItem("fontSize") || "medium"
  );

  const [accent, setAccent] = useState(
    localStorage.getItem("accent") || "blue"
  );

  const [dateFormat, setDateFormat] = useState(
    localStorage.getItem("dateFormat") || "DD/MM/YYYY"
  );

  const [timeFormat, setTimeFormat] = useState(
    localStorage.getItem("timeFormat") || "12 Hour"
  );

  useEffect(() => {

    localStorage.setItem("language", language);

  }, [language]);

  useEffect(() => {

    localStorage.setItem("fontSize", fontSize);

    document.body.classList.remove(
      "font-small",
      "font-medium",
      "font-large"
    );

    document.body.classList.add(
      `font-${fontSize}`
    );

  }, [fontSize]);

  useEffect(() => {

    localStorage.setItem("accent", accent);

    document.body.classList.remove(
      "accent-blue",
      "accent-green",
      "accent-purple",
      "accent-red",
      "accent-orange"
    );

    document.body.classList.add(
      `accent-${accent}`
    );

  }, [accent]);

  useEffect(() => {

    localStorage.setItem("dateFormat", dateFormat);

  }, [dateFormat]);

  useEffect(() => {

    localStorage.setItem("timeFormat", timeFormat);

  }, [timeFormat]);

  return (

    <div className="language-settings">

      <h4 className="settings-title">

        Language & Personalization

      </h4>

      {/* Language */}

      <div className="setting-card">

        <div className="setting-left">

          <div className="setting-icon">

            <FaLanguage />

          </div>

          <div>

            <h6>Language</h6>

            <p>Select your preferred language.</p>

          </div>

        </div>

        <select
          className="form-select language-select"
          value={language}
          onChange={(e)=>setLanguage(e.target.value)}
        >

          <option>English</option>
          <option>Hindi</option>

        </select>

      </div>

      {/* Font */}

      <div className="setting-card">

        <div className="setting-left">

          <div className="setting-icon">

            <FaFont />

          </div>

          <div>

            <h6>Font Size</h6>

            <p>Adjust overall application font size.</p>

          </div>

        </div>

        <select
          className="form-select language-select"
          value={fontSize}
          onChange={(e)=>setFontSize(e.target.value)}
        >

          <option value="small">Small</option>

          <option value="medium">Medium</option>

          <option value="large">Large</option>

        </select>

      </div>

      {/* Accent */}

      <div className="setting-card">

        <div className="setting-left">

          <div className="setting-icon">

            <FaPalette />

          </div>

          <div>

            <h6>Accent Color</h6>

            <p>Choose application theme color.</p>

          </div>

        </div>

        <div className="accent-group">

          <button
            className="accent blue"
            onClick={()=>setAccent("blue")}
          />

          <button
            className="accent green"
            onClick={()=>setAccent("green")}
          />

          <button
            className="accent purple"
            onClick={()=>setAccent("purple")}
          />

          <button
            className="accent red"
            onClick={()=>setAccent("red")}
          />

          <button
            className="accent orange"
            onClick={()=>setAccent("orange")}
          />

        </div>

      </div>

      {/* Date */}

      <div className="setting-card">

        <div className="setting-left">

          <div className="setting-icon">

            <FaCalendarAlt />

          </div>

          <div>

            <h6>Date Format</h6>

            <p>Select preferred date format.</p>

          </div>

        </div>

        <select
          className="form-select language-select"
          value={dateFormat}
          onChange={(e)=>setDateFormat(e.target.value)}
        >

          <option>DD/MM/YYYY</option>

          <option>MM/DD/YYYY</option>

          <option>YYYY/MM/DD</option>

        </select>

      </div>

      {/* Time */}

      <div className="setting-card">

        <div className="setting-left">

          <div className="setting-icon">

            <FaClock />

          </div>

          <div>

            <h6>Time Format</h6>

            <p>Choose 12 or 24 hour clock.</p>

          </div>

        </div>

        <select
          className="form-select language-select"
          value={timeFormat}
          onChange={(e)=>setTimeFormat(e.target.value)}
        >

          <option>12 Hour</option>

          <option>24 Hour</option>

        </select>

      </div>

    </div>

  );

}

export default LanguageSettings;