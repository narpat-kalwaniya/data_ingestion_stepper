import React, { createContext, useState } from "react";

// Create the data context
export const DataContext = createContext();

// Create the data provider
export const DataProviderColRules = ({ children }) => {
  const [columnRulesData, setColumnRulesData] = useState([
    {
      BusinessTestCaseName: null,
      TableName: null,
      ColumnName: null,
      expectation_rule: null,

      expectation_columns: [],
      expectation_inputs: [],
      missing_default_value: null,
      predefined_regex: null,
      custom_regex: null,
      min: null,
      max: null,
      apply_transformation: null,
      group_by_column: null,
      last_modified_column: null,
      allowed_late_days: null,
      reference_dataset_name: null,
      reference_column_name: null,
      sql_custom_query: null,

      alert_threshold_lower: null,
      alert_threshold_upper: null,
      DQDimension: null,
      SeverityLevel: null,
      PriorityLevel: null,
    },
  ]);

  const updateColumnRulesData = (data) => {
    const updatedData = [...columnRulesData];
    const updatedItem = { ...updatedData[0], ...data[0] };
    updatedData[0] = updatedItem;

    setColumnRulesData(updatedData);
  };

  return (
    <DataContext.Provider value={{ columnRulesData, updateColumnRulesData }}>
      {children}
    </DataContext.Provider>
  );
};
