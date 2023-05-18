import React from 'react'

const Header = (props) => {
  return (
    <div>
      {props.step === 1 ? (
        <h5>Create Data Connection</h5>
      ) : props.step === 2 ? (
        <h5>Source Entity Selection</h5>
      ) : props.step === 3 ? (
        <h5>Target Schema</h5>
      ) : props.step === 4 ? (
        <h5>Define Data Validation</h5>
      ) : props.step === 5 ? (
        <h5>Define Source Extract Criteria</h5>
      ) : props.step === 6 ? (
        <h5> Target Load Details</h5>
      ) : props.step === 7 ? (
        <h5>Apply Masking</h5>
      ) : props.step === 8 ? (
        <h5> Gather Meta Data</h5>
      ) : props.step === 9 ? (
        <h5>Scheduling</h5>
      ) : null}
    </div>
  );
}

export default Header