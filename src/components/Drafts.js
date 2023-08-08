import React, { useEffect, useState } from "react";

import { Table } from "react-bootstrap";

import { Trash } from "react-bootstrap-icons";

import { formContext } from "./formContext";
import { useContext } from "react";

function Drafts(props) {
  const headers = [
    "Module",
    "Source Entity Name",
    "Target Entity Name",
    "Status",
    "",
  ];

  console.log(props.drafts);

  const rowClickHandler = (row) => {
    props.setFormData(row);
    props.setOpen(true);
    props.setStep(row.current_step);
    props.handleClose(
      "Batch Ingestion of Relational Sources for Single Entity"
    );
    console.log(props.formData);
    props.setIsUpdate(true);
  };

  const deleteHandler = async (id) => {
    console.log("deleted id", id);
    props.setIsLoading(true);
    try {
      const response = await fetch(
        `http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/deletedraft/${id}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        // Data deleted successfully from the backend, you may want to update the state or fetch the data again
        console.log("Draft deleted successfully!");

        // setPipelineData((prevData) =>
        //   prevData.map((row) =>
        //     row.entity_id === selectedEntityId ? { ...row, deleted: true } : row
        //   )
        // );

        try {
          const response = await fetch(
            "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/getdrafts/"
          );
          const data = await response.json();
          // console.log(data);
          props.setDrafts(data);
          // setSelectedTestcases(Array(formData.tableData.length).fill(""));
        } catch (error) {
          console.log("Error fetching test cases:", error);
        }
      } else {
        console.log("Failed to delete draft from the backend.");
      }
    } catch (error) {
      console.log("Error deleting data:", error);
    }

    // Close the modal
    props.setIsLoading(false);
  };

  return (
    <Table hover responsive>
      {props.isLoading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      <thead
        style={{
          backgroundColor: "#F3F3F3",
          fontSize: "12px",
          height: "50px",
          alignItems: "center",
        }}
      >
        <tr>
          {headers.map((name, index) => (
            <th key={index}>{name}</th>
          ))}
        </tr>
      </thead>

      <tbody style={{ fontSize: "12px" }}>
        {props.drafts.map((row, index) => (
          <tr
            key={index}
            style={{
              height: "20px",
              cursor: "default",
            }}
          >
            <td onClick={(event) => rowClickHandler(row)}>Data Ingestion</td>
            <td onClick={(event) => rowClickHandler(row)}>
              {row.tableData[0].source_entity_name}
            </td>
            <td onClick={(event) => rowClickHandler(row)}>
              {row.tableData[0].target_entity_name}
            </td>
            <td
              style={{ color: "red" }}
              onClick={(event) => rowClickHandler(row)}
            >
              Draft
            </td>
            <td>
              <Trash
                className="trash"
                onClick={(event) => deleteHandler(row.draft_id)}
              />
            </td>
            {/* <td style={{ color: "blue" }}>View</td>
            <td style={{ color: "blue" }}>Edit</td>
            <td style={{ color: "blue" }}>Delete</td> */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Drafts;
