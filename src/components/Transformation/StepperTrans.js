import React from "react";
import ValidateQuery from "./ValidateQuery";
import PreDataValidation from "./PreDataValidation";
import PostDataValidation from "./PostDataValidation";
import "../Migration/AppMig.css";

const StepperTrans = ({
  step,
  formData,
  updateFormData,
  applicationName,
  connectionName,
}) => {
  return (
    <div>
      {step === 1 ? (
        <ValidateQuery
          step={step}
          formData={formData}
          updateFormData={updateFormData}
          applicationName={applicationName}
          connectionName={connectionName}
        />
      ) : step === 2 ? (
        <PreDataValidation
          step={step}
          formData={formData}
          updateFormData={updateFormData}
        />
      ) : step === 3 ? (
        <PostDataValidation
          step={step}
          formData={formData}
          updateFormData={updateFormData}
        />
      ) : null}
    </div>
  );
};

export default StepperTrans;
