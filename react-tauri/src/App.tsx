import React from "react";
import MailListPage from "./pages/mailList/index";
import { ROOT } from "./router/paths";
import { MemoryRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path={ROOT} element={<MailListPage />} />
      </Routes>
    </MemoryRouter>
  );
}

export default App;
