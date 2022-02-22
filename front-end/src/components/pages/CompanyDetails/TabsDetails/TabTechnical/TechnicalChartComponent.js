import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    const data = state.companyReducer.data.data;

    const ticker = data.symbol;
    const exchange = data.fullExchangeName;

    return {
        tradingViewData:{
            ticker: ticker,
            exchange: exchange,
        }
    }
}


function TechnicalChartComponent(props) {
    const exchange = props.tradingViewData.exchange
    const ticker = props.tradingViewData.ticker

    return(
        <div class="tradingview-widget-container">

        </div>
        );
}







export default connect(mapStateToProps)(TechnicalChartComponent);