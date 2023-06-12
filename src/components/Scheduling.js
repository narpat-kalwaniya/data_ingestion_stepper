import React, { useState } from "react";
import { Form } from "react-bootstrap";

const Scheduling = () => {
  const [pageData, setPageData] = useState({
    Frequency: "",
  });

  const changeHandler = (e) => {
    setPageData({ ...pageData, [e.target.name]: e.target.value });
  };
  console.log("freq", pageData);
  return (
    <div>
      <Form.Label> Frequency </Form.Label>
      <Form.Control
        // as="select"
        // multiple
        // onChange={handleSelect}
        // disabled={!isIncrementalSelected}
        name="Frequency"
        onChange={changeHandler}
      ></Form.Control>
    </div>
  );
};

export default Scheduling;
