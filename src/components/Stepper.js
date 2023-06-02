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
const Stepper = (props) => {
  return (
    <div>
      {props.step === 1 ? (
        <CreateDataConnection
          step={props.step}
          pageAnswers={props.pageAnswers}
          setPageAnswers={props.setPageAnswers}
          errors={props.errors}
        />
      ) : props.step === 2 ? (
        <SourceEntitySelection
          step={props.step}
          pageAnswers={props.pageAnswers}
          setPageAnswers={props.setPageAnswers}
        />
      ) : props.step === 3 ? (
        <TargetSchema />
      ) : props.step === 4 ? (
        <DefineDataValidation />
      ) : props.step === 5 ? (
        <DefineSourceExtractCriteria />
      ) : props.step === 6 ? (
        <TargetLoadDetails />
      ) : props.step === 7 ? (
        <ApplyMasking />
      ) : props.step === 8 ? (
        <GatherMetaData />
      ) : props.step === 9 ? (
        <Scheduling />
      ) : null}
    </div>
  );
};

export default Stepper;
