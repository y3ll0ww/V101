import React, { useEffect, useState } from 'react';

import { useParams } from "react-router-dom";
import StatementComponent from './TabsDetails/TabFinancials/StatementComponent';
import CompanyCardComponent from './CompanyCard/CompanyCardComponent';

import CompanyByTicker from '../../ApiCalls/CompanyByTicker';
import StatementsByKey from '../../ApiCalls/StatementsByKey';

import Grid from '@mui/material/Grid';

import { Provider } from 'react-redux';
import { store } from './store'

import ChartViewer from './Chart/ChartViewer';

import StatementByKey from './TabsDetails/DetailsTab';

function PageCompanyDetails() {
    let { ticker } = useParams();

    let company = CompanyByTicker(ticker);
    let statements = StatementsByKey(company.company_id);

    let tabs = StatementByKey(statements);

    if (statements.one_type != null) {
        return (
            <Provider store={store}>

            <div className='pagebase'>

            <Grid container spacing={2}>

                <Grid item xs={12} sm={12} md={5}>
                    <h2 style={{marginLeft:'25px',marginBottom:'-25px'}}>{ticker}</h2>
                    <CompanyCardComponent com={company} />
                </Grid>

                <Grid item xs={12} sm={12} md={7}>
                    <h2 style={{marginLeft:'-25px',marginBottom:'-25px'}}>Charts</h2>
                    <ChartViewer />
                </Grid>


                <Grid item xs={12}>
                    <h2 style={{marginLeft:'25px',marginBottom:'25px'}}>Financial statements</h2>
                    {tabs}
                </Grid>

                <Grid item xs={12} sm={12} md={7}>
                    <h2 style={{marginLeft:'25px',marginBottom:'25px'}}>V101</h2>
                    {tabs}
                </Grid>

                <Grid item xs={12} sm={12} md={5}>
                    <h2 style={{marginLeft:'25px',marginBottom:'25px'}}>News</h2>
                    {tabs}
                </Grid>

            </Grid>

            </div>

            </Provider>
        )
    }
    console.log('statements:')
    console.log(statements)
    return (
        <Provider store={store}>
        <div className='pagebase'>
            {company.name}
        </div>
        </Provider>
    );
}


export default PageCompanyDetails;
