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

import FinancialStatementsComponent from './TabsDetails/FinancialStatementsComponent';

function PageCompanyDetails() {
    let { ticker } = useParams();

    let company_api = CompanyByTicker(ticker);
    let statements_api = StatementsByKey(company_api.company_id);

    let fsComponent = FinancialStatementsComponent(statements_api);

    if (statements_api.one_type != null) {
        return (
            <Provider store={store}>

            <div className='pagebase'>

            <Grid container spacing={2}>

                <Grid item xs={12} sm={12} md={5}>
                    <h2 style={{marginLeft:'25px',marginBottom:'-25px'}}>{ticker}</h2>
                    <CompanyCardComponent com={company_api} />
                </Grid>

                <Grid item xs={12} sm={12} md={7}>
                    <h2 style={{marginLeft:'-25px',marginBottom:'-25px'}}>Charts</h2>
                    <ChartViewer />
                </Grid>


                <Grid item xs={12}>
                    <h2 style={{marginLeft:'25px',marginBottom:'25px'}}>Financial statements</h2>
                    {fsComponent}
                </Grid>

                <Grid item xs={12} sm={12} md={7}>
                    <h2 style={{marginLeft:'25px',marginBottom:'25px'}}>V101</h2>
                    {fsComponent}
                </Grid>

                <Grid item xs={12} sm={12} md={5}>
                    <h2 style={{marginLeft:'25px',marginBottom:'25px'}}>News</h2>
                    {fsComponent}
                </Grid>

            </Grid>

            </div>

            </Provider>
        )
    }


    return (
        <Provider store={store}>
        <div className='pagebase'>
            {company_api.name}
        </div>
        </Provider>
    );
}


export default PageCompanyDetails;
