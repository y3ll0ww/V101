import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import domain from '../../../static/global/domain';

var rows: GridRowsProp = [];

var columns: GridColDef[] = [
  { field: 'line', headerName: '#', width: 10 },
  { field: 'ticker', headerName: 'Symbol', width: 100,
    renderCell: (params: GridRenderCellParams<string>) => {
        const url = '/companies/' + params.value;
        return ( <strong><a href={url}>{params.value}</a></strong> )
    }},
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'industry', headerName: 'Industry', width: 200 },
  { field: 'rank', headerName: 'Rank', width: 100 },

];

const Companies = (props) => {
    rows = [];
    const { companies } = props;

    if (!companies) return <p>Can not find any companies, sorry</p>;
    for (let i = 0; i < companies.length; i++) {
        rows.push({id: companies[i].company_id,
                   line: i+1,
                   ticker: companies[i].ticker,
                   name: companies[i].name,
                   industry: companies[i].industry,
                   rank: 'TO DO'
                   })
    }

    return (
            <div style={{ height: '100%', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                />
            </div>
        );
}

export default Companies;

