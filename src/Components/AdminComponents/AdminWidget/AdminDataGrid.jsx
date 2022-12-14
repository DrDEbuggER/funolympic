import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import LoopIcon from '@mui/icons-material/Loop';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';
import "./AdminWidget.css"
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { firestore } from '../../../firebase';
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
  
export default function AdminDataGrid({usersData}) {
    const HandleBan = async(uuid) => {
       const queryRef = query(collection(firestore, "users"), where("uuid", "==", uuid))
       await getDocs(queryRef).then(async(snap)=>{
        if(snap.docs.length > 0) {
          const updateRef = doc(firestore, "users", snap.docs[0].id)
          if(snap.docs[0].data().banned && snap.docs[0].data().banned === true) {
            await updateDoc(updateRef, {
              banned: false
            })
          } else {
            await updateDoc(updateRef, {
              banned: true
            })
          }
          
        }
          
       })
    }

    const columns= [
    { field: 'id', 
        headerName: 'ID', 
        flex: 1,
        width: 90,
        align: "center",
        headerAlign: 'center',
        renderCell: (index) => <p> {index.api.getRowIndex(index.row.uuid) + 1 } </p>
    },
    {
      field: 'userName',
      headerName: 'Username',
      width: 150,
      flex: 1,
      editable: true,
      align: "center",
      headerAlign: 'center'
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
      field: 'phone',
      headerName: 'Phone',
      width: 150,
      flex: 1,
      editable: true,
      align: "center",
      headerAlign: 'center'
    },
    {
      field: 'userType',
      headerName: 'User Type',
      type: 'string',
      flex: 1,
      width: 110,
      editable: true,
      align: "center",
      headerAlign: 'center'
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
                params.row.status === "Verified" ? 
                  params.row.banned && params.row.banned === true ?
                    <div className="cell_circle" style={{border: "1px solid #F0541E"}}>
                      <ReportProblemIcon htmlColor='#F0541E'/>
                      <p style={{color:'#F0541E'}}>{"Banned"}</p>
                    </div>
                  :
                    <div className="cell_circle" style={{border: "1px solid #04f4bb"}}>
                        <DoneIcon htmlColor='#04f4bb'/>
                        <p style={{color:'#04f4bb'}}>{params.row.status}</p>
                    </div>:
                params.row.status === "UnVerified" ? 
                  params.row.banned && params.row.banned === true ?
                    <div className="cell_circle" style={{border: "1px solid #F0541E"}}>
                        <ReportProblemIcon htmlColor='#F0541E'/>
                        <p style={{color:'#F0541E'}}>{"Banned"}</p>
                    </div>
                    :
                    <div className="cell_circle" style={{border: "1px solid #f5ac00"}}>
                        <LoopIcon htmlColor='#f5ac00'/>
                        <p style={{color:'#f5ac00'}}>{params.row.status}</p>
                    </div> : "N/A"
            )
        }
    }, {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      description: "Users status: Active, Banned or UnVerified",
      sortable: true,
      align: "center",
      headerAlign: 'center',
      width: 120,
      renderCell: (params) => {
          return(
            <div className={`field__button ${params.row.banned && params.row.banned === true ? "banned" : "unbanned"}`} onClick={()=>HandleBan(params.row.uuid)}>
              <BlockIcon />
              <p>{params.row.banned && params.row.banned === true ? "UnBan": "Ban"}</p>
            </div>
          )
      }
    }
    ];
    
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <StyledDataGrid
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row)=> row.uuid}
        rows={usersData}
        columns={columns}
        components={{Toolbar: GridToolbar}}
      />
    </Box>
  );
}


