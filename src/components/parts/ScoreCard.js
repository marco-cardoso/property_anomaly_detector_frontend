import React from 'react';
import Paper from '@material-ui/core/Paper';


export default function ScoreCard({score, title, color, backgroundImage, height, width }){

    const paperStyle = {
        color : color, 
        height :  height, 
        width : width, 
        marginTop : '40px', 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", 
        backgroundImage : backgroundImage
    }

    return (
        <Paper style={paperStyle} elevation={3} >
            <div style={{verticalAlign : 'middle', textAlign : 'center', top : '50%'}}>
                <h3> {title} </h3>
                <h1 style={{fontSize : 100}}>{score}</h1>
            </div>
        </Paper>
    )

}