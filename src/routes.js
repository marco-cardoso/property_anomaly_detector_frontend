import React from "react";

import { BrowserRouter, Route } from "react-router-dom";

import {Dashboard} from "./views/dashboard/view";

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Dashboard} />
      <Route path="/anomalies" exact component={Dashboard} />
    </BrowserRouter>
  );
}
