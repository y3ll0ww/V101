import React, { useState } from 'react';
import axios from 'axios';
import domain from '../../static/global/domain'


const StatementByKey = (key) => {

    const [statements, setStatements] = useState({ });

    const apiUrl = domain + 'api/statements/' + key + '/';
    const getStatements = () => {
        axios.get(apiUrl).then((response) => {
            if (response.data.length > 0) {
                setStatements({
                    one_type: response.data[0].type,
                    one_id: response.data[0].statement_id,
                    two_type: response.data[1].type,
                    two_id: response.data[1].statement_id,
                    three_type: response.data[2].type,
                    three_id: response.data[2].statement_id,
                })
            }
        });
    };

    if (statements.one_type == null) {
        getStatements();
    }

    return (
        statements
    )
}

export default StatementByKey;