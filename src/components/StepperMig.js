import React from "react";
import { TargetSchemaMig } from "./TargetSchemaMig";
import { DefineDataValidation } from "./DefineDataValidation";
import DefineSourceExtractCriteria from "./DefineSourceExtractCriteria";
import TargetLoadDetails from "./TargetLoadDetails";
import ApplyMasking from "./ApplyMasking";
import GatherMetaData from "./GatherMetaData";
import Scheduling from "./Scheduling";
import { DataProvider } from "./DataContext";
import Success from "./Success";
import SourceEntitySelectionMig from "./SourceEntitySelectionMig";
import CreateDataConnectionMig from "./CreateDataConnectionMig";
import "./Migration/AppMig.css";

const StepperMig = ({
  step,
  formData,
  updateFormData,
  updateSourceEntityData,
  updateTableData,
  errors,
  errors2,
  errors5,
  errors6,
  updateTargetLoad,
  response,
  isLoading,
}) => {
  return (
    <div>
      {step === 1 ? (
        <CreateDataConnectionMig
          step={step}
          formData={formData}
          updateFormData={updateFormData}
          errors={errors}
        />
      ) : step === 2 ? (
        <SourceEntitySelectionMig
          step={step}
          formData={formData}
          updateFormData={updateFormData}
          errors2={errors2}
        />
      ) : step === 3 ? (
        <TargetSchemaMig
          step={step}
          formData={formData}
          updateFormData={updateFormData}
          updateTableData={updateTableData}
        />
      ) : //  ) : step === 4 ? (
      //   <DefineDataValidation
      //     step={step}
      //     formData={formData}
      //     updateFormData={updateFormData}
      //   />
      // ) : step === 5 ? (
      //   <DefineSourceExtractCriteria
      //     step={step}
      //     formData={formData}
      //     updateFormData={updateFormData}
      //     errors5={errors5}
      //   />
      // ) : step === 6 ? (
      //   <TargetLoadDetails
      //     step={step}
      //     formData={formData}
      //     updateFormData={updateFormData}
      //     errors6={errors6}
      //   />
      // ) : step === 7 ? (
      //   <ApplyMasking
      //     step={step}
      //     formData={formData}
      //     updateFormData={updateFormData}
      //   />
      // ) : step === 8 ? (
      //   <GatherMetaData
      //     step={step}
      //     formData={formData}
      //     updateFormData={updateFormData}
      //   />
      // ) : step === 9 ? (
      //   <Scheduling
      //     step={step}
      //     formData={formData}
      //     updateFormData={updateFormData}
      //   />
      null}
    </div>
  );
};

export default StepperMig;
