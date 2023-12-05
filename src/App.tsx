import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Quiz from "./pages/quiz/Quiz";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
