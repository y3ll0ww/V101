import Chart from './ChartComponent';
import TradingViewWidget from './TV-AdvancedRealTimeChart'

const ChartSwitch = ({type}) => {
    if (type == 'Fundamental') {
        return (
            <Chart />
        )
    }
    return (
        <TradingViewWidget />
    )
}

export default ChartSwitch;