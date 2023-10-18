import React, { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import MissingDataSource from "./MissingDataSource";
import MissingAttributes from "./MissingAttributes";
import { NewAttributes } from "./NewAttributes";
import SchemaSummary from "./SchemaSummary";
import DateRangePicker from "./DateRangePicker";
import { MissingDataSourceTrend } from "./MissingDataSourceTrend";
import { MissingATtributesTrend } from "./MissingATtributesTrend";
import NewAttributesTrend from "./NewAttributesTrend";
import DataTypeChanged from "./DataTypeChanged";
import DataTypeChangedTrend from "./DataTypeChangedTrend";
import OrdinalPositionChanged from "./OrdinalPositionChanged";
import OrdinalPositionChangedTrend from "./OrdinalPositionChangedTrend";

const SchemaAnomaly = () => {
  const timePeriod = ["1 Week", "30 Days", "4 Months"];
  const dataSource = [
    "Bookings",
    "Flights",
    "Tickets",
    "Seats",
    "Boarding Passes",
  ];

  const [dateRange, setDateRange] = useState({ start: null, end: null });

  return (
    <div style={{ margin: "10px" }}>
      <Row>
        <Col>
          <Row className="justify-content-center" style={{ margin: "5px" }}>
            <button
              className="btn-s"
              // style={{ width: "200px" }}
            >
              Add Metrics
            </button>
          </Row>
          <Row style={{ margin: "5px" }}>
            <Card
              className="Card-outer custom-card-body "
              style={{
                minHeight: "90px",
                marginBottom: "10px",
              }}
            >
              <Form.Label
                style={{
                  color: "#4f4f4f",
                  fontSize: "12px",
                  opacity: "0.8",
                  marginLeft: "5px",
                  marginBottom: "2px",
                  marginTop: "5px",
                }}
              >
                Date Range
              </Form.Label>
              <DateRangePicker
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
            </Card>
          </Row>
          <Row style={{ margin: "5px" }}>
            <Card
              className="Card-outer custom-card-body "
              style={{
                minHeight: "200px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    marginTop: "4px",
                    marginBottom: "4px",
                  }}
                >
                  Schema Anomalies Summary
                </p>
              </div>
              <SchemaSummary />
            </Card>
          </Row>
        </Col>
        <Col>
          <Row style={{ margin: "5px" }}>
            <Card
              className="Card-outer custom-card-body "
              style={{
                minHeight: "70px",
                marginBottom: "10px",
              }}
            >
              <Form.Label
                style={{
                  color: "#4f4f4f",
                  fontSize: "12px",
                  opacity: "0.8",
                  marginLeft: "5px",
                  marginBottom: "2px",
                  marginTop: "5px",
                }}
              >
                Data Source
              </Form.Label>
              <Form.Select
                className="custom-select custom-style"
                type="text"
                placeholder=""
                style={{ width: "90%", padding: "5px" }}
              >
                {dataSource.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </Card>
          </Row>
          <Card
            className="Card-outer custom-card-body "
            style={{
              minHeight: "100px",
              marginBottom: "10px",
            }}
          >
            <MissingDataSource />
          </Card>
          <Card
            className="Card-outer custom-card-body "
            style={{
              minHeight: "100px",
              marginBottom: "10px",
            }}
          >
            <MissingAttributes />
          </Card>
          <Card
            className="Card-outer custom-card-body "
            style={{
              minHeight: "100px",
              marginBottom: "10px",
            }}
          >
            <NewAttributes />
          </Card>
        </Col>
        <Col>
          <Row style={{ margin: "5px" }}>
            <Card
              className="Card-outer custom-card-body "
              style={{
                minHeight: "70px",
                marginBottom: "10px",
              }}
            >
              <Form.Label
                style={{
                  color: "#4f4f4f",
                  fontSize: "12px",
                  opacity: "0.8",
                  marginLeft: "5px",
                  marginBottom: "2px",
                  marginTop: "5px",
                }}
              >
                Time Period
              </Form.Label>
              <Form.Select
                className="custom-select custom-style"
                type="text"
                placeholder=""
                style={{ width: "90%", padding: "5px" }}
              >
                {timePeriod.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </Card>
          </Row>
          <Card
            className="Card-outer custom-card-body "
            style={{
              minHeight: "135px",
              marginBottom: "10px",
            }}
          >
            <MissingDataSourceTrend dateRange={dateRange} />
          </Card>
          <Card
            className="Card-outer custom-card-body "
            style={{
              minHeight: "135px",
              marginBottom: "10px",
            }}
          >
            <MissingATtributesTrend />
          </Card>
          <Card
            className="Card-outer custom-card-body "
            style={{
              minHeight: "135px",
              marginBottom: "10px",
            }}
          >
            <NewAttributesTrend />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card
            className="Card-outer custom-card-body "
            style={{
              minHeight: "130px",
              marginBottom: "10px",
            }}
          >
            <DataTypeChanged />
          </Card>
        </Col>
        <Col>
          <Card
            className="Card-outer custom-card-body "
            style={{
              minHeight: "130px",
              marginBottom: "10px",
            }}
          >
            <DataTypeChangedTrend />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card
            className="Card-outer custom-card-body "
            style={{
              minHeight: "130px",
              marginBottom: "10px",
            }}
          >
            <OrdinalPositionChanged />
          </Card>
        </Col>
        <Col>
          <Card
            className="Card-outer custom-card-body "
            style={{
              minHeight: "130px",
              marginBottom: "10px",
            }}
          >
            <OrdinalPositionChangedTrend />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SchemaAnomaly;
