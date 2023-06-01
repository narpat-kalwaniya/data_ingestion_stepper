import React from "react";
import { TargetSchema } from "./TargetSchema";
import { DefineDataValidation } from "./DefineDataValidation";
import CreateDataConnection from "./CreateDataConnection";
import DefineSourceExtractCriteria from "./DefineSourceExtractCriteria";
import TargetLoadDetails from "./TargetLoadDetails";
import SourceEntitySelection from "./SourceEntitySelection";
import ApplyMasking from "./ApplyMasking";
import GatherMetaData from "./GatherMetaData";
import Scheduling from "./Scheduling";

const Stepper = ({
  step,
  formData,
  updateFormData,
  updateSourceEntityData,
  updateTableData,
}) => {
  return (
    <div>
      {step === 1 ? (
        <CreateDataConnection
          formData={formData}
          updateFormData={updateFormData}
        />
      ) : step === 2 ? (
        <SourceEntitySelection
          formData={formData}
          updateFormData={updateFormData}
        />
      ) : step === 3 ? (
        <TargetSchema
          formData={formData}
          updateFormData={updateFormData}
          updateTableData={updateTableData}
        />
      ) : step === 4 ? (
        <DefineDataValidation
          formData={formData}
          updateFormData={updateFormData}
        />
      ) : step === 5 ? (
        <DefineSourceExtractCriteria
          formData={formData}
          updateFormData={updateFormData}
        />
      ) : step === 6 ? (
        <TargetLoadDetails
          formData={formData}
          updateFormData={updateFormData}
        />
      ) : step === 7 ? (
        <ApplyMasking formData={formData} updateFormData={updateFormData} />
      ) : step === 8 ? (
        <GatherMetaData formData={formData} updateFormData={updateFormData} />
      ) : step === 9 ? (
        <Scheduling formData={formData} updateFormData={updateFormData} />
      ) : null}
    </div>
  );
};

export default Stepper;
