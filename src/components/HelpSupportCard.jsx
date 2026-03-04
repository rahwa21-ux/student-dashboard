import React from "react";
import "./HelpSupportCard.css";

const HelpSupportCard = () => {
  return (
    <div className="help-container">
      <div className="card help-card">
        <div className="help-content">
          <div className="help-icon">💬</div>
          <h3 className="help-title">Need Help?</h3>
          <p className="help-description">
            Get support from teachers or join study groups to enhance your
            learning experience.
          </p>
          <div className="help-actions">
            <button className="btn btn-primary">Ask a Teacher</button>
            <button className="btn btn-secondary">Join Study Group</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportCard;
