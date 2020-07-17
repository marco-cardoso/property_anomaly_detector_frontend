import React from "react";

import { BrowserRouter, Route } from "react-router-dom";

import AnomaliesDashboard from "./views/dashboard/anomalies";
import OverviewDashboard from "./views/dashboard/overview";


export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={OverviewDashboard} />
      <Route path="/anomalies" exact component={AnomaliesDashboard} />
    </BrowserRouter>
  );
}
