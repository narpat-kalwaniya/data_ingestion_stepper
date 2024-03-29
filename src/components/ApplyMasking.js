import React, { useState, useContext, useEffect } from "react";
import { Table, Form, Input, Col, Row, FormCheck } from "react-bootstrap";
import { DataContext } from "./DataContext";
import Select from "react-select";
import Backend_url from "../config";

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
    if (tableData && Array.isArray(tableData) && masking.length) {
      const _selectedMasking = [];

      tableData.forEach((_tableData, index) => {
        const option = (masking || []).find(
          (_tc) => _tc.algorithm_name === _tableData?.masking_logic
        );

        if (option) {
          _selectedMasking[index] = {
            value: option.algorithm_name,
            label: option.masking_algorithm,
          };
        }
      });
      setSelectedMasking([..._selectedMasking]);
    }
  }, [masking, tableData]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`${Backend_url}/maskmasterdata/`);
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

    const updatedData = {
      attributes: [
        updatedTableData, // Add new attribute object
      ],
    };
    updateIngestionData(updatedData);
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

    const updatedData = {
      attributes: [
        updatedTableData, // Add new attribute object
      ],
    };
    updateIngestionData(updatedData);
  };

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
                  value={selectedMasking[index]}
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
