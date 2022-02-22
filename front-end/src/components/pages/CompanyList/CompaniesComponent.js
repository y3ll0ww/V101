import React, { useEffect, useState } from 'react';
import Companies from './ListOfCompanies';
import CompaniesLoadingComponent from './CompaniesLoadingComponent';
import domain from '../../../static/global/domain'

import Container from '@mui/material/Container';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import StatementsByKey from '../../ApiCalls/StatementsByKey';


function CompaniesComponent() {
    const CompaniesLoading = CompaniesLoadingComponent(Companies);

    const [appState, setAppState] = useState({
        loading: false,
        companies: null,
    });

    useEffect(() => {
        if (appState.companies == null) {
            setAppState({ ...appState, loading: true });
            const apiUrl = domain + 'api/companies/';
            fetch(apiUrl)
                .then((data) => data.json())
                .then((companies) => {
                    setAppState({ ...appState, loading: false, companies: companies });
                });
        }
    }, [setAppState, appState.loading]);

    return (
        <Container sx={{ height: 500 }}>
            <h1>Companies List</h1>
            <p>On here you'll find a list with publicly traded American companies.</p>
            <p>All companies shown below have at least a 10 year history of being publicly traded
            and are still public today*. </p>
            <br/><br/>
            <CompaniesLoading isLoading={appState.loading} companies={appState.companies} />
            <sub style={{ fontStyle: 'oblique'}}>*Read: Last annual reports are of the most recent year.</sub>
        </Container>
    );
}


export default CompaniesComponent;
