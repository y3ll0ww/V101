import React, { Component } from 'react';
import { useDispatch, connect } from 'react-redux';
import { setCompanyData } from '../../reducers/company';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useFormControl } from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';


let MARR = 15;
let MOS = 50;
let years = 10;

function mapStateToProps(state) {
    const data = state.companyReducer.data.data;

    const currentEPS = data.currentEPS;
    const forwardEPS = data.forwardEPS;
    const estEPSGR = data.estEPSgr;
    const estFutPE = data.estFutPE;

    const futEPS = currentEPS * Math.pow(estEPSGR, years);
    const futMarketPrice = futEPS * estFutPE;
    const stickerPrice = futMarketPrice * Math.pow(1 - data.MARR, years);

    const marginOfSafetyPrice = stickerPrice * data.MOS;

    return {
        formulaData:{
            futuremarket: futMarketPrice,
            sticker: stickerPrice,
            marginofsafety: marginOfSafetyPrice,

            currentEPS: currentEPS,
            estEPSGR: estEPSGR,
            estFutPE: estFutPE,
            MARR: (MARR/100),
            years: years,
            MOS: (MOS/100),
            futEPS: futEPS
        }
    }
}

function FormulaComponent(props) {
    const dispatch = useDispatch();

    const changeYears = event => {
        years = event.target.value;
    };
    const changeMARR = event => {
        MARR = event.target.value;
        console.log(MARR)
    };
    const changeMOS = event => {
        MOS = event.target.value;
        console.log(MOS)
    };

    function dispatchVariables(){
        const newData = {
            currentEPS: props.formulaData.currentEPS,
            forwardEPS: props.formulaData.epsForward,
            estEPSgr: props.formulaData.estEPSGR,
            estFutPE: props.formulaData.estFutPE,
            ticker: props.formulaData.ticker,
            MARR: (MARR/100),
            MOS: (MOS/100),
            years: years
        }
        dispatch(setCompanyData(newData));
    }


    return (
        <Box
            component="form"
            sx={{
              height: 502,
              '& .MuiTextField-root': { m: 1, width: '10ch' },
            }}
            noValidate
            autoComplete="off">
            <h3>V101 Formula</h3>
            <p>Provide the variables previously mentioned below:</p>
            <TextField
                label='Years'
                defaultValue={props.formulaData.years}
                variant='outlined'
                size='small'
                required
                type='number'
                InputLabelProps={{ shrink: true }}
                onChange={changeYears}/>
            <TextField
                label='MARR'
                defaultValue={props.formulaData.MARR*100}
                variant='outlined'
                size='small'
                required
                type='number'
                InputProps={{endAdornment:<InputAdornment position="end">%</InputAdornment>}}
                InputLabelProps={{ shrink: true }}
                onChange={changeMARR}/>
            <TextField
                label='MOS'
                defaultValue={props.formulaData.MOS*100}
                variant='outlined'
                size='small'
                required
                type='number'
                InputProps={{endAdornment:<InputAdornment position="end">%</InputAdornment>}}
                InputLabelProps={{ shrink: true }}
                onChange={changeMOS}/>
            <Button
                variant="contained"
                disableElevation
                style={{marginTop:'9px'}}
                onClick={() => {
                    {dispatchVariables()}
                }}>
                Calculate
            </Button>
            <h4>Information</h4>
            <p>The <strong>V101 Formula</strong> gives an insight into the intrinsic value of a given company.</p>
            <p>You're only required to provide three variables:
                <ul>
                    <li>The <strong>number of years</strong> to specify the span of your calculation.</li>
                    <li>The <strong>Minimal Accepted Rate of Return (MARR)</strong>; the lowest amount of annual growth of the company (that you find acceptable).</li>
                    <li>The <strong>Margin of Safety (MOS)</strong>. Always assume all calculations are incorrect. This removes a certain percentage of the calculated intrinsic value.</li>
                </ul>
            </p>
            <p>By default, we calculate the V101 Formula with a <strong>MARR</strong> of 15%, a <strong>MOS</strong> of 50% and a span of 10 <strong>years</strong>.</p>

        <p>Formula = ((({props.formulaData.currentEPS} * {props.formulaData.estEPSGR} ^ {props.formulaData.years}) * {props.formulaData.estFutPE}) * (1 - {props.formulaData.MARR}) ^ {props.formulaData.years} * (1 - {props.formulaData.MOS})</p>
        <br/>
        <p>Future EPS: {props.formulaData.futEPS}</p>
        <p>Future market price: {props.formulaData.futuremarket}</p>
        <p>Sticker price: {props.formulaData.sticker}</p>
        <p>Margin of safety price: {props.formulaData.marginofsafety}</p>
        </Box>
    )
}



export default connect(mapStateToProps)(FormulaComponent);