import React from 'react';
import classes from "./Style.module.css";

const Notification = ({ text }) => {
  return (
    <div className={classes.notificationBar}>
      
      <div className={classes.slidingText}>{text}</div>
    </div>
  );
};

export default Notification;
