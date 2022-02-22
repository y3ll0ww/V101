import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { setSelection } from '../../reducers/selection';

var rows: GridRowsProp = [];

var columns: GridColDef[] = [
  { field: 'line', headerName: '#', width: 10 },
  { field: 'title', headerName: 'Item', width: 300 },
];

const format = num =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,');

const Statement = (props) => {
    rows = [];
    const { statement } = props

    const [selectedRows, setSelectedRows] = React.useState([]);

    const selection = useSelector(state => state.selectionReducer.selection);
    const dispatch = useDispatch();

    if (!statement || statement.length === 0) return <p>Can not find any statements, sorry</p>;
    for (let i = 0; i < statement.rows[0].data.length; i++) {
        let date = statement.rows[0].data[i].date
        columns.push({field: "$" + date.replace('-','$').replace('-','$'), type: "number", headerName: date.split('-')[0], width: 150, headerClassName: 'header'})
    }
    for (let i = 0; i < statement.rows.length; i++) {
        rows.push({id: statement.rows[i].row_id, line:i+1, title: statement.rows[i].data_item })
        for (let j = 0; j < statement.rows[i].data.length; j++) {
            var target_field = "$" + statement.rows[i].data[j].date.replace('-','$').replace('-','$')
            for (let x = 0; x < columns.length; x++) {
                if (columns[x].field == target_field) {
                    var amount = statement.rows[i].data[j].amount
                    if (amount) {
                        rows[rows.length-1][target_field] = format(Number(amount).toFixed(2))
                    } else {
                        rows[rows.length-1][target_field] = '-'
                    }
                }
            }
        }
    }

    return (
            <div style={{ height: '500px', width: '100%' }}>
                <h3>{statement.type}</h3>
                <p>*{statement.multiplier}</p>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                    disableSelectionOnClick
                    onSelectionModelChange={(ids) => {
                        const selectedIDs = new Set(ids);
                        const selectedRows = rows.filter((row) =>
                          selectedIDs.has(row.id),
                        );
                        setSelectedRows(selectedRows);
                        dispatch(setSelection(selectedRows))
                    }}
                />
                <br/>
            </div>
        );
}


export default Statement;

