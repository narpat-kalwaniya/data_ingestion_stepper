import React, { useState } from "react";

import { Card, Col, Row, Table } from "react-bootstrap";
import { FaCheck, FaPlus, FaTimes } from "react-icons/fa";
import FreshnessModal from "./FreshnessModal";
import SchemaModal from "./SchemaModel";

const headers = [
  "Name",
  // "Key Asset",
  "Importance Score",
  "Description",
  "Tags",
  "Business Rule",
  "Freshness",
  "Volume",
  "Data Quality",
  "Schema",
];
const TableView = (props) => {
  const [freshnessModalVisible, setFreshnessModalVisible] = useState(false);
  const [schemaModalVisible, setSchemaModalVisible] = useState(false);

  const openFreshnessModal = () => {
    console.log("Opening modal");
    setFreshnessModalVisible(true);
  };

  const closeFreshnessModal = () => {
    setFreshnessModalVisible(false);
  };
  const openSchemaModal = () => {
    console.log("Opening modal");
    setSchemaModalVisible(true);
  };

  const closeSchemaModal = () => {
    setSchemaModalVisible(false);
  };
  return (
    <div>
      <Table
        hover
        responsive
        className="custom-borderless-table custom-borderless-rows"
        borderless
      >
        <thead
          style={{
            backgroundColor: "#F3F3F3",
            fontSize: "12px",
            height: "40px",
            alignItems: "center",
          }}
        >
          {headers.map((heading) => (
            <th>{heading}</th>
          ))}
        </thead>
        <tbody>
          {props.data.slice(0, 9).map((row, index) => (
            <tr
              key={index}
              style={{
                cursor: "pointer",
                fontSize: "10px",
                height: "15px",
              }}
            >
              <td>{row.name}</td>
              {/* <td></td> */}
              <td>{row.importance_score}</td>
              <td></td>
              <td>
                <div className="tags-container">
                  {row.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td>
                {row.SQL_rule == 0 ? (
                  <span className="icon-green" onClick={openFreshnessModal}>
                    <FaCheck />
                  </span>
                ) : row.SQL_rule == "p" ? (
                  <span className="icon-blue">
                    <FaPlus />
                  </span>
                ) : (
                  <span className="icon-red">{row.SQL_rule}</span>
                )}
              </td>
              <td>
                {row.freshness == 0 ? (
                  <span className="icon-green">
                    <FaCheck />
                  </span>
                ) : row.freshness == "p" ? (
                  <span className="icon-blue">
                    <FaPlus />
                  </span>
                ) : (
                  <span className="icon-red" onClick={openFreshnessModal}>
                    {row.freshness}
                  </span>
                )}
              </td>
              <td>
                {row.volume == 0 ? (
                  <span className="icon-green">
                    <FaCheck />
                  </span>
                ) : row.volume == "p" ? (
                  <span className="icon-blue">
                    <FaPlus />
                  </span>
                ) : (
                  <span className="icon-red">{row.volume}</span>
                )}
              </td>
              <td>
                {row.field_health == 0 ? (
                  <span className="icon-green">
                    <FaCheck />
                  </span>
                ) : row.field_health == "p" ? (
                  <span className="icon-blue">
                    <FaPlus />
                  </span>
                ) : (
                  <span className="icon-red">{row.field_health}</span>
                )}
              </td>
              <td>
                {row.schema == 0 ? (
                  <span className="icon-green">
                    <FaCheck />
                  </span>
                ) : row.schema == "p" ? (
                  <span className="icon-blue">
                    <FaPlus />
                  </span>
                ) : (
                  <span className="icon-red" onClick={openSchemaModal}>
                    {row.schema}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <FreshnessModal
        show={freshnessModalVisible}
        onClose={closeFreshnessModal}
      />
      <SchemaModal show={schemaModalVisible} onClose={closeSchemaModal} />
    </div>
  );
};

export default TableView;
