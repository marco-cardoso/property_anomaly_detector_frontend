import React from 'react';
import Dashboard from './root.js'

import AnomaliesPanel from '../../components/panels/anomalies.js' 

export default function OverviewDashboard({path}){
    return (
        <Dashboard title="Property anomalies" mainPanel={() => <AnomaliesPanel/>}/>
    )
}