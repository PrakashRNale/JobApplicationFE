import React from "react";
import './Style.css';

const JobApplicationUseCase = () => {
  return (
    <div className="application-container">
      <p className="application-description">
        Struggling to get your job application email noticed? Sending an email late at night means it gets buried in an HR's inbox by morning when they login to system.
      </p>

      <p className="application-description">
        <strong>Solution:</strong> Schedule your job application to be sent at the optimal time (e.g., 10 AM) so that it lands at the top of the HR's inbox when they login.
      </p>

      <div className="application-section">
        <h3 className="application-subtitle">Challenges:</h3>
        <ul className="application-list">
          <li>You can't send job applications to many HRs at same time(eg. 10 AM when HR login to system).</li>
          <li>Different time zones complicate sending emails at the right time.</li>
        </ul>
      </div>

      <div className="application-section">
        <h3 className="application-subtitle">Our Solution:</h3>
        <ul className="application-list">
          <li>Provide HR details and the time you want to send your job application.</li>
          <li>We handle scheduling and sending at the right time.</li>
          <li>Track your sent applications with ease.</li>
        </ul>
      </div>

    </div>
  );
};

export default JobApplicationUseCase;
