import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StatementsByKey from '../../../ApiCalls/StatementsByKey';
import StatementComponent from './TabFinancials/StatementComponent';
import FormulaComponent from './TabFormula/FormulaComponent';
import TechnicalChartComponent from './TabTechnical/TechnicalChartComponent';
import loading from '../../../../static/img/Ripple-1s-194px.svg';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

//export default function VerticalTabs() {
export default function StatementByKey(statements) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (statements.one_type != null) {
    return (
      <Paper className='details-paper'
      elevation={4}
      style={{height:'585px',
              marginTop: '-30px',
              marginLeft: '20px',
              marginRight: '20px'}}>
        <Grid
          container
          spacing={2}
          direction='row'
          style={{height: '100px'}}
        >
            <Grid item xs={12} sm={12} md={12}
               sx={{ borderRight: 1, borderColor: 'divider', padding: '0px !important', paddingLeft: '16px !important' }}>
                <Tabs

                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  //aria-label="Vertical tabs example"
                >
                  <Tab label="Financials" {...a11yProps(0)} />
                  <Tab label="V101 Formula" {...a11yProps(1)} />
                  <Tab label="Technical Chart" {...a11yProps(2)} />
                  <Tab label="News" {...a11yProps(3)} />
                  <Tab label="The Big 4" {...a11yProps(4)} />
                </Tabs>
            </Grid>
            <Grid item xs={12} sm={12} md={12} style={{ padding:'0px'}}>
                 <TabPanel value={value} index={0}
                    style={{ display:'flex',
                             flexDirection: 'column',
                             overflow: 'scroll',
                             overflowX: 'hidden',
                             padding: 0}}>
                    <StatementComponent statements={statements} />
                 </TabPanel>
                 <TabPanel value={value} index={1}
                    style={{ display:'flex',
                            flexDirection: 'column',
                            overflow: 'scroll',
                            overflowX: 'hidden',
                            padding: 0}}>
                   <FormulaComponent />
                 </TabPanel>
                 <TabPanel value={value} index={2}>
                   <TechnicalChartComponent />
                 </TabPanel>
                 <TabPanel value={value} index={3}>
                   Item Four
                 </TabPanel>
                 <TabPanel value={value} index={4}>
                   Item Five
                 </TabPanel>
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