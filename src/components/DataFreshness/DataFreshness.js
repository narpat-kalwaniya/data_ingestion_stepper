import React, { useCallback, useState } from "react";
import { Container, Card, Row, Col, Modal, Button } from "react-bootstrap";
import CustomActiveShapePieChart from "./PieCharts";
import DataAvailabilityTable from "./DataAvailabilityTable";
import DoubleLineChart from "./LineCharts";
import DailyStatus from "./DailyStatus";
import FsdsTable from "./FsdsTable";
import "./DataFreshness.css";

const DataFreshness = () => {
  return (
    <div style={{ margin: "5px" }}>
      <Row>
        <Col
          style={{
            paddingLeft: "10px",
            paddingRight: "5px",
          }}
        >
          <Card
            className="Card-outer custom-card-body "
            style={{
              minHeight: "300px",
              marginBottom: "10px",
            }}
          >
            <Card.Header className="custom-header">
              <button
                className="btn-s"
                style={{
                  paddingLeft: "4px",
                  paddingRight: "4px",
                  width: "100%",
                }}
              >
                Add Metrics
              </button>
            </Card.Header>
            <Card.Body
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CustomActiveShapePieChart />
            </Card.Body>
          </Card>
        </Col>
        <Col
          sm={2}
          style={{
            padding: "1px",
          }}
        >
          <Card
            className="Card-outer custom-card-body "
            style={{
              minHeight: "159px",
              marginBottom: "10px",
            }}
          >
            <Card.Body>
              <span style={{ display: "block", marginBottom: "10px" }}>
                Frequency
              </span>
              <span style={{ display: "block", marginBottom: "10px" }}>
                All
              </span>
            </Card.Body>
          </Card>
          <Card
            className="Card-outer custom-card-body "
            style={{
              minHeight: "159px",
              marginBottom: "10px",
            }}
          >
            <Card.Body>
              <span style={{ display: "block", marginBottom: "10px" }}>
                Status
              </span>
              <span style={{ display: "block", marginBottom: "10px" }}>
                All
              </span>
            </Card.Body>
          </Card>
        </Col>
        <Col
          style={{
            paddingLeft: "5px",
            paddingRight: "10px",
          }}
        >
          <Card
            className="Card-outer custom-card-body "
            style={{
              minHeight: "249px",
              marginBottom: "10px",
            }}
          >
            <Card.Body>
              <DataAvailabilityTable />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <Card
            className="Card-outer custom-card-body "
            style={{
              minHeight: "50px",
              marginBottom: "5px",
            }}
          >
            <Card.Body
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "green",
                }}
              ></div>
              <span style={{ margin: "0 10px" }}>Up to Date</span>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "#e8c010",
                }}
              ></div>
              <span style={{ margin: "0 10px" }}>Under SLA</span>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "#c93208",
                }}
              ></div>
              <span style={{ margin: "0 10px" }}>Stale</span>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <Card
            className="Card-outer custom-card-body "
            style={{
              minHeight: "200px",
              marginBottom: "10px",
            }}
          >
            <Card.Body>
              <DailyStatus />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <Card
            className="Card-outer custom-card-body "
            style={{
              minHeight: "300px",
              marginBottom: "10px",
            }}
          >
            <Card.Header className="custom-header-below ">
              <span style={{ display: "block", marginBottom: "10px" }}>
                Time Period
              </span>
              <span style={{ display: "block", marginBottom: "10px" }}>
                Last 30 Days
              </span>
            </Card.Header>
            <Card.Body>
              <FsdsTable />
            </Card.Body>
          </Card>
        </Col>
        <Col
          style={{
            paddingLeft: "5px",
            paddingRight: "10px",
          }}
        >
          <Card
            className="Card-outer custom-card-body "
            style={{
              minHeight: "300px",
              marginBottom: "10px",
            }}
          >
            <Card.Header className="custom-header-below ">
              <span style={{ display: "block", marginBottom: "10px" }}>
                Source
              </span>
              <span style={{ display: "block", marginBottom: "10px" }}>
                uat.public.nyc_central_park_weather
              </span>
            </Card.Header>
            <Card.Body>
              <DoubleLineChart />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DataFreshness;
