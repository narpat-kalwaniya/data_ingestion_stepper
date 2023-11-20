import React, { useState } from "react";
import { Card } from "react-bootstrap";

const Metrics = (props) => {
  const metric_list = props.metric_list;
  const metricHandler = (event, index) => {
    props.setSelectedMetric(index);
    props.setSelectedData(props.data_for_plot[index]);
  };

  console.log(props.selectedMetric);
  return (
    <Card className="metric-card">
      <h6>Metrics</h6>
      {metric_list.map((o, index) => (
        <div
          className="metric-list"
          style={{
            backgroundColor: props.selectedMetric == index ? "white" : null,
          }}
          onClick={(event) => metricHandler(event, index)}
        >
          <i></i>
          <span>{o}</span>
        </div>
      ))}
    </Card>
  );
};

export default Metrics;
