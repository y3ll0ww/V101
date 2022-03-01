import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store'

import { useParams } from "react-router-dom";

import CompanyByTicker from '../../ApiCalls/CompanyByTicker';
import StatementsByKey from '../../ApiCalls/StatementsByKey';

import CompanyCardComponent from './CompanyCard/CompanyCardComponent';
import FinancialStatementsComponent from './FinancialStatements/FinancialStatementsComponent';
import FormulaComponent from './Formula/FormulaComponent';

import Grid from '@mui/material/Grid';

import ChartViewer from './Charts/ChartViewer';


function PageCompanyDetails() {
    let { ticker } = useParams();

    let company = CompanyByTicker(ticker);
    let statements = StatementsByKey(company.company_id);

    let fsComponent = FinancialStatementsComponent(statements);

    if (statements.one_type != null) {
        return (
            <Provider store={store}>

            <div className='pagebase'>

            <Grid container spacing={2} alignItems="stretch">
                    <Grid item xs={12} sm={12} md={5}>
                        <CompanyCardComponent com={company} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={7}>
                        <ChartViewer ticker={ticker}/>
                    </Grid>


                <Grid item xs={12}>
                    {fsComponent}
                </Grid>

                <Grid item xs={12} sm={12} md={7}>
                    'News component'
                </Grid>

                <Grid item xs={12} sm={12} md={5}>
                    <FormulaComponent />
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
