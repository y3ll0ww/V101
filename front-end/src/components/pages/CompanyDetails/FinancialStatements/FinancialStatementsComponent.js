import * as React from 'react';
import PropTypes from 'prop-types';

import StatementsByKey from '../../../ApiCalls/StatementsByKey';

import loading from '../../../../static/img/Ripple-1s-194px.svg';

import StatementComponent from './StatementComponent';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


export default function FinancialStatementsComponent(statements) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (statements.one_type != null) {
    return (
      <Paper className='details-paper'
      elevation={4}
      style={{height:'700px',
              marginTop: '-30px',
              marginLeft: '20px',
              marginRight: '20px'}}>
        <Grid
          container
          spacing={2}
          direction='row'
          style={{height: '100px'}}
        >
            <Grid item xs={12} sm={12} md={12} style={{ padding:'0px'}}
                  style={{  display:'flex',
                            flexDirection:'column',
                            overflow:'scroll',
                            overflowX:'hidden',
                            padding:0}}>
                <StatementComponent statements={statements} />
            </Grid>
        </Grid>
      </Paper>
      )
  } else {
    return (
        <div className="loadingWrapper">
            <img
                className="loading"
                src={loading}
                alt="Loading..."
            />
        </div>
    )
  };
}