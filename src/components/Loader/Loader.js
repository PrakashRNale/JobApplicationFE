import React, { useContext } from "react";
import UserContext from "../../context/UserContext/UserContext";
import './style.css';

const Loader = () => {

  const { loading } = useContext(UserContext);

  if (!loading) return null;

  return (
    <div className="loader-overlay">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
