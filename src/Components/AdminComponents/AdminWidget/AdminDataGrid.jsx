import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import LoopIcon from '@mui/icons-material/Loop';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DoneIcon from '@mui/icons-material/Done';
import "./AdminWidget.css"
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,
    color:
      theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
      borderRight: `1px solid ${
        theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: `1px solid ${
        theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
    },
    '& .MuiDataGrid-cell': {
      color:
        theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0,
    }
}));
  
export default function AdminDataGrid() {
    const columns= [
    { field: 'id', 
        headerName: 'ID', 
        flex: 1,
        width: 90,
        align: "center",
        headerAlign: 'center'
    },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      flex: 1,
      editable: true,
      align: "center",
      headerAlign: 'center'
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      flex: 1,
      editable: true,
      align: "center",
      headerAlign: 'center'
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      flex: 1,
      width: 110,
      editable: true,
      align: "center",
      headerAlign: 'center'
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      flex: 2,
      sortable: false,
      align: "center",
      headerAlign: 'center',
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      description: "Users Email",
      flex: 2,
      sortable: true,
      align: "center",
      headerAlign: 'center',
      width: 160
    },
    {
      field: 'country',
      headerName: 'Country',
      description: "Users country",
      flex: 1,
      sortable: true,
      align: "center",
      headerAlign: 'center',
      width: 160,
      renderCell: (params) => {
        console.log("params", params)
        return (
            params.row.country === "" ? 
                            <p>N/A</p>: 
                            <p>{params.row.country}</p>
        )
      }
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1.5,
        description: "Users status: Active, Banned or UnVerified",
        sortable: true,
        align: "center",
        headerAlign: 'center',
        width: 160,
        renderCell: (params) => {
            return (
                params.row.status == "Active" ? 
                    <div className="cell_circle" style={{border: "1px solid #04f4bb"}}>
                        <DoneIcon htmlColor='#04f4bb'/>
                        <p style={{color:'#04f4bb'}}>{params.row.status}</p>
                    </div>:
                params.row.status === "Banned" ? 
                    <div className="cell_circle" style={{border: "1px solid #F0541E"}}>
                        <ReportProblemIcon htmlColor='#F0541E'/>
                        <p style={{color:'#F0541E'}}>{params.row.status}</p>
                    </div>:
                params.row.status === "UnVerified" ? 
                    <div className="cell_circle" style={{border: "1px solid #f5ac00"}}>
                        <LoopIcon htmlColor='#f5ac00'/>
                        <p style={{color:'#f5ac00'}}>{params.row.status}</p>
                    </div> : "N/A"
            )
        }
    }
    ];
    
    const rows = [
      { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, country:"Nepal", status: 'Active' },
      { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, country:"", status: 'Active' },
      { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, country:"", status:'UnVerified' },
      { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, country:"", status:'Banned' },
      { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, country:"", status:'Active' },
      { id: 6, lastName: 'Melisandre', firstName: null, age: 150, country:"", status:'Active' },
      { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, country:"", status:'Banned' },
      { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, country:"", status:'Active' },
      { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, country:"", status:'UnVerified' },
    ];
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <StyledDataGrid
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{
        //   Pagination: CustomPagination,
        }}
        rows={rows}
        columns={columns}
      />
    </Box>

  );
}


