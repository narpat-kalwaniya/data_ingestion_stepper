import React, { useContext } from "react";
import { mycontext } from "./DataObservability";
import { BsFolder } from "react-icons/bs";

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
    showTaskDetails,
    setShowTaskDetails,
    selectedRun,
    setSelectedRun,
  } = useContext(mycontext);

  const currentStep = "Step 1";
  const stepHandler = (index) => {
    console.log(index);
    if (index == 0) {
      setShowTaskDetails(false);
      setIsDetails(false);
      setIsRowClicked(false);
      setActiveTab("Overview");
      setSelectedRun(null);
      setSteps([]);
    }
    if (index == 1) {
      setShowTaskDetails(false);
      setIsRowClicked(false);
      setActiveTab("Overview");
      setSteps(steps.slice(0, 2));
    }
    if (index == 2) {
      setShowTaskDetails(false);
      setIsRowClicked(true);
      setActiveTab("Overview");
      setSteps(steps.slice(0, 3));
    }
  };
  return (
    <div
      className="directory-path"
      style={{ display: "flex", margin: "10px", alignItems: "center" }}
    >
      <BsFolder />
      <div className="directory-path">
        {steps.map((step, index) => (
          <span key={step}>
            {index > 0 && <span> &gt; </span>}
            {<span onClick={() => stepHandler(index)}>{step}</span>}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Path;
