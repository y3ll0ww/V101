import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

const TradingViewWidget = ({symbol}) => {
    const styles: CopyrightStyles = {
        parent: {
            fontSize: "0px",
        },
        link: {
        },
        span: {
            fontSize:"0px"
        },
    };

    return <div style={{height:'508px',marginTop:'10px'}}>
            <AdvancedRealTimeChart
                theme="light"
                symbol={symbol}
                autosize="true"
                copyrightStyles={styles}
                range="12M"
                toolbar_bg="rgba(0,0,0,0)"
                hide_legend="true"
                hide_side_toolbar="true"
                studies={["MACD@tv-basicstudies","StochasticRSI@tv-basicstudies","BB@tv-basicstudies"]}
           />
            <p style={{textAlign:'center', marginTop:'-30px', fontSize:'8px'}}>
                <b>
                <a  style={{fontSize:'11px',textDecoration:'none'}}
                    href='https://google.nl'
                    target="_blank">google.nl
                </a></b> by TradingView
            </p>
           </div>
}

export default TradingViewWidget