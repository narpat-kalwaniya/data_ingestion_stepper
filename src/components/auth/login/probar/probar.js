import React from "react";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./probar.css"; // You can create your own CSS file for styling

const ProBar = () => {
  const steps = ["Step 1", "Step 2", "Step 3", "Step 4"]; // Array of your step names
  const currentStep = 2; // The current step number (example: 2 for Step 2)

  return (
    <div className="container">
      <div className="progress-container">
        <ProgressBar className="vertical-progress-bar">
          {steps.map((step, index) => (
            <ProgressBar
              key={index}
              now={index < currentStep ? 100 : 0}
              label={step}
              srOnly
              animated
            />
          ))}
        </ProgressBar>
      </div>
      {/* Render your stepper components here */}
    </div>
  );
};

export default ProBar;
