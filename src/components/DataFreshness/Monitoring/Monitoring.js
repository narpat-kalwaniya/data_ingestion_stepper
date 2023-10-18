import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import "./Monitoring.css"; // Import the CSS file

const Monitoring = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (cardNumber) => {
    setSelectedCard(cardNumber);
    // You can use the navigate function to navigate to different routes
    switch (cardNumber) {
      case 1:
        navigate("/monitoring/dataFreshness");
        break;
      case 2:
        navigate("/monitoring/schemaAnomaly");
        break;
      case 3:
        navigate("/monitoring/volumeAnomaly");
        break;
      case 4:
        navigate("/monitoring/tableHealth");
      default:
        break;
    }
  };

  return (
    <div style={{ margin: "10px" }}>
      <Row>
        <Col
          style={{
            paddingLeft: "15px",
            paddingRight: "5px",
          }}
        >
          <Card
            className={`Card-outer-monitor custom-card-body ${
              selectedCard === 1 ? "selected" : ""
            }`}
            style={{
              cursor: "pointer",
              // minHeight: "100px",
              margin: "10px",
            }}
            onClick={() => handleCardClick(1)}
          >
            <Card.Body>
              <div
                className={`card-content ${
                  selectedCard === 1 ? "selected" : ""
                }`}
              >
                <Card.Title
                  style={{
                    color: "#fff",
                  }}
                >
                  Data Freshness
                </Card.Title>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col
          style={{
            paddingLeft: "5px",
            paddingRight: "5px",
          }}
        >
          <Card
            className={`Card-outer-monitor custom-card-body ${
              selectedCard === 2 ? "selected" : ""
            }`}
            style={{
              // minHeight: "100px",
              margin: "10px",
              cursor: "pointer",
            }}
            onClick={() => handleCardClick(2)}
          >
            <Card.Body>
              <div
                className={`card-content ${
                  selectedCard === 2 ? "selected" : ""
                }`}
              >
                <Card.Title style={{ color: "#fff" }}>
                  Schema Anomaly
                </Card.Title>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col
          style={{
            paddingLeft: "5px",
            paddingRight: "15px",
          }}
        >
          <Card
            className={`Card-outer-monitor custom-card-body ${
              selectedCard === 3 ? "selected" : ""
            }`}
            style={{
              cursor: "pointer",
              // minHeight: "100px",
              margin: "10px",
            }}
            onClick={() => handleCardClick(3)}
          >
            <Card.Body>
              <div
                className={`card-content ${
                  selectedCard === 3 ? "selected" : ""
                }`}
              >
                <Card.Title style={{ color: "#fff" }}>
                  Volume Anomaly
                </Card.Title>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <Card
            className={`Card-outer-monitor custom-card-body ${
              selectedCard === 4 ? "selected" : ""
            }`}
            style={{
              cursor: "pointer",
              // minHeight: "100px",
              margin: "10px",
            }}
            onClick={() => handleCardClick(4)}
          >
            <Card.Body>
              <div
                className={`card-content ${
                  selectedCard === 4 ? "selected" : ""
                }`}
              >
                <Card.Title
                  style={{
                    color: "#fff",
                  }}
                >
                  Table Health
                </Card.Title>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
};

export default Monitoring;
