import React from "react";
import { ROOT } from "./router/paths";
import { Routes, Route } from "react-router-dom";
import MailListPage from "./pages/mailList";
import MailDetailPage from "./pages/mailDetail";
import Test from "./test/Test";

function App() {
  return (
    <Routes>
      <Route path="mail">
        <Route path=":id" element={<MailDetailPage />} />
      </Route>
      <Route path={ROOT} element={<MailListPage />} />
      <Route path="test" element={<Test />} />
    </Routes>
  );
}

export default App;
