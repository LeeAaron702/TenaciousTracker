import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import "bootstrap-icons/font/bootstrap-icons.css";

import Nav from "./Nav";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import Footer from "./Footer.jsx";


function App() {

  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  return (
    <BrowserRouter basename={basename}>
      <AuthProvider
        tokenUrl={`${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`}
      >
        <Nav />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
