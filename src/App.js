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

function App() {
  const [user, setUser] = useState();
  const [loading, setloading] = useState(true);

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
            <Route path="/pipelines" element={<ListingPage />} />
            <Route path="/pipelines/add" element={<AddPipeline />} />
            <Route path="/scheduling/configuration" element={<Scheduling />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
