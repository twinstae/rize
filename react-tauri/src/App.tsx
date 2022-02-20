import React from "react";
import { ROOT } from "./router/paths";
import { Routes, Route } from "react-router-dom";
import MailListPage from "./pages/mailList/index";
import MailDetailPage from "./pages/mailDetail";
import Test from "./test/Test";

function App() {
  return (
    <Routes>
      <Route path="mail" element={<MailListPage />}>
        <Route path=":id" element={<MailDetailPage />} />
      </Route>

      <Route path={ROOT} element={<Test />} />
    </Routes>
  );
}

export default App;
