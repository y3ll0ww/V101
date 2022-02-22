import React, { useState } from 'react';
import axios from 'axios';
import domain from '../../static/global/domain'


const CompanyByTicker = (ticker) => {

    const [company, setCompany] = useState({
        company_id: 0,
        ticker: null,
        name: null,
        industry: null,
    });

    const apiUrl = domain + 'api/companies/by-ticker/' + ticker + '/';
    const getCompany = () => {
        axios.get(apiUrl)
            .then((response) => {
                setCompany({
                    company_id: response.data.company_id,
                    ticker: response.data.ticker,
                    name: response.data.name,
                    industry: response.data.industry,
                })
            })
            .catch((error) => {
                console.log(error);
        })
    };

    if (company.ticker == null) {
        getCompany();
    }

    return (
        company
    )

}

export default CompanyByTicker;