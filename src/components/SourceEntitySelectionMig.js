// import React, { useState, useEffect, useContext, Children } from "react";
// import { Form, Row, Col, Card, Button } from "react-bootstrap";
// import { DataContext } from "./DataContext";
// import MultiSelect from "multiselect-react-dropdown";
// import DropdownTreeSelect from "react-dropdown-tree-select";
// import "react-dropdown-tree-select/dist/styles.css";

// import { TreeSelect } from "primereact/treeselect";
// import "primereact/resources/themes/saga-blue/theme.css";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";

// const SourceEntitySelection = ({ step, formData, updateFormData, errors2 }) => {
//   const [dataSourceType, setDataSourceType] = useState(
//     formData.sourceEntity.data_source_type
//   );
//   const [databases, setDatabases] = useState([]);
//   const [schemas, setSchemas] = useState([]);
//   const [selectedLabels, setSelectedLabels] = useState([]);
//   const [selectedDatabase, setSelectedDatabase] = useState(
//     formData.sourceEntity.db_name
//   );
//   const [selectedSchema, setSelectedSchema] = useState(
//     formData.sourceEntity.schema_name
//   );
//   const [selectedTable, setSelectedTable] = useState("");

//   const [bucketName, setBucketName] = useState("");
//   const [fullFileName, setFullFileName] = useState("");
//   const [migData, setMigData] = useState("");

//   const [disableElement, setDisableElement] = useState({
//     query: true,
//     db_name: true,
//     schema_name: true,
//     table_name: true,
//     bucket_name: true,
//     full_file_name: true,
//   });

//   const { ingestionData, updateIngestionData } = useContext(DataContext);
//   const [updatedQuery, setUpdatedQuery] = useState("");
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const selectChangeHandler = (event) => {
//     const { value } = event.target;
//     setDataSourceType(value);
//     const updatedSourceEntity = {
//       ...formData.sourceEntity,
//       data_source_type: value,
//     };
//     const updatedFormData = {
//       ...formData,
//       sourceEntity: updatedSourceEntity,
//     };
//     updateFormData(updatedFormData);

//     const updatedData = {
//       data_source_type: value,
//     };
//     updateIngestionData(updatedData);
//   };

//   // Event listener for Bucket Name and Full File Name Change Handler
//   const bucket_fileNameChangeHandler = (event) => {
//     const { name, value } = event.target;
//     if (name === "BucketName") {
//       setBucketName(value);
//       const updatedSourceEntity = {
//         ...formData.sourceEntity,
//         bucket_name: value,
//       };
//       const updatedFormData = {
//         ...formData,
//         sourceEntity: updatedSourceEntity,
//       };
//       updateFormData(updatedFormData);
//       const updatedData = {
//         bucket_name: value,
//       };
//       updateIngestionData(updatedData);
//     } else if (name === "FullFileName") {
//       setFullFileName(value);
//       const updatedSourceEntity = {
//         ...formData.sourceEntity,
//         full_file_name: value,
//       };
//       const updatedFormData = {
//         ...formData,
//         sourceEntity: updatedSourceEntity,
//       };
//       updateFormData(updatedFormData);
//       const updatedData = {
//         full_file_name: value,
//       };
//       updateIngestionData(updatedData);
//     }
//   };

//   // Fetch databases, schemas, and tables from API or data source
//   // and populate the corresponding dropdowns

//   const connectionId = formData.sourceEntity.connection_id;

//   useEffect(() => {
//     const fetchMigSchema = async () => {
//       try {
//         const response = await fetch(
//           `http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/getmigschema/${connectionId}`
//         );
//         const data = await response.json();
//         setMigData(data);
//       } catch (error) {
//         console.error("Error fetching masking:", error);
//       }
//     };

//     fetchMigSchema();
//   }, []);

//   const formatDataForDropdown = (data) => {
//     return Object.keys(data).map((key) => {
//       return {
//         label: key,
//         value: key,
//         children: data[key].map((item, index) => ({
//           label: item,
//           value: `${key}-${index}`, // Append a unique identifier
//         })),
//       };
//     });
//   };

//   const formattedData = formatDataForDropdown(migData);

//   const handleNodeSelection = (currentNode, selectedNodes) => {
//     selectedNodes.forEach((node) => {
//       const { value, label } = node;
//       const valuePrefix = value.split("-")[0];

//       if (!selectedLabels[valuePrefix]) {
//         selectedLabels[valuePrefix] = [];
//       }

//       selectedLabels[valuePrefix].push(label);
//     });

//     setSelectedLabels(selectedLabels);
//     console.log("Selected Labels:", selectedLabels);
//   };

//   useEffect(() => {
//     const updatedSourceEntity = {
//       ...formData.sourceEntity,
//       schema_name: Object.keys(selectedLabels)[0],
//       table_name: Object.values(selectedLabels)[0],
//     };
//     const updatedFormData = {
//       ...formData,
//       sourceEntity: updatedSourceEntity,
//     };
//     updateFormData(updatedFormData);
//     const updatedData = {
//       schema_name: Object.keys(selectedLabels)[0],
//       table_name: Object.values(selectedLabels)[0],
//     };
//     updateIngestionData(updatedData);
//   }, [step == 3]);

//   const [selectedNode, setSelectedNode] = useState(null);
//   const [treeData, setTreeData] = useState([]);
//   // const [selectedNodeKeys, setSelectedNodeKeys] = useState([]);

//   // const formatData = (apiData) => {
//   //   return Object.keys(apiData).map((parent) => {
//   //     const children = apiData[parent].map((item) => ({
//   //       label: item,
//   //       value: item,
//   //       checked: selectedNodeKeys.includes(item), // Set checked property based on selection
//   //     }));

//   //     return {
//   //       label: parent,
//   //       value: parent,
//   //       checked: selectedNodeKeys.includes(parent), // Set checked property based on selection
//   //       children: children,
//   //     };
//   //   });
//   // };

//   // const formattedData = formatData(migData);

//   // const handleNodeSelect = (e) => {
//   //   const { value } = e;
//   //   if (!formattedData) {
//   //     // Handle formattedData not available yet
//   //     return;
//   //   }

//   //   const selectedNode = formattedData.find((node) => node.value === value);

//   //   if (selectedNode) {
//   //     if (selectedNode.checked) {
//   //       // If the node is already selected, deselect it and its children
//   //       const updatedSelectedNodes = selectedNodeKeys.filter(
//   //         (node) =>
//   //           node !== value &&
//   //           !selectedNode.children.some((child) => child.value === node)
//   //       );
//   //       setSelectedNodeKeys(updatedSelectedNodes);
//   //     } else {
//   //       // If the node is not selected, select it along with its children
//   //       const updatedSelectedNodes = [
//   //         ...selectedNodeKeys,
//   //         value,
//   //         ...selectedNode.children.map((child) => child.value),
//   //       ];
//   //       setSelectedNodeKeys(updatedSelectedNodes);
//   //     }
//   //   } else {
//   //     // If the selected node is a child, just toggle its selection
//   //     setSelectedNodeKeys((prevSelected) =>
//   //       prevSelected.includes(value)
//   //         ? prevSelected.filter((node) => node !== value)
//   //         : [...prevSelected, value]
//   //     );
//   //   }
//   // };

//   const disable_enable = () => {
//     if (dataSourceType === "RDBMS-TABLE") {
//       const newDisable = { ...disableElement };
//       newDisable.query = true;
//       newDisable.db_name = false;
//       newDisable.schema_name = false;
//       newDisable.table_name = false;
//       newDisable.full_file_name = true;
//       newDisable.bucket_name = true;
//       setDisableElement(newDisable);
//     } else if (dataSourceType === "RDBMS-QUERY") {
//       const newDisable2 = { ...disableElement };
//       newDisable2.query = false;
//       newDisable2.db_name = true;
//       newDisable2.schema_name = true;
//       newDisable2.table_name = true;
//       newDisable2.bucket_name = true;
//       newDisable2.full_file_name = true;
//       setDisableElement(newDisable2);
//     } else if (dataSourceType === "Flat File") {
//       const newDisable3 = { ...disableElement };
//       newDisable3.query = true;
//       newDisable3.db_name = true;
//       newDisable3.schema_name = true;
//       newDisable3.table_name = true;
//       newDisable3.bucket_name = false;
//       newDisable3.full_file_name = false;
//       setDisableElement(newDisable3);
//     }
//   };

//   useEffect(() => {
//     if (step === 2) {
//       disable_enable();
//     }
//   }, [dataSourceType]);

//   console.log("source entity ingestion data", ingestionData);
//   console.log("selected nodes", selectedNode);

//   return (
//     <Card.Body className="custom-card-body">
//       <div className="text-left">
//         <Form>
//           <Row className="mb-4">
//             <Col>
//               <Form.Label>
//                 Data Source Type <span className="text-danger">*</span>
//               </Form.Label>
//               <div className="radio-group">
//                 <Form.Check
//                   inline
//                   type="radio"
//                   label="RDBMS-TABLE"
//                   name="options"
//                   value="RDBMS-TABLE"
//                   checked={dataSourceType === "RDBMS-TABLE"}
//                   onChange={selectChangeHandler}
//                   className="custom-radio"
//                 />

//                 <Form.Check
//                   inline
//                   type="radio"
//                   label="Flat File"
//                   name="options"
//                   value="Flat File"
//                   checked={dataSourceType === "Flat File"}
//                   onChange={selectChangeHandler}
//                   className="custom-radio"
//                 />
//               </div>

//               {errors2.data_source_type && (
//                 <div className="error">{errors2.data_source_type}</div>
//               )}
//             </Col>
//           </Row>

//           <Row className="mb-4">
//             <Col>
//               <div className="form-group">
//                 <Form.Label>
//                   Database Name <span className="text-danger">*</span>
//                 </Form.Label>
//                 <Form.Select
//                   value={formData.sourceEntity.db_name}
//                   // onChange={handleDatabaseChange}
//                   // disabled={dataSourceType !== "RDBMS-TABLE"}
//                   disabled={disableElement.db_name}
//                   isInvalid={errors2.db_name}
//                   className="custom-select custom-style"
//                 >
//                   <option value="">datacopy</option>
//                   {databases.map((database) => (
//                     <option key={database} value={database}>
//                       {database}
//                     </option>
//                   ))}
//                 </Form.Select>
//                 {errors2.db_name && (
//                   <div className="error">{errors2.db_name}</div>
//                 )}
//               </div>
//             </Col>

//             <Col>
//               <DropdownTreeSelect
//                 data={formattedData}
//                 // onChange={(currentNode, selectedNodes) => {
//                 //   console.log("Selected Nodes: ", selectedNodes);
//                 // }}
//                 onChange={handleNodeSelection}
//               />
//               {/* <TreeSelect
//                 value={selectedNode}
//                 onChange={handleNodeSelection}
//                 options={formattedData}
//                 showCheckbox // Enable checkboxes for parent nodes
//                 selectionMode="checkbox" // Enable checkbox selection
//                 className="md:w-20rem w-full"
//                 filter
//                 filterBy="label"
//                 placeholder="Select Items"
//               /> */}
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <div className="form-group">
//                 <Form.Label>
//                   Bucket Name <span className="text-danger">*</span>
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="BucketName"
//                   className="custom-select custom-style"
//                   onChange={bucket_fileNameChangeHandler}
//                   value={formData.sourceEntity.bucket_name}
//                   // disabled={dataSourceType !== "Flat File"}
//                   disabled={disableElement.bucket_name}
//                   isInvalid={errors2.bucket_name}
//                 />
//                 {errors2.bucket_name && (
//                   <div className="error">{errors2.bucket_name}</div>
//                 )}
//               </div>
//             </Col>
//             <Col>
//               <div className="form-group">
//                 <Form.Label>
//                   Full File Name <span className="text-danger">*</span>
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="FullFileName"
//                   className="custom-select custom-style"
//                   onChange={bucket_fileNameChangeHandler}
//                   value={formData.sourceEntity.full_file_name}
//                   // disabled={dataSourceType !== "Flat File"}
//                   disabled={disableElement.full_file_name}
//                   isInvalid={errors2.full_file_name}
//                 />
//                 {errors2.full_file_name && (
//                   <div className="error">{errors2.full_file_name}</div>
//                 )}
//               </div>
//             </Col>
//             <Col></Col>
//           </Row>
//         </Form>
//       </div>
//     </Card.Body>
//   );
// };

// export default SourceEntitySelection;

import React, { useState, useEffect, useContext, Children } from "react";
import { Form, Row, Col, Card, Button } from "react-bootstrap";
import { DataContext } from "./DataContext";
import MultiSelect from "multiselect-react-dropdown";
import "./Migration/AppMig.css";

const SourceEntitySelectionMig = ({
  step,
  formData,
  updateFormData,
  errors2,
}) => {
  const [dataSourceType, setDataSourceType] = useState(
    formData.sourceEntity.data_source_type
  );
  const [databases, setDatabases] = useState([]);
  const [schemas, setSchemas] = useState([]);
  const [tables, setTables] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState(
    formData.sourceEntity.db_name
  );
  const [selectedSchema, setSelectedSchema] = useState(
    formData.sourceEntity.schema_name
  );
  const [selectedTable, setSelectedTable] = useState("");

  const [bucketName, setBucketName] = useState("");
  const [fullFileName, setFullFileName] = useState("");
  const [migData, setMigData] = useState("");

  const [disableElement, setDisableElement] = useState({
    query: true,
    db_name: true,
    schema_name: true,
    table_name: true,
    bucket_name: true,
    full_file_name: true,
  });

  const { ingestionData, updateIngestionData } = useContext(DataContext);
  const [updatedQuery, setUpdatedQuery] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const selectChangeHandler = (event) => {
    const { value } = event.target;
    setDataSourceType(value);
    const updatedSourceEntity = {
      ...formData.sourceEntity,
      data_source_type: value,
    };
    const updatedFormData = {
      ...formData,
      sourceEntity: updatedSourceEntity,
    };
    updateFormData(updatedFormData);

    const updatedData = {
      data_source_type: value,
    };
    updateIngestionData(updatedData);
  };

  const handleDatabaseChange = (event) => {
    const { value } = event.target;
    setSelectedDatabase(value);
    setSelectedSchema(""); // Reset selected schema when database changes
    setSelectedTable(""); // Reset selected table when database changes
    const updatedSourceEntity = {
      ...formData.sourceEntity,
      db_name: value,
    };
    const updatedFormData = {
      ...formData,
      sourceEntity: updatedSourceEntity,
    };
    updateFormData(updatedFormData);

    const updatedData = {
      db_name: value,
    };
    updateIngestionData(updatedData);
  };

  const handleSchemaChange = (event) => {
    const { value } = event.target;
    setSelectedSchema(value);
    setSelectedTable(""); // Reset selected table when schema changes
    const updatedSourceEntity = {
      ...formData.sourceEntity,
      schema_name: value,
    };
    const updatedFormData = {
      ...formData,
      sourceEntity: updatedSourceEntity,
    };
    updateFormData(updatedFormData);
    const updatedData = {
      schema_name: value,
    };
    updateIngestionData(updatedData);
  };

  const handleOptionSelect = (selectedList) => {
    setSelectedOptions(selectedList);
    const valueList = selectedList.map((option) => option.value);
    console.log("selected table list", valueList);

    const updatedSourceEntity = {
      ...formData.sourceEntity,
      table_name: valueList,
    };
    const updatedFormData = {
      ...formData,
      sourceEntity: updatedSourceEntity,
    };
    updateFormData(updatedFormData);

    const updatedData = {
      table_name: valueList,
    };
    updateIngestionData(updatedData);
  };

  // Event listener for Bucket Name and Full File Name Change Handler
  const bucket_fileNameChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "BucketName") {
      setBucketName(value);
      const updatedSourceEntity = {
        ...formData.sourceEntity,
        bucket_name: value,
      };
      const updatedFormData = {
        ...formData,
        sourceEntity: updatedSourceEntity,
      };
      updateFormData(updatedFormData);
      const updatedData = {
        bucket_name: value,
      };
      updateIngestionData(updatedData);
    } else if (name === "FullFileName") {
      setFullFileName(value);
      const updatedSourceEntity = {
        ...formData.sourceEntity,
        full_file_name: value,
      };
      const updatedFormData = {
        ...formData,
        sourceEntity: updatedSourceEntity,
      };
      updateFormData(updatedFormData);
      const updatedData = {
        full_file_name: value,
      };
      updateIngestionData(updatedData);
    }
  };

  // Fetch databases, schemas, and tables from API or data source
  // and populate the corresponding dropdowns

  const connectionId = formData.sourceEntity.connection_id;
  const fetchDatabaseSchemaTableData = async () => {
    try {
      // Perform API call or fetch data from the data source
      const response = await fetch(
        `http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/getschematable/${connectionId}`
      );
      const data = await response.json();

      // Extract databases, schemas, and tables from the data
      const uniqueDatabases = [...new Set(data.map((item) => item.database))];
      setDatabases(uniqueDatabases);

      // Filter schemas based on selected database
      const filteredSchemas = [
        ...new Set(
          data
            .filter((item) => item.database === selectedDatabase)
            .map((item) => item.schema)
        ),
      ];
      setSchemas(filteredSchemas);

      // Filter tables based on selected database and schema
      const filteredTables = [
        ...new Set(
          data
            .filter(
              (item) =>
                item.database === selectedDatabase &&
                item.schema === selectedSchema
            )
            .map((item) => item.table_name)
        ),
      ];
      setTables(filteredTables);
    } catch (error) {
      console.error("Error fetching database, schema, and table data:", error);
    }
  };

  useEffect(() => {
    // Fetch the initial database, schema, and table data on component mount
    fetchDatabaseSchemaTableData();
  }, []);

  useEffect(() => {
    // Fetch filtered schemas whenever the selected database changes
    fetchDatabaseSchemaTableData();
  }, [selectedDatabase]);

  useEffect(() => {
    // Fetch filtered tables whenever the selected database or schema changes
    fetchDatabaseSchemaTableData();
  }, [selectedDatabase, selectedSchema]);

  const disable_enable = () => {
    if (dataSourceType === "RDBMS-TABLE") {
      const newDisable = { ...disableElement };
      newDisable.query = true;
      newDisable.db_name = false;
      newDisable.schema_name = false;
      newDisable.table_name = false;
      newDisable.full_file_name = true;
      newDisable.bucket_name = true;
      setDisableElement(newDisable);
    } else if (dataSourceType === "RDBMS-QUERY") {
      const newDisable2 = { ...disableElement };
      newDisable2.query = false;
      newDisable2.db_name = true;
      newDisable2.schema_name = true;
      newDisable2.table_name = true;
      newDisable2.bucket_name = true;
      newDisable2.full_file_name = true;
      setDisableElement(newDisable2);
    } else if (dataSourceType === "Flat File") {
      const newDisable3 = { ...disableElement };
      newDisable3.query = true;
      newDisable3.db_name = true;
      newDisable3.schema_name = true;
      newDisable3.table_name = true;
      newDisable3.bucket_name = false;
      newDisable3.full_file_name = false;
      setDisableElement(newDisable3);
    }
  };

  useEffect(() => {
    if (step === 2) {
      disable_enable();
    }
  }, [dataSourceType]);

  console.log("source entity ingestion data", ingestionData);

  return (
    <Card.Body className="custom-card-body">
      <div className="text-left">
        <Form>
          <Row className="mb-4">
            <Col>
              <Form.Label>
                Data Source Type <span className="text-danger">*</span>
              </Form.Label>
              <div className="radio-group">
                <Form.Check
                  inline
                  type="radio"
                  label="RDBMS-TABLE"
                  name="options"
                  value="RDBMS-TABLE"
                  checked={dataSourceType === "RDBMS-TABLE"}
                  onChange={selectChangeHandler}
                  className="custom-radio"
                />

                <Form.Check
                  inline
                  type="radio"
                  label="Flat File"
                  name="options"
                  value="Flat File"
                  checked={dataSourceType === "Flat File"}
                  onChange={selectChangeHandler}
                  className="custom-radio"
                />
              </div>

              {errors2.data_source_type && (
                <div className="error">{errors2.data_source_type}</div>
              )}
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <div className="form-group">
                <Form.Label>
                  Database Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  value={formData.sourceEntity.db_name}
                  onChange={handleDatabaseChange}
                  // disabled={dataSourceType !== "RDBMS-TABLE"}
                  disabled={disableElement.db_name}
                  isInvalid={errors2.db_name}
                  className="custom-select custom-style"
                >
                  <option value="">Select Database</option>
                  {databases.map((database) => (
                    <option key={database} value={database}>
                      {database}
                    </option>
                  ))}
                </Form.Select>
                {errors2.db_name && (
                  <div className="error">{errors2.db_name}</div>
                )}
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <Form.Label>
                  Schema Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  value={formData.sourceEntity.schema_name}
                  onChange={handleSchemaChange}
                  // disabled={
                  //   dataSourceType !== "RDBMS-TABLE" || !selectedDatabase
                  // }
                  disabled={disableElement.schema_name || !selectedDatabase}
                  isInvalid={errors2.schema_name}
                  className="custom-select custom-style"
                >
                  <option value="">Select Schema</option>
                  {schemas.map((schema) => (
                    <option key={schema} value={schema}>
                      {schema}
                    </option>
                  ))}
                </Form.Select>
                {errors2.schema_name && (
                  <div className="error">{errors2.schema_name}</div>
                )}
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <Form.Label>
                  Table Name <span className="text-danger">*</span>
                </Form.Label>
                <MultiSelect
                  options={tables.map((table) => ({
                    key: table,
                    value: table,
                  }))}
                  selectedValues={formData.sourceEntity.table_name.map(
                    (option) => ({
                      key: option,
                      value: option,
                    })
                  )}
                  onSelect={handleOptionSelect}
                  onRemove={handleOptionSelect}
                  showArrow={true}
                  showCheckbox={true}
                  displayValue="key"
                  closeOnSelect={false}
                  closeIcon="cancel"
                  isInvalid={errors2.table_name}
                />
                {errors2.table_name && (
                  <div className="error">{errors2.table_name}</div>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="form-group">
                <Form.Label>
                  Bucket Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="BucketName"
                  className="custom-select custom-style"
                  onChange={bucket_fileNameChangeHandler}
                  value={formData.sourceEntity.bucket_name}
                  // disabled={dataSourceType !== "Flat File"}
                  disabled={disableElement.bucket_name}
                  isInvalid={errors2.bucket_name}
                />
                {errors2.bucket_name && (
                  <div className="error">{errors2.bucket_name}</div>
                )}
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <Form.Label>
                  Full File Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="FullFileName"
                  className="custom-select custom-style"
                  onChange={bucket_fileNameChangeHandler}
                  value={formData.sourceEntity.full_file_name}
                  // disabled={dataSourceType !== "Flat File"}
                  disabled={disableElement.full_file_name}
                  isInvalid={errors2.full_file_name}
                />
                {errors2.full_file_name && (
                  <div className="error">{errors2.full_file_name}</div>
                )}
              </div>
            </Col>
            <Col></Col>
          </Row>
        </Form>
      </div>
    </Card.Body>
  );
};

export default SourceEntitySelectionMig;
