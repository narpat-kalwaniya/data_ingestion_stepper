import React, { createContext, useState } from "react";

// Create the data context
export const DataContext = createContext();

// Create the data provider
export const DataProvider = ({ children }) => {
  const [ingestionData, setIngestionData] = useState([
    {
      source_connection_id: "",
      target_connection_id: "",
      app_id: "",
      source_entity_name: "",
      target_entity_name: "",
      data_source_type: "",
      query: "",
      db_name: "",
      schema_name: "",
      table_name: "",
      bucket_name: "",
      full_file_name: "",
      attributes: [
        {
          column_name: "",
          data_type: "",
          numeric_precision: "",
          numeric_scale: "",
          character_maximum_length: "",
          is_nullable: "",
          is_primary_key: "",
          is_business_key: "",
          target_column_name: "",
          target_datatype: "",
          target_numeric_precision: "",
          target_numeric_scale: "",
          target_character_maximum_length: "",
          target_is_nullable: "",
          sample_values: [],
          transformation_logic: "",
        },
      ],
      testcases: [
        {
          rule: "",
          target_column_name: "",
          inputs: [],
        },
      ],
      masking_rules: [
        {
          // Add masking rule fields
        },
      ],
      source_extract_criteria: {
        source_entity_type: "",
        is_incremental: "",
        is_full_extract: "",
        is_select_distinct: "",
        incremental_by: "",
        source_incremental_column: "",
        incremental_start_time: "",
        incremental_end_time: "",
        incremental_start_sequence: "",
        incremental_end_sequence: "",
        default_start_value: "",
        filter: "",
        order_by: "",
      },
      target_load_details: {
        target_entity_name: "",
        target_load_type: "",
        data_quality_monitor_alert: "",
        data_quality_monitor_abort: "",
        record_counts_change_monitor_alert: "",
        record_counts_change_monitor_abort: "",
        is_mantain_a_copy_in_datalake: "",
        datalake_connection: "",
        datalake_file_format: "",
        datalake_target_template: "",
      },
      additional_metadata: {
        business_tags: "",
        description: "",
        owner: "",
        email: "",
        success_email_list: "",
        failure_email_list: "",
      },
      schedule: {
        frequency: "",
      },
    },
  ]);

  const updateIngestionData = (updatedData) => {
    setIngestionData((prevData) => {
      const newData = [...prevData]; // Create a copy of the array
      newData[0] = {
        ...newData[0], // Copy the existing object properties
        ...updatedData, // Update the specific field
      };
      return newData;
    });
  };

  return (
    <DataContext.Provider value={{ ingestionData, updateIngestionData }}>
      {children}
    </DataContext.Provider>
  );
};
