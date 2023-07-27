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
  const [formData, setFormData] = useState({
    CreateDataConnection: {
      dataSource: "",
      dataTarget: "",
      application: "",
    },
    sourceEntity: {
      data_source_type: "",
      query: null,
      db_name: "",
      schema_name: "",
      table_name: "",
      bucket_name: null,
      full_file_name: null,
      source_entity_name: "",
      connection_id: null,
    },
    tableData: [],
    DefineSourceExtractCriteria: {
      source_entity_type: "",
      is_select_distinct: false,
      incremental_by: "",
      source_incremental_column: [],
      incremental_start_time: "",
      incremental_end_time: "",
      incremental_start_sequence: "",
      incremental_end_sequence: "",
      default_start_date: "",
      default_start_seq: "",
      filter: "",
      order_by: [],
    },
    targetLoadDetails: {
      target_entity_name: "",
      target_load_type: "",
      DataQualityMoniter: {
        alert: "",
        abort: "",
      },
      RecordCountChangesMoniter: {
        alert: "",
        abort: "",
      },
      is_mantain_a_copy_in_datalake: false,
      datalake_connection: "",
      datalake_file_format: "",
      datalake_target_template: "",
    },
    GatherMetaData: {
      business_tags: "",
      description: "",
      owner: "",
      email: "",
      success_email_list: "",
      failure_email_list: "",
    },
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
