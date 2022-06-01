import React from "react";
import { ROOT } from "./router/paths";
import {  Route } from "react-router-dom";
import MailListPage from "./pages/MailListPage";
import MailDetailPage from "./pages/MailDetailPage";
import Home from "./pages/Home";
import Test from "./test/Test";
import { IonRouterOutlet } from "@ionic/react";

function App() {
  return (
    <IonRouterOutlet>
      <Route path="/" component={Home} />
      <Route path="/mail" component={MailListPage}/>
      <Route path="/mail/id" component={MailDetailPage} />
      <Route path="/test" component={Test} />
    </IonRouterOutlet>
  );
}

export default App;