import React from "react";
import { Card, Row } from "react-bootstrap";
import TableHealthFilters from "./TableHealthFilters";
import TableView from "./TableView";

const TableHealth = () => {
  const data = [
    {
      name: "Flights",
      is_key_asset: true,
      importance_score: 0.75,
      description: "This is Product A.",
      tags: ["electronics", "gadgets", "tech"],
      SQL_rule: 0,
      freshness: 6,
      volume: 4,
      field_health: 0,
      schema: 7,
    },
    {
      name: "Tickets",
      is_key_asset: false,
      importance_score: 0.45,
      description: "Service B provides technical support.",
      tags: ["services", "tech support"],
      SQL_rule: 2,
      freshness: 8,
      volume: 1,
      field_health: "p",
      schema: "p",
    },
    {
      name: "Boarding Passes",
      is_key_asset: true,
      importance_score: 0.88,
      description: "Customer C is a high-value client.",
      tags: ["customers", "high-value"],
      SQL_rule: 3,
      freshness: 7,
      volume: 2,
      field_health: "p",
      schema: 8,
    },
    {
      name: "Luggage",
      is_key_asset: false,
      importance_score: 0.6,
      description: "Item D description.",
      tags: ["items", "inventory"],
      SQL_rule: 4,
      freshness: 0,
      volume: 3,
      field_health: 7,
      schema: 4,
    },
    {
      name: "Trips",
      is_key_asset: true,
      importance_score: 0.92,
      description: "Client E is a top client.",
      tags: ["clients", "top clients"],
      SQL_rule: 0,
      freshness: "p",
      volume: "p",
      field_health: 2,
      schema: 9,
    },
    {
      name: "Crew",
      is_key_asset: false,
      importance_score: 0.4,
      description: "Service F provides customer support.",
      tags: ["services", "customer support"],
      SQL_rule: "p",
      freshness: 0,
      volume: 0,
      field_health: 0,
      schema: "p",
    },
    {
      name: "Maintenance",
      is_key_asset: true,
      importance_score: 0.85,
      description: "This is Product G.",
      tags: ["electronics", "products"],
      SQL_rule: "p",
      freshness: 0,
      volume: 0,
      field_health: 0,
      schema: 1,
    },
    {
      name: "Client H",
      is_key_asset: true,
      importance_score: 0.78,
      description: "Client H is a loyal customer.",
      tags: ["clients", "loyal customers"],
      SQL_rule: 7,
      freshness: 9,
      volume: 0,
      field_health: 1,
      schema: "p",
    },
    {
      name: "Item I",
      is_key_asset: false,
      importance_score: 0.5,
      description: "Item I description.",
      tags: ["items", "inventory"],
      SQL_rule: 0,
      freshness: 0,
      volume: 8,
      field_health: "p",
      schema: 3,
    },
    {
      name: "Service J",
      is_key_asset: false,
      importance_score: 0.42,
      description: "Service J provides technical support.",
      tags: ["services", "tech support"],
      SQL_rule: 5,
      freshness: 0,
      volume: "p",
      field_health: 0,
      schema: 2,
    },
  ];

  return (
    <div>
      <Card
        className="Card-outer custom-card-body "
        style={{
          minHeight: "70px",
          marginBottom: "10px",
          padding: "25px",
        }}
      >
        <Row>
          <div
            style={{
              padding: "7px",
              borderBottom: "1px solid rgb(227, 227, 227)",
              width: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h5 style={{ marginBottom: "0px" }}>Table Health</h5>
            <p style={{ fontSize: "12px", color: "grey", marginBottom: "5px" }}>
              Shows incidents for each table by status, summarized by their
              respective monitor category
            </p>
          </div>
        </Row>
        <Row>
          <TableHealthFilters data={data} />
        </Row>
        <Row>
          <TableView data={data} />
        </Row>
      </Card>
    </div>
  );
};

export default TableHealth;
