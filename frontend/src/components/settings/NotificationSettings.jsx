import { useState } from "react";
import {
  FaBell,
  FaEnvelope,
  FaCalendarAlt,
  FaMobileAlt,
} from "react-icons/fa";

function NotificationSettings() {

  const [settings, setSettings] = useState({
    email: true,
    push: true,
    events: true,
    leaveStatus: true,
    announcements: false,
    reminders: true,
  });

  const toggle = (name) => {
    setSettings({
      ...settings,
      [name]: !settings[name],
    });
  };

  const Item = ({ icon, title, subtitle, name }) => (

    <div className="setting-card">

      <div className="setting-left">

        <div className="setting-icon">
          {icon}
        </div>

        <div>

          <h6>{title}</h6>

          <p>{subtitle}</p>

        </div>

      </div>

      <label className="switch">

        <input
          type="checkbox"
          checked={settings[name]}
          onChange={() => toggle(name)}
        />

        <span className="slider"></span>

      </label>

    </div>

  );

  return (

    <div className="notification-settings">

      <h4 className="settings-title">
        Notification Settings
      </h4>

      <Item
        icon={<FaEnvelope />}
        title="Email Notifications"
        subtitle="Receive important updates on Email"
        name="email"
      />

      <Item
        icon={<FaMobileAlt />}
        title="Push Notifications"
        subtitle="Receive mobile notifications"
        name="push"
      />

      <Item
        icon={<FaCalendarAlt />}
        title="Upcoming Events"
        subtitle="Notify before every event"
        name="events"
      />

      <Item
        icon={<FaBell />}
        title="Leave Status"
        subtitle="Approval / Rejection notifications"
        name="leaveStatus"
      />

      <Item
        icon={<FaBell />}
        title="Announcements"
        subtitle="College announcements"
        name="announcements"
      />

      <Item
        icon={<FaCalendarAlt />}
        title="Reminders"
        subtitle="Daily reminder notifications"
        name="reminders"
      />

    </div>

  );

}

export default NotificationSettings;