import React, { useState } from "react";
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
  errors5,
  errors6,
  errorEmail8,
  updateTargetLoad,
  currentlySubmittedForm,
  setIsDraftSaved,
  isLoading,
  setIsLoading,
  isTableLoad,
  setIsTableLoad,
  isUpdate,
  setIsUpdate,
  connections,
  applications,
  s3Directories,
}) => {
  const [isVisibleOption, setisVisibleOption] = useState(true);

  return (
    <div>
      {step === 1 ? (
        <CreateDataConnection
          isVisibleOption={isVisibleOption}
          setisVisibleOption={setisVisibleOption}
          step={step}
          formData={formData}
          updateFormData={updateFormData}
          currentlySubmittedForm={currentlySubmittedForm}
          errors={errors}
          connections={connections}
          applications={applications}
        />
      ) : step === 2 ? (
        <SourceEntitySelection
          isVisibleOption={isVisibleOption}
          step={step}
          formData={formData}
          updateFormData={updateFormData}
          currentlySubmittedForm={currentlySubmittedForm}
          errors2={errors2}
          connections={connections}
          s3Directories={s3Directories}
        />
      ) : step === 3 ? (
        <TargetSchema
          step={step}
          formData={formData}
          updateFormData={updateFormData}
          currentlySubmittedForm={currentlySubmittedForm}
          updateTableData={updateTableData}
          setIsDraftSaved={setIsDraftSaved}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isTableLoad={isTableLoad}
          setIsTableLoad={setIsTableLoad}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
        />
      ) : step === 4 ? (
        <DefineDataValidation
          step={step}
          formData={formData}
          updateFormData={updateFormData}
          currentlySubmittedForm={currentlySubmittedForm}
          setIsDraftSaved={setIsDraftSaved}
        />
      ) : step === 5 ? (
        <DefineSourceExtractCriteria
          step={step}
          formData={formData}
          updateFormData={updateFormData}
          currentlySubmittedForm={currentlySubmittedForm}
          errors5={errors5}
          setIsDraftSaved={setIsDraftSaved}
        />
      ) : step === 6 ? (
        <TargetLoadDetails
          step={step}
          formData={formData}
          updateFormData={updateFormData}
          currentlySubmittedForm={currentlySubmittedForm}
          errors6={errors6}
          setIsDraftSaved={setIsDraftSaved}
        />
      ) : step === 7 ? (
        <ApplyMasking
          step={step}
          formData={formData}
          updateFormData={updateFormData}
          currentlySubmittedForm={currentlySubmittedForm}
          setIsDraftSaved={setIsDraftSaved}
        />
      ) : step === 8 ? (
        <GatherMetaData
          step={step}
          formData={formData}
          errorEmail8={errorEmail8}
          updateFormData={updateFormData}
          currentlySubmittedForm={currentlySubmittedForm}
          setIsDraftSaved={setIsDraftSaved}
        />
      ) : step === 9 ? (
        <Scheduling
          step={step}
          formData={formData}
          updateFormData={updateFormData}
          currentlySubmittedForm={currentlySubmittedForm}
          setIsDraftSaved={setIsDraftSaved}
        />
      ) : null}
    </div>
  );
};

export default Stepper;
