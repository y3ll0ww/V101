import { SymbolOverview } from "react-ts-tradingview-widgets";

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

    const link = "https://www.tradingview.com/symbols/" + symbol[1]

    return <div>
            <SymbolOverview
                colorTheme="light"
                autosize
                downColor="#800080"
                borderDownColor="#800080"
                wickDownColor="#800080"

                symbols={[[symbol[0], symbol[1] + '|60M']]}
                isTransparent='true'
                chartOnly='true'
                chartType="area"
                copyrightStyles={styles}
                noTimeScale='true'
           />
            <p style={{textAlign:'center', marginTop:'-30px', fontSize:'8px'}}>
                <b>
                <a  style={{fontSize:'11px',textDecoration:'none'}}
                    href={link}
                    target="_blank">{symbol[1]}
                </a></b> by TradingView
            </p>
           </div>
}

export default TradingViewWidget;