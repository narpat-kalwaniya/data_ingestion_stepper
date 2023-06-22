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
import { DataProvider } from "./DataContext";

const Stepper = ({
  step,
  formData,
  updateFormData,
  updateSourceEntityData,
  updateTableData,
  errors,
  errors2,
  updateTargetLoad,
}) => {
  return (
    <div>
      {step === 1 ? (
        <CreateDataConnection
          step={step}
          formData={formData}
          updateFormData={updateFormData}
          errors={errors}
        />
      ) : step === 2 ? (
        <SourceEntitySelection
          step={step}
          formData={formData}
          updateFormData={updateFormData}
          errors2={errors2}
        />
      ) : step === 3 ? (
        <TargetSchema
          step={step}
          formData={formData}
          updateFormData={updateFormData}
          updateTableData={updateTableData}
        />
      ) : step === 4 ? (
        <DefineDataValidation
          step={step}
          formData={formData}
          updateFormData={updateFormData}
        />
      ) : step === 5 ? (
        <DefineSourceExtractCriteria
          step={step}
          formData={formData}
          updateFormData={updateFormData}
        />
      ) : step === 6 ? (
        <TargetLoadDetails
          step={step}
          formData={formData}
          updateFormData={updateFormData}
        />
      ) : step === 7 ? (
        <ApplyMasking
          step={step}
          formData={formData}
          updateFormData={updateFormData}
        />
      ) : step === 8 ? (
        <GatherMetaData
          step={step}
          formData={formData}
          updateFormData={updateFormData}
        />
      ) : step === 9 ? (
        <Scheduling
          step={step}
          formData={formData}
          updateFormData={updateFormData}
        />
      ) : null}
    </div>
  );
};

export default Stepper;
