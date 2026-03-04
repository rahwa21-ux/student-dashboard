import React, { useState } from "react";
import { FaUser, FaLock, FaBell, FaSignOutAlt } from "react-icons/fa";
import "./Settings.css";

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
  });

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setSettings({ ...settings, [name]: checked });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Settings saved!");
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>Settings</h2>
        <p>Manage your account and preferences</p>
      </div>

      <div className="settings-grid">
        {/* Profile Card */}
        <div className="settings-card">
          <div className="settings-card-header">
            <FaUser className="settings-icon" />
            <h3>Profile</h3>
          </div>

          <div className="settings-body">
            <div className="field">
              <label>Name</label>
              <input type="text" placeholder="Rahwa" />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" placeholder="rahwa@example.com" />
            </div>
          </div>
        </div>

        {/* Account Card */}
        <div className="settings-card">
          <div className="settings-card-header">
            <FaLock className="settings-icon" />
            <h3>Account</h3>
          </div>

          <div className="settings-body">
            <div className="field">
              <label>Current Password</label>
              <input type="password" placeholder="••••••••" />
            </div>
            <div className="field">
              <label>New Password</label>
              <input type="password" placeholder="••••••••" />
            </div>
            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>

        {/* Preferences Card */}
        <div className="settings-card">
          <div className="settings-card-header">
            <FaBell className="settings-icon" />
            <h3>Preferences</h3>
          </div>

          <div className="settings-body">
            <div className="toggle">
              <span>Notifications</span>
              <label className="switch">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleToggle}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="toggle">
              <span>Dark Mode</span>
              <label className="switch">
                <input
                  type="checkbox"
                  name="darkMode"
                  checked={settings.darkMode}
                  onChange={handleToggle}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Logout Card */}
        <div className="settings-card logout-card">
          <div className="settings-card-header">
            <FaSignOutAlt className="settings-icon" />
            <h3>Logout</h3>
          </div>

          <div className="settings-body">
            <p>Logout from your account safely.</p>
            <button className="logout-btn">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
