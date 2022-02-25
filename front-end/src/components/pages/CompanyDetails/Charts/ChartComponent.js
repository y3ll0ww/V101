import React, { Component } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TimelineIcon from '@mui/icons-material/Timeline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const colorPalette = ['rgb(71,167,92)', 'rgb(84,123,151)', 'rgb(186,220,221)', 'rgb(33,43,64)'];

function mapStateToProps(state) {
    let labels = [];
    let data = [];
    let titles = [];
    let datasets = [];

    try{
        for (let i = 0; i < state.selectionReducer.selection.selection.length; i++) {
            const selection = state.selectionReducer.selection.selection[i];
            const keys = Object.keys(selection);
            const values = Object.values(selection);

            titles.push(selection.title);

            let addLabels = [];
            let addData = [];
            for (let j = 0; j < keys.length; j++) {
                if (keys[j].startsWith("$")) {
                    addLabels.push(keys[j].split("$")[1]);
                    addData.push(parseFloat(values[j].replace(",","")));
                }
            }

            if (addLabels.length > labels.length) {
                labels = addLabels.reverse();
            }
            data.push(addData.reverse());
        }

        let colorIndex = 0;
        for (let title in titles) {
            colorIndex = title;
            while(colorIndex >= colorPalette.length){
                colorIndex -= colorPalette.length;
            }
            console.log(colorIndex);
            let dict = {
                label: titles[title],
                data: data[title],
                tension: 0.2,
                borderWidth: 5,
                borderColor: colorPalette[colorIndex],
                backgroundColor: colorPalette[colorIndex]
            };
            datasets.push(dict);
        }

    } catch (e) {
        console.log(e);
    }

    return {
        chartData:{
            labels: labels,
            datasets: datasets
        }
    }
}


function Chart(props) {
    if (props.chartData.datasets.length < 1) {
        return (
            <div style={{textAlign:'center',marginTop:'150px',marginBottom:'150px'}}>
                <TimelineIcon color="primary" sx={{fontSize:80}}/>
                <p>
                    You don't have any data selected.
                    <br/>
                    To plot a chart with fundamental data, select a row from one of the financial statements in the block below.
                </p>
                <br/>
                <KeyboardArrowDownIcon />
            </div>
        )
    }
    return (
        <div className="chart">
            <Line
                data={props.chartData}
                width={100}
                height={500}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            ticks: {
                                font: {
                                    family: 'Poppins'
                                }
                            }
                        },
                        x: {
                            ticks: {
                                font: {
                                    family: 'Poppins'
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position:'bottom',
                            align: 'start',
                            labels: {
                                font: {
                                    family: 'Assistant'
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    )
}


export default connect(mapStateToProps)(Chart);