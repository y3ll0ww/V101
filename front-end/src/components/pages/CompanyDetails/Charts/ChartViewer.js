import React, { useState } from 'react';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Chart from './ChartComponent';
import ChartSwitch from './ChartSwitch';

function ChartViewer() {
    const [chart, setChart] = useState({ type: 'Fundamental' });

    return (
        <Paper className="chart-paper"
              elevation={4}
              style={{
                      marginTop: '20px',
                      marginRight: '20px',
                      padding: '20px',
                      height: '94.5%'}}>

            <div className='button-group'
                 style={{marginTop:'-20px',marginLeft:'-20px'}}>
                <ButtonGroup variant="text" aria-label="outlined button group">
                    <Button onClick={() => setChart({ type:'Fundamental' })}>Fundamental</Button>
                    <Button onClick={() => setChart({ type:'Technical' })}>Technical</Button>
                </ButtonGroup>
            </div>

            <h1 style={{fontSize:'24px'}}id='cardtitle'>{chart.type} Chart</h1>

            <ChartSwitch type={chart.type} />


        </Paper>
    )
}

export default ChartViewer;