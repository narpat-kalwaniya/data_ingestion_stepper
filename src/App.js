import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import RouteGuard from "./routes/RouteGuard";
import firebase from "./services/firebase";
import AddPipeline from "./pages/AddPipeline";
import Layout from "./components/layout/Layout";
import Scheduling from "./components/Scheduling";
import LoginPage from "./components/auth/login/Login";
import Home from "./components/Home";
import ListingPage from "./components/listing/SearchNavbar";
import NotFound from "./components/notFound/NotFound";
import { formContext } from "./components/formContext";
import { stepContext } from "./components/stepContext";
import AddPipelineMig from "./pages/AddPipelineMig";
import SchedulingPipeline from "./components/SchedulingPipeline";

function App() {
  const [user, setUser] = useState();
  const [loading, setloading] = useState(true);
  const [isTableLoad, setIsTableLoad] = useState(true);
  const [step, setStep] = useState(1);
  const [isReview, setIsReview] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isView, setIsView] = useState(false);
  const [formData, setFormData] = useState({
    CreateDataConnection: {
      dataSource: null,
      dataTarget: null,
      application: null,
    },
    sourceEntity: {
      data_source_type: null,
      query: null,
      db_name: null,
      schema_name: null,
      table_name: null,
      bucket_name: null,
      full_file_name: null,
      source_entity_name: null,
      connection_id: null,
    },
    tableData: [],
    DefineSourceExtractCriteria: {
      source_entity_type: null,
      is_select_distinct: false,
      incremental_by: null,
      source_incremental_column: [],
      incremental_start_time: null,
      incremental_end_time: null,
      incremental_start_sequence: null,
      incremental_end_sequence: null,
      default_start_date: null,
      default_start_seq: null,
      filter: null,
      order_by: [],
    },
    targetLoadDetails: {
      target_entity_name: null,
      target_load_type: null,
      DataQualityMoniter: {
        alert: null,
        abort: null,
      },
      RecordCountChangesMoniter: {
        alert: null,
        abort: null,
      },
      is_mantain_a_copy_in_datalake: false,
      datalake_connection: null,
      datalake_file_format: null,
      datalake_target_template: null,
    },
    GatherMetaData: {
      business_tags: null,
      description: null,
      owner: null,
      email: null,
      success_email_list: null,
      failure_email_list: null,
    },
    PipelineDetails: {
      run_now: false,
      pipeline_name: null,
    },
    process_flag: "insert",
  });
  const [schedulingFormData, setSchedulingFormData] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setloading(false);
      setUser(user);
    });
  }, []);

  if (loading) {
    return "loading...";
  }

  return (
    <BrowserRouter>
      <stepContext.Provider value={{ step, setStep }}>
        <formContext.Provider value={{ formData, setFormData }}>
          <Routes>
            <Route path="/">
              <Route index path="/login" element={<LoginPage />} />
              <Route
                element={
                  <RouteGuard user={user}>
                    <Layout user={user} />
                  </RouteGuard>
                }
              >
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route
                  path="/pipelines"
                  element={
                    <ListingPage
                      isReview={isReview}
                      setIsReview={setIsReview}
                      isUpdate={isUpdate}
                      setIsUpdate={setIsUpdate}
                      isView={isView}
                      setIsView={setIsView}
                    />
                  }
                />
                <Route
                  path="/pipelines/add"
                  element={
                    <AddPipeline
                      isReview={isReview}
                      setIsReview={setIsReview}
                      setIsTableLoad={setIsTableLoad}
                      isTableLoad={isTableLoad}
                      isUpdate={isUpdate}
                      setIsUpdate={setIsUpdate}
                      isView={isView}
                      setIsView={setIsView}
                    />
                  }
                />
                <Route
                  path="/pipelines/migration"
                  element={<AddPipelineMig />}
                />
                <Route
                  path="/scheduling/configuration"
                  element={<Scheduling />}
                />
                <Route
                  path="/scheduling/pipeline"
                  element={<SchedulingPipeline />}
                />
                <Route
                  path="/scheduling/edit/job-name"
                  element={<SchedulingPipeline />}
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </formContext.Provider>
      </stepContext.Provider>
    </BrowserRouter>
  );
}

export default App;
