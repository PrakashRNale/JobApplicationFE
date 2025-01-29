import React from 'react'
import { MONTHS } from '../../constant';

const Company = ({company}) => {
  const {name, hrname, isapplied, maildroptime} = company;

  const getTime = (mailDropTime) =>{
    const dateObj = new Date(mailDropTime);
    const month = MONTHS[dateObj.getMonth()];
    const date = dateObj.getDate();
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();

    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight, and 13-23 to 1-11
    minutes = minutes.toString().padStart(2, "0"); // Ensure 2-digit minutes

    return `${month} ${date} at ${hours}:${minutes}${period}`
  }
  return (
    <tr className="company">
      <td>{name}</td>
      <td>{hrname}</td>
      <td>
        {isapplied ? (
          <span style={{ color: "#2c3e50", fontWeight: "bold" }}>Mail sent to HR</span>
        ) : (
          <span style={{ color: "#3a7ca5", fontWeight: "bold" }}>As planned, we will send Mail on {getTime(maildroptime)}</span>
        )}
      </td>
  </tr>
  )
}

export default Company
