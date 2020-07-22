import React, {useState} from "react";

import { BrowserRouter, Route } from "react-router-dom";

import AnomaliesDashboard from "./views/dashboard/anomalies";
import OverviewDashboard from "./views/dashboard/overview";

import {PageSelectorContext} from './contexts/PageSelector'


export default function Routes() {

  const pages = [
    {
      "path" : "/",
      "title" : "Overview",
      "component" : OverviewDashboard
    },
    {
      "path" : "/anomalies",
      "title" : "Anomalies",
      "component" : AnomaliesDashboard
    }
  ]

  

  return (
    <PageSelectorContext.Provider value={{pages}}>
        
            <BrowserRouter>
                {pages.map((page) => (
                  <Route path={page.path} exact component={page.component}/>
                ))}
              </BrowserRouter>

    </PageSelectorContext.Provider>

  );
}
