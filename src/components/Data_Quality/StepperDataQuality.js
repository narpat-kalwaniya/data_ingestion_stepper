import React from "react";
import DataConnection from "./DataConnection";
import SourceEntity from "./SourceEntity";
import TargetSchema from "./TargetSchema";
import ConfigureRules from "./ConfigureRules";
import "../Migration/AppMig.css";

const StepperDataQuality = ({ step, formData, updateFormData }) => {
  return (
    <div>
      {step === 1 ? (
        <DataConnection
          step={step}
          formData={formData}
          updateFormData={updateFormData}
        />
      ) : step === 2 ? (
        <SourceEntity
          step={step}
          formData={formData}
          updateFormData={updateFormData}
        />
      ) : step === 3 ? (
        <TargetSchema
          step={step}
          formData={formData}
          updateFormData={updateFormData}
        />
      ) : step === 4 ? (
        <ConfigureRules
          step={step}
          formData={formData}
          updateFormData={updateFormData}
        />
      ) : null}
    </div>
  );
};

export default StepperDataQuality;
