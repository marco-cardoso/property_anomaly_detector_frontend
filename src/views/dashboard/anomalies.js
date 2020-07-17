import React from 'react';
import Dashboard from './root.js'

import AnomaliesPanel from '../../components/panels/anomalies.js' 

export default function OverviewDashboard(){
    return (
        <Dashboard title="Property anomalies" mainPanel={() => <AnomaliesPanel/>}/>
    )
}