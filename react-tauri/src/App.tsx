import React from "react";
import { ROOT } from "./router/paths";
import { Routes, Route } from "react-router-dom";
import MailListPage from "./pages/mailList/index";
import MailDetailPage from "./pages/mailDetail";

function App() {
  return (
    <Routes>
      <Route path="mail">
        <Route path=":id" element={<MailDetailPage />} />
      </Route>

      <Route path={ROOT} element={<MailListPage />} />
    </Routes>
  );
}

export default App;
