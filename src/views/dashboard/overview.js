import React from 'react';
import Dashboard from './root.js'

import OverviewPanel from '../../components/panels/overview.js' 

export default function OverviewDashboard(){
    return (
        <Dashboard title="Properties overview" mainPanel={() => <OverviewPanel/>}/>
    )
}