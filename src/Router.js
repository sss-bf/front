import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TestComponent from "./components/TestComponent"; // POST 요청을 실행할 컴포넌트
import App from "./App";
import S3Upload from "./components/S3Upload";
import SSS from "./components/sss";


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<TestComponent />} />
        {/* <Route path="/upload" element={<S3Upload />} /> */}
        {/* <Route path="/sss" element={<SSS />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
