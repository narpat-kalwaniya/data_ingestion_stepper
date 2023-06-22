// import React, { useEffect, useState } from "react";
// import { Table, Form, FormControl } from "react-bootstrap";
// import Select from "react-select";
// import TagsInput from "react-tagsinput";
// import "react-tagsinput/react-tagsinput.css";

// const headers = [
//   "Column Name",
//   "Target Data Type",
//   "Validation Rule",
//   "Validation Input",
//   "Quality Score",
// ];

// export const DefineDataValidation = ({ formData }) => {
//   const [testcases, setTestcases] = useState([]);
//   const [selectedTestcases, setSelectedTestcases] = useState([]);
//   const [tagValues, setTagValues] = useState([]);

//   useEffect(() => {
//     fetchTestcases();
//   }, []);

//   const fetchTestcases = async () => {
//     try {
//       const response = await fetch(
//         "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/testcasemaster/"
//       );
//       const data = await response.json();
//       setTestcases(data);
//       setSelectedTestcases(Array(formData.tableData.length).fill([]));
//     } catch (error) {
//       console.log("Error fetching test cases:", error);
//     }
//   };

//   const handleTestcaseChange = (option, index) => {
//     setSelectedTestcases((prevSelectedTestcases) => {
//       const updatedSelectedTestcases = [...prevSelectedTestcases];
//       updatedSelectedTestcases[index] = option;
//       return updatedSelectedTestcases;
//     });
//   };

//   const handleTagChange = (tags, index) => {
//     setTagValues((prevTagValues) => {
//       const updatedTagValues = [...prevTagValues];
//       updatedTagValues[index] = tags;
//       return updatedTagValues;
//     });
//   };

//   const validateTagCount = (tags) => {
//     const desiredCount = 3; // Specify the desired tag count here
//     if (tags.length > desiredCount) {
//       return false;
//     }
//     return true;
//   };

//   return (
//     <Table responsive>
//       <thead>
//         <tr>
//           {headers.map((name, index) => (
//             <th key={index}>{name}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {formData.tableData.map((column, index) => (
//           <tr key={index}>
//             <td>{column.column_name}</td>
//             <td>{column.target_datatype}</td>
//             <td>
//               <Select
//                 value={selectedTestcases[index]}
//                 onChange={(option) => handleTestcaseChange(option, index)}
//                 options={testcases.map((testcase) => ({
//                   value: testcase.testcase_name,
//                   label: testcase.testcase_name_alias,
//                 }))}
//                 placeholder="Select Test Case"
//                 isSearchable
//               />
//             </td>
//             <td>
//               <Form.Group>
//                 <TagsInput
//                   value={tagValues[index] || []}
//                   onChange={(tags) => handleTagChange(tags, index)}
//                   validationRegex={/^.*$/}
//                   validationError="Please enter valid tags"
//                   tagProps={{ className: "react-tagsinput-tag info" }}
//                 />
//                 {!validateTagCount(tagValues[index] || []) && (
//                   <Form.Text className="text-danger">
//                     Please select fewer than 3 values
//                   </Form.Text>
//                 )}
//               </Form.Group>
//             </td>
//             <td>
//               <FormControl
//                 type="text"
//                 onChange={(e) => {
//                   // Handle Quality Score change
//                 }}
//               />
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   );
// };

import React, { useEffect, useState, useContext } from "react";
import { Table, Form, FormControl, Button } from "react-bootstrap";
import Select from "react-select";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { DataContext } from "./DataContext";
import { HiOutlinePlus } from "react-icons/hi";

const headers = [
  "Column Name",
  "Target Data Type",
  "Validation Rule",
  "Validation Input",
  "Quality Score",
];

export const DefineDataValidation = ({ formData, updateFormData }) => {
  const [testcases, setTestcases] = useState([]);
  const [selectedTestcases, setSelectedTestcases] = useState([]);
  const [tagValues, setTagValues] = useState([]);
  const [inputCounts, setInputCounts] = useState(
    formData.tableData.map(() => 1)
  );
  const [tableData, setTableData] = useState([...formData.tableData]);
  const { ingestionData, updateIngestionData } = useContext(DataContext);

  useEffect(() => {
    fetchTestcases();
  }, []);

  const fetchTestcases = async () => {
    try {
      const response = await fetch(
        "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/testcasemaster/"
      );
      const data = await response.json();
      setTestcases(data);
      // setSelectedTestcases(Array(formData.tableData.length).fill([]));
    } catch (error) {
      console.log("Error fetching test cases:", error);
    }
  };

  const handleAddInput = (index) => {
    setInputCounts((prevCounts) => {
      const updatedCounts = [...prevCounts];
      updatedCounts[index] += 1;
      return updatedCounts;
    });
  };

  const handleTestcaseChange = (option, rowIndex, inputIndex) => {
    setSelectedTestcases((prevSelectedTestcases) => {
      const updatedSelectedTestcases = [...prevSelectedTestcases];
      const selectedTestcasesForRow = updatedSelectedTestcases[rowIndex] || [];
      selectedTestcasesForRow[inputIndex] = option;
      updatedSelectedTestcases[rowIndex] = selectedTestcasesForRow;

      const updatedTableData = [...tableData];
      updatedTableData[rowIndex].validation_rules = selectedTestcasesForRow.map(
        (object) => object.value
      );
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

      return updatedSelectedTestcases;
    });
  };

  const handleTagChange = (tags, rowIndex, inputIndex) => {
    setTagValues((prevTagValues) => {
      const updatedTagValues = [...prevTagValues];
      const tagValuesForRow = updatedTagValues[rowIndex] || [];
      tagValuesForRow[inputIndex] = tags;
      updatedTagValues[rowIndex] = tagValuesForRow;

      const updatedTableData = [...tableData];
      updatedTableData[rowIndex].validation_input = tagValuesForRow;
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
      return updatedTagValues;
    });
  };

  const validateTagCount = (tags) => {
    const desiredCount = 3; // Specify the desired tag count here
    if (tags.length > desiredCount) {
      return false;
    }
    return true;
  };

  const qualityScoreHandler = (value, index) => {
    const updatedTableData = [...tableData];
    updatedTableData[index].quality_score = value;
    setTableData(updatedTableData);

    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };
    updateFormData(updatedFormData);
    // console.log(pageData);
    const updatedData = {
      attributes: [
        updatedTableData, // Add new attribute object
      ],
    };
    updateIngestionData(updatedData);
  };
  // console.log("testcases", selectedTestcases);
  // console.log("tags", tagValues);
  // console.log("forndata", formData);
  console.log("define data validation ingestionData", ingestionData);
  return (
    <Table responsive>
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
        {formData.tableData.map((column, rowIndex) => (
          <tr key={rowIndex}>
            <td>{column.column_name}</td>
            <td>{column.target_datatype}</td>
            <td>
              {Array(inputCounts[rowIndex])
                .fill()
                .map((_, inputIndex) => (
                  <React.Fragment key={`${rowIndex}-${inputIndex}`}>
                    <Select
                      value={
                        selectedTestcases[rowIndex] &&
                        selectedTestcases[rowIndex][inputIndex]
                      }
                      // value={
                      //   formData.tableData[rowIndex].validation_rules[
                      //     inputIndex
                      //   ]
                      // }
                      onChange={(option) =>
                        handleTestcaseChange(option, rowIndex, inputIndex)
                      }
                      options={testcases.map((testcase) => ({
                        value: testcase.testcase_name,
                        label: testcase.testcase_name_alias,
                      }))}
                      placeholder="Select Test Case"
                      isSearchable
                      className="custom-select custom-style"
                    />
                    <br /> {/* Add spacing between the fields */}
                  </React.Fragment>
                ))}
            </td>
            <td>
              <div className="d-flex justify-content-between align-items-center">
                {Array(inputCounts[rowIndex])
                  .fill()
                  .map((_, inputIndex) => (
                    <React.Fragment key={`${rowIndex}-${inputIndex}`}>
                      <Form.Group>
                        <TagsInput
                          value={
                            (tagValues[rowIndex] &&
                              tagValues[rowIndex][inputIndex]) ||
                            []
                          }
                          onChange={(tags) =>
                            handleTagChange(tags, rowIndex, inputIndex)
                          }
                          validationRegex={/^.*$/}
                          validationError="Please enter valid tags"
                          tagProps={{ className: "react-tagsinput-tag info" }}
                          inputProps={{ placeholder: " " }}
                        />
                        {!validateTagCount(
                          (tagValues[rowIndex] &&
                            tagValues[rowIndex][inputIndex]) ||
                            []
                        ) && (
                          <Form.Text className="text-danger">
                            Please select fewer than 3 values
                          </Form.Text>
                        )}
                      </Form.Group>
                      <br /> {/* Add spacing between the fields */}
                    </React.Fragment>
                  ))}

                <HiOutlinePlus
                  style={{
                    height: "15px",
                    width: "15px",
                    color: "white",
                    backgroundColor: "#4F4F4F",
                  }}
                  onClick={() => handleAddInput(rowIndex)}
                />
              </div>
            </td>

            <td>
              <FormControl
                type="text"
                onChange={(e) => {
                  qualityScoreHandler(e.target.value, rowIndex);
                }}
                className="custom-select custom-style"
                value={column.quality_score}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
