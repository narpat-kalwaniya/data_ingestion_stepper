import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Bar from "./Bar";
import Metrics from "./Metrics";
import Plot from "./Plot";

const MetricPlotRoot = () => {
  const [selectedDS, setSelectedDS] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [metricList, setMetricList] = useState([
    "Count",
    "Missing Value",
    "Mean",
    "Variance",
  ]);
  const metric_list = ["Count", "Missing Value", "Mean", "Variance"];
  const [selectedData, setSelectedData] = useState({
    "2023-01-15": 1,
    "2023-03-30": 0,
    "2023-06-15": 0,
    "2023-10-01": 3,
  });

  const data_for_plot = [
    {
      "2023-01-15": 1,
      "2023-03-30": 0,
      "2023-06-15": 0,
      "2023-10-01": 3,
    },
    {
      "2023-01-15": 1,
      "2023-03-30": 20,
      "2023-06-15": 30,
      "2023-10-01": 3,
    },
    {
      "2023-01-15": 1,
      "2023-03-30": 0,
      "2023-06-15": 0,
      "2023-10-01": 45,
    },
    {
      "2023-01-15": 1,
      "2023-03-30": 2,
      "2023-06-15": 10,
      "2023-10-01": 45,
    },
  ];

  const data = {
    Flights: {
      Attributes: ["Flight ID", "Departure", "No. of Passengers"],
      Datatypes: ["Number", "String", "Number"],
    },
    Bookings: {
      Attributes: ["Passenger ID", "Fare", "Class"],
      Datatypes: ["Number", "Number", "String"],
    },
    Crew: {
      Attributes: ["Employee ID", "Weight", "Name", "Gender"],
      Datatypes: ["Number", "Number", "String", "String"],
    },
  };

  // console.log(
  //   data[selectedDS].Datatypes[
  //     data[selectedDS].Attributes.indexOf(selectedAttribute)
  //   ]
  // );

  // useEffect =
  //   (() => {
  //     if (
  //       data[selectedDS].Datatypes[
  //         data[selectedDS].Attributes.indexOf(selectedAttribute)
  //       ] == "Number"
  //     ) {
  //       setMetricList(["Count", "Missing Value", "Unique Values", "Metric X"]);
  //     }
  //   },
  //   [selectedAttribute]);

  return (
    <Card
      className="Card-outer custom-card-body "
      style={{
        minHeight: "700px",
        // marginRight: "20px",
        // marginTop: "100px",
      }}
    >
      <Row>
        <Bar
          data={data}
          selectedDS={selectedDS}
          setSelectedDS={setSelectedDS}
          selectedAttribute={selectedAttribute}
          setSelectedAttribute={setSelectedAttribute}
        />
      </Row>
      <Row>
        <Col xs={3}>
          <Metrics
            metric_list={metric_list}
            selectedMetric={selectedMetric}
            setSelectedMetric={setSelectedMetric}
            setSelectedData={setSelectedData}
            data_for_plot={data_for_plot}
          />
        </Col>
        <Col>
          {selectedMetric != null ? (
            <Plot
              selectedData={selectedData}
              selectedMetric={metric_list[selectedMetric]}
            />
          ) : null}
        </Col>
      </Row>
    </Card>
  );
};

export default MetricPlotRoot;
