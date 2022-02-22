import React, { useEffect, useState } from 'react';
import Statement from './ListOfStatementData';
import StatementLoadingComponent from './StatementLoadingComponent';
import Container from '@mui/material/Container';
import domain from '../../../../../static/global/domain'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import StatementsByKey from '../../../../ApiCalls/StatementsByKey';


function StatementComponent({statements}) {
    const StatementLoading = StatementLoadingComponent(Statement);

    const [appState, setAppState] = useState({
        id: statements.one_id,
        loading: false,
        statement: null,
        memory: [{ id: statements.one_id, st: null },
                 { id: statements.two_id, st: null },
                 { id: statements.three_id, st: null} ],
    });

    function setId(stid){
        setAppState({ ...appState, id: stid })
    };

    useEffect(() => {
        setAppState({ ...appState, loading: true });
        if (appState.id > 0) {
            for (let i = 0; i < appState.memory.length; i++) {
                if (appState.memory[i].id == appState.id) {
                    if (appState.memory[i].st == null) {
                        const apiUrl = domain + 'api/statements/single/' + appState.id + '/';
                        fetch(apiUrl)
                            .then((data) => data.json())
                            .then((statement) => {
                                let temp = appState.memory
                                temp[i].st = statement
                                setAppState({ ...appState, loading: false, statement: statement, memory: temp });
                            })
                    } else {
                        setAppState({ ...appState, loading: false, statement: appState.memory[i].st });
                    }
                }
            }
        }
    }, [setAppState, appState.id]);

    return (
        <Container sx={{ height: 452}}>
            <h2>Financials</h2>
            <div class='button-group'>
            <ButtonGroup variant="text" aria-label="outlined button group">
              <Button
                onClick={() => setId(statements.one_id)}>
                    {statements.one_type}
              </Button>
              <Button
                onClick={() => setId(statements.two_id)}>
                    {statements.two_type}
              </Button>
              <Button
                onClick={() => setId(statements.three_id)}>
                    {statements.three_type}
              </Button>
            </ButtonGroup>
            </div>
            <StatementLoading isLoading={appState.loading} statement={appState.statement} />
        </Container>
    );
}


export default StatementComponent;
