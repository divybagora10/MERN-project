import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useDispatch  } from 'react-redux';


const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({columns , rows}) {
  const dispatch = useDispatch();

  
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection  
        sx={{ border: 0 }}
      />
    </Paper>
  );
}