import React from "react";
import './Style.css';

const JobApplicationUseCase = () => {
  return (
    <div className="application-container">
      <p className="application-description">
        Struggling to get your job application email noticed? Sending an email late at night means it gets buried in an inbox by morning.
      </p>

      <p className="application-description">
        <strong>Solution:</strong> Schedule your emails to be sent at the optimal time (e.g., 10 AM) so that it lands at the top of the HR's inbox when they log in.
      </p>

      <div className="application-section">
        <h3 className="application-subtitle">Challenges:</h3>
        <ul className="application-list">
          <li>You can't send emails to many HRs at once.</li>
          <li>Different time zones complicate sending emails at the right time.</li>
        </ul>
      </div>

      <div className="application-section">
        <h3 className="application-subtitle">Our Solution:</h3>
        <ul className="application-list">
          <li>Provide HR details and the time you want to send your email.</li>
          <li>We handle scheduling and sending at the right time.</li>
          <li>Track your sent applications with ease.</li>
        </ul>
      </div>

    </div>
  );
};

export default JobApplicationUseCase;
