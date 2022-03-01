import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

import yfApiKey from '../../../../static/global/yfinkey';
import domain from '../../../../static/global/domain';
import TradingViewWidget from './TV-SymbolOverview'

import { setCompanyData } from '../reducers/company';

import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';

import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CableIcon from '@mui/icons-material/Cable';


const CompanyCardComponent = ({com}) => {
    const red = useSelector(state => state.companyReducer.red);
    const dispatch = useDispatch();
    console.log(com);

    const [company, setCompany] = useState({
        company_id: com.company_id,
        ticker: com.ticker,
        name: com.name,
        industry: com.industry,
        yfdata: null,
        exchange: '--',
        financialCurrency: '--',
        regularMarketOpen: 0,
        regularMarketChange: 0,
        regularMarketChangePercent: 0,
        epsCurrentYear: 0,
        epsTrailingTwelveMonths: 0,
        epsForward: 0,
        forwardPE: 0,
        trailingPE: 0,
        color: ''
    });

    function dispatchData(response){
        const data = {
            currentEPS: response.epsTrailingTwelveMonths,
            forwardEPS: response.epsForward,
            estEPSgr: 1.08,
            estFutPE: response.forwardPE,
            ticker: com.ticker,
            MARR: 0.15,
            MOS: 0.5,
            years: 10
        }
        console.log('data');
        console.log(data);
        dispatch(setCompanyData(data));
    }

    useEffect(() => {
            setCompany({ ...company });
            if (company.yfdata == null) {
                var axi = require("axios").default;
                var options = {
                    method: 'GET',
                    url: 'https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=' + company.ticker,
                    params: {modules: 'defaultKeyStatistics,assetProfile'},
                    headers: {
                        'x-api-key': yfApiKey
                    }
                }
                axi.request(options).then(function (response) {
                    const resp = response.data.quoteResponse.result[0];
                    let color = '#D02C2F';
                    if (resp.regularMarketChange >= 0) {
                        color = '#47A75C';
                    }
                    setCompany({ ...company,
                                yfdata: [resp],
                                exchange: resp.fullExchangeName,
                                financialCurrency: resp.financialCurrency,
                                regularMarketOpen: resp.regularMarketOpen,
                                regularMarketChange: resp.regularMarketChange,
                                regularMarketChangePercent: resp.regularMarketChangePercent,
                                epsCurrentYear: resp.epsCurrentYear,
                                epsTrailingTwelveMonths: resp.epsTrailingTwelveMonths,
                                epsForward: resp.epsForward,
                                forwardPE: resp.forwardPE,
                                trailingPE: resp.trailingPE,
                                color: color
                     })
                     dispatchData(resp);
                }).catch(function (error) {
                    console.error(error);
                });
            }
        }, [setCompany, company.yfdata]);


    return (
        <Paper id='companyCard'
          elevation={4}
          style={{
          padding: 18,
          margin: 20,
          height: '94.5%'
          }}>

            <h1 style={{fontSize:'32px'}}id='cardtitle'>{company.name} - {company.ticker}</h1>

            <Stack direction="row" spacing={1}>
                <Chip icon={getIcon(company.industry)} label={company.industry} />
            </Stack>

            <br/><br/>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <p>Exchange:</p>
                    <p>Market Price*:</p>
                    <p>Change:</p>
                </Grid>
                <Grid item xs={6}>
                    <p style={{fontFamily:'Poppins', textAlign:'right'}}>{company.exchange}
                    <br/>
                    <span style={{fontWeight:800, fontSize:'36px'}}>{company.regularMarketOpen.toFixed(1)}</span>
                    <br/>
                    <span style={{fontWeight:500, fontSize:'20px',color:company.color,lineHeight:'0.0'}}> {company.regularMarketChange.toFixed(2)} ({company.regularMarketChangePercent.toFixed(2)}%)</span>
                    </p>
                    <p style={{fontSize:'12px',textAlign:'right'}}>Prices in <span style={{fontSize:'12px',fontWeight:500}}>{company.financialCurrency}</span></p>
                </Grid>
            </Grid>

            <TradingViewWidget symbol={[com.name, com.ticker]}/>

            <h6>Progress</h6>
            <LinearProgress variant="determinate" value={50}
                style={{height:'20px',borderRadius:'5px', marginTop:'-35px'}}/>
            <p style={{fontFamily:'Poppins', fontWeight:800, textAlign:'right'}}>50%</p>
            <br/>

            <p style={{fontSize:'12px',textAlign:'center'}}>*Prices used on this page can be slightly incorrect, or may differ from each other due to time lags and data used from different sources.</p>
        </Paper>
    )

}


function getIcon(industry) {
    switch(industry) {
        case 'Medical':
            return <MedicalServicesIcon />;
        case 'Computer and Technology':
            return <CableIcon />;
        default:
            return <BusinessCenterIcon />;
    }
}


function getStockPrice(ticker) {
    var axi = require("axios").default;
    var options = {
        method: 'GET',
        url: 'https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=' + ticker,
        params: {modules: 'defaultKeyStatistics,assetProfile'},
        headers: {
            'x-api-key': yfApiKey
        }
    }
    axi.request(options).then(function (response) {
        const resp = response.data.quoteResponse.result[0];
        console.log(resp);
        return (resp);
    }).catch(function (error) {
        console.error(error);
    });


}


var axi = require("axios").default;

var options = {
    method: 'GET',
    url: '',
    headers: {
        'x-api-key': '2v2lUC0p1iwex3UMd40o3ceCwH8R1Oe1pEkwDvtc'
    }
}



export default CompanyCardComponent;