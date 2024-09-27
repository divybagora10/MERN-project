import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useDispatch , useSelector } from 'react-redux';
import { getAllProduct } from '../redux/slices/productSlice';
import { MdEdit } from "react-icons/md";
  

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'productURL', headerName: 'Product Image', width: 230 , renderCell : (params)=>{
    return (
      <div><img src={`http://localhost:3000/${params.row.productURL}`} alt="" className='w-10 rounded-full' /></div>  
    )
  } },
  { field: 'name', headerName: 'product Name', width: 130 },
  { field: 'category', headerName: 'category', width: 130 },
  // fields should have name exact to keys of data
  {
    field: 'description',
    headerName: 'description',
    width: 200,
    // type: 'number',
  },
  {field : 'price', headerName : 'Price'},
  {field : 'action' , headerName : 'edit user' , renderCell : (params)=>{
    return(
      <div> <MdEdit /></div>
    )
  }}
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  // },
];

// const rows = [
//   { id: 1, lastName: 'targarean', firstName: 'Aegon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const dispatch = useDispatch();

  const {products} = useSelector((state)=> state.product);
  console.log("products",products)

  React.useEffect (()=>{
    dispatch(getAllProduct());
  },[]);
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={products}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection  
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
