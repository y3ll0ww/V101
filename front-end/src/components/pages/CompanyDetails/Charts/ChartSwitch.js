import Chart from './ChartComponent';
import TradingViewWidget from './TV-AdvancedRealTimeChart'

import { useParams } from "react-router-dom";

const ChartSwitch = ({type}) => {
    let { ticker } = useParams();

    if (type == 'Fundamental') {
        return (
            <Chart />
        )
    }
    return (
        <TradingViewWidget symbol={ticker}/>
    )
}

export default ChartSwitch;