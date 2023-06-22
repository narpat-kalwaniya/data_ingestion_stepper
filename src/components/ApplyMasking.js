import React, { useState, useContext, useEffect } from "react";
import { Table, Form, Input, Col, Row, FormCheck } from "react-bootstrap";
import TableData from "./TableData";
import { DataContext } from "./DataContext";
import Select from "react-select";

const headers = [
  // "Policy Name",
  "Column Name",
  // "PHI/PII Indicator",
  "Mask/Tokenize",
  "Masking Logic",
  // "Role",
];

const ThData = () => {
  return headers.map((name) => <th key={name}> {name}</th>);
};

const ApplyMasking = ({ formData, updateFormData }) => {
  const [connections, setConnections] = useState([]);
  const [masking, setMasking] = useState([]);
  const [selectedMasking, setSelectedMasking] = useState([]);
  const { ingestionData, updateIngestionData } = useContext(DataContext);

  const [tableData, setTableData] = useState([...formData.tableData]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/maskmasterdata/"
        );
        const data = await response.json();
        setMasking(data);
      } catch (error) {
        console.error("Error fetching masking:", error);
      }
    };

    fetchApplications();
  }, []);

  const handleMaskingToggle = (index, checked) => {
    setSelectedMasking((prevSelectedMasking) => {
      const updatedSelectedMasking = [...prevSelectedMasking];
      updatedSelectedMasking[index] = checked ? {} : null;
      return updatedSelectedMasking;
    });

    const updatedTableData = [...tableData];
    updatedTableData[index].is_masking = checked;
    setTableData(updatedTableData);

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);
  };

  const handleMaskingChange = (option, index) => {
    setSelectedMasking((prevSelectedMasking) => {
      const updatedSelectedMasking = [...prevSelectedMasking];
      updatedSelectedMasking[index] = option;
      return updatedSelectedMasking;
    });
    const updatedTableData = [...tableData];
    updatedTableData[index].masking_logic = option.value;
    setTableData(updatedTableData);

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);
  };

  // console.log("masking target load", updateTargetLoad);
  // console.log("masking form data", formData);
  return (
    <div>
      <Table responsive>
        <thead
          style={{
            backgroundColor: "#F3F3F3",
            fontSize: "12px",
            height: "50px",
            alignItems: "center",
          }}
        >
          <tr>{ThData()}</tr>
        </thead>
        <tbody style={{ fontSize: "12px" }}>
          {formData.tableData.map((column, index) => (
            <tr
              key={index}
              style={{
                height: "20px",
              }}
            >
              <td>{column.column_name}</td>
              <td>
                <FormCheck>
                  <FormCheck.Input
                    type="checkbox"
                    checked={column.is_masking}
                    onChange={(e) =>
                      handleMaskingToggle(index, e.target.checked)
                    }
                  />
                </FormCheck>
              </td>

              <td style={{ width: "300px" }}>
                <Select
                  value={formData.tableData[index].masking_logic}
                  onChange={(option) => handleMaskingChange(option, index)}
                  options={masking.map((masking) => ({
                    value: masking.algorithm_name,
                    label: masking.masking_algorithm,
                  }))}
                  isSearchable
                  isDisabled={!column.is_masking}
                  className="custom-select custom-style"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ApplyMasking;
