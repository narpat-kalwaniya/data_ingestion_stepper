import React, { useContext } from "react";
import { mycontext } from "./DataObservability";

const Path = (props) => {
  const {
    steps,
    setSteps,
    isRowClicked,
    setIsRowClicked,
    activeTab,
    setActiveTab,
    setIsDetails,
    isDetails,
  } = useContext(mycontext);

  const currentStep = "Step 1";
  const stepHandler = (index) => {
    console.log(index);
    if (index == 0) {
      setIsDetails(false);
      setIsRowClicked(false);
      setActiveTab("tab1");
      setSteps([]);
    }
    if (index == 1) {
      setIsRowClicked(false);
      setActiveTab("tab1");
      setSteps(steps.slice(0, 2));
    }
  };
  return (
    <div className="directory-path">
      {steps.map((step, index) => (
        <span key={step}>
          {index > 0 && <span> &gt; </span>}
          {<span onClick={() => stepHandler(index)}>{step}</span>}
        </span>
      ))}
    </div>
  );
};

export default Path;
