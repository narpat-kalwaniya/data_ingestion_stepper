import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import "./ProgressBar.css";
import { Steps } from "rsuite";

const styles = {
  width: "200px",
  display: "inline-table",
  verticalAlign: "top",
};

export const Progressbar = (props) => {
  return (
    <ProgressBar
      percent={((props.step - 1) * 100) / 8}
      filledBackground="#F7901D"
    >
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={`step ${accomplished ? "completed" : null}`}>
            1</div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={`step ${accomplished ? "completed" : null}`}>2</div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={`step ${accomplished ? "completed" : null}`}>3</div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={`step ${accomplished ? "completed" : null}`}>4</div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={`step ${accomplished ? "completed" : null}`}>5</div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={`step ${accomplished ? "completed" : null}`}>6</div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={`step ${accomplished ? "completed" : null}`}>7</div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={`step ${accomplished ? "completed" : null}`}>8</div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={`step ${accomplished ? "completed" : null}`}>9</div>
        )}
      </Step>
    </ProgressBar>
  );

  // <>
  {
    /* <Steps current={1} vertical style={styles}>
      <Steps.Item title="Finished" />
      <Steps.Item title="In progress" />
      <Steps.Item title="Waiting" />
      <Steps.Item title="Waiting" />
    </Steps> */
  }

  {
    /* <Steps current={props.step - 1} vertical style={styles}>
        <Steps.Item title="Create Data Connection" />
        <Steps.Item title="Source Entity Selection" />
        <Steps.Item title="Target Schema" />
        <Steps.Item title="Define Data Validation" />
        <Steps.Item title="Define Source Extract Criteria" />
        <Steps.Item title="Target load Details" />
        <Steps.Item title="Apply Masking " />
        <Steps.Item title="Gather Additional Metadata" />
        <Steps.Item title="Scheduling" />
      </Steps> */
  }
  // </>
};
