import React, { createContext, useState } from "react";

// Create the data context
export const DataContext = createContext();

// Create the data provider
export const DataProvider = ({ children }) => {
  const [ingestionData, setIngestionData] = useState([
    {
      source_connection_id: null,
      target_connection_id: null,
      app_id: null,
      source_entity_name: null,
      target_entity_name: "data_fabric.datamode.testcase_master",
      data_source_type: null,
      query: null,
      db_name: null,
      schema_name: null,
      table_name: null,
      bucket_name: null,
      full_file_name: null,
      attributes: [],
      source_extract_criteria: {
        source_entity_type: "incremental",
        is_select_distinct: null,
        incremental_by: "SEQUENCE",
        source_incremental_column: "testcase_desc",
        incremental_start_time: null,
        incremental_end_time: null,
        incremental_start_sequence: 2,
        incremental_end_sequence: 3,
        default_start_date: null,
        default_start_seq: null,
        filter: null,
        order_by: null,
      },
      target_load_details: {
        target_entity_name: "data_fabric.datamode.testcase_master.",
        target_load_type: "INCREMENTAL",
        data_quality_monitor_alert: null,
        data_quality_monitor_abort: null,
        record_counts_change_monitor_alert: null,
        record_counts_change_monitor_abort: null,
        is_mantain_a_copy_in_datalake: null,
        datalake_connection: null,
        datalake_file_format: null,
        datalake_target_template: null,
      },
      additional_metadata: {
        business_tags: null,
        description: null,
        owner: null,
        email: null,
        success_email_list: null,
        failure_email_list: null,
      },
      schedule: {
        job_name: "DI_dag_tdk1",
        job_description: "DI Dag Creation test01",
        start_timestamp: "2023-06-16T05:55:00",
        end_timestamp: "2023-08-30T00:00:00",
        timezone: "GMT",
        schedule_type: "preset",
        schedule_value: "once",
        task_name: "task_one",
        module_name: "di_ingest",
        arguments: null,
        dependency: "2",
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

// {
//   column_name: "testcase_desc",
//   data_type: "character varying",
//   numeric_precision: "nan",
//   numeric_scale: "nan",
//   character_maximum_length: "500.0",
//   is_nullable: "NO",
//   is_source_primary_key: "no",
//   is_business_key: "no",
//   target_column_name: "testcase_desc",
//   target_datatype: "VARCHAR",
//   is_target_primary_key: "no",
//   target_numeric_precision: "nan",
//   target_numeric_scale: "nan",
//   target_character_maximum_length: "500.0",
//   target_is_nullable: null,
//   sample_values: [
//     "values are in between a given set of values",
//     "Check a column to exist in a dataset",
//     "Check a column values are of expected data type",
//     "Check a column values are unique",
//     "Check a column values matcha regex",
//   ],
//   transformation_logic: null,
// },
// {
//   column_name: "dq_dimension",
//   data_type: "character varying",
//   numeric_precision: "nan",
//   numeric_scale: "nan",
//   character_maximum_length: "255.0",
//   is_nullable: "NO",
//   is_source_primary_key: "no",
//   is_business_key: "no",
//   target_column_name: "dq_dimension",
//   target_datatype: "VARCHAR",
//   is_target_primary_key: "no",
//   target_numeric_precision: "nan",
//   target_numeric_scale: "nan",
//   target_character_maximum_length: "255.0",
//   target_is_nullable: null,
//   sample_values: [
//     "Accuracy",
//     "Completeness",
//     "Consistency",
//     "Integrity",
//     "Timelessness",
//   ],
//   transformation_logic: null,
// },
