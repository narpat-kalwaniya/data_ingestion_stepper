import React, { useContext } from "react";
import { DataContext } from "./DataContext";

const Scheduling = () => {
  const { ingestionData } = useContext(DataContext);
  console.log("scheduling ingestion", ingestionData);
  return <div>Scheduling</div>;
};

export default Scheduling;
