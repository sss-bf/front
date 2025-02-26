import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TestComponent from "./components/TestComponent"; // POST 요청을 실행할 컴포넌트
import App from "./App";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<TestComponent />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
