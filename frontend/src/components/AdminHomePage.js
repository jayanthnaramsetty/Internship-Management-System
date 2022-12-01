import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
import Button from '@material-ui/core/Button';
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress } from "@mui/material";

const url = "http://localhost:8080/internManagement/getAllApplicationList";
const baseUrl = "http://localhost:8080/internManagement/getDataByApplication/";



class AdminHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName:  localStorage.getItem("userName"),
      dataList:[],
      apiLoading:true,
    };
  }


  componentWillMount() {
    
    axios.get(url).then((res) => {
      this.setState({
        dataList:res.data,
        apiLoading:false
      })
     });
  }

   handleOpenApp=(value)=>{
    const {
      history: { push },
    } = this.props;
    
    let finalurl=baseUrl+ value
    axios.get(finalurl).then((res) => {
     push({
        pathname: '/facultyViewForm',
        applicationData: res.data,
      });
  })
      }

  handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    const {
      history: { push },
    } = this.props;
    push("/");
  };


  handleDashboard = () =>{
    const {userId} = this.state;
    const {
      history: { push },
    } = this.props;
    push('/adminDashboard');

  }



  render() {
    const {userId,userRole,projectDatas,dataList,apiLoading} = this.state;
    
const columns= [
  { field: 'applicationNumber',type: 'string', width: 300,  renderHeader: () => (
    <strong>
     <span>Application Number</span>
    </strong>
  ),
  renderCell: (params) => (
   
    <strong>
      APPNW0000{params.value}
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginLeft: 16 }}
        onClick={()=>this.handleOpenApp(params.value)}
      >
        Open Application
      </Button>
    </strong>
  )
 
},


  { field: 'status', type: 'string', 
  renderHeader: () => (
    <strong>
     <span>Status</span>
    </strong>
  )
},
{ field: 'instructorName', type: 'string',width: 200, renderHeader: () => (
  <strong>
   <span>Instructor Name</span>
  </strong>
) },
// { field: 'instructorEmailId', type: 'string', renderHeader: () => (
//   <strong>
//    <span>Instructor EmailId</span>
//   </strong>
// ) },
{ field: 'studentId', type: 'string', renderHeader: () => (
  <strong>
   <span>Student ID</span>
  </strong>
) },

  { field: 'firstName', type: 'string', width: 200,renderHeader: () => (
    <strong>
     <span>First Name</span>
    </strong>
  ) },
  { field: 'lastName', type: 'string', width: 200,renderHeader: () => (
    <strong>
     <span>Last Name</span>
    </strong>
  ) },
  { field: 'department', type: 'string', renderHeader: () => (
    <strong>
     <span>Department</span>
    </strong>
  ) },
  { field: 'employerName', type: 'string',width: 200, renderHeader: () => (
    <strong>
     <span>Employer Name</span>
    </strong>
  ) },
  { field: 'startDate', type: 'string',width: 150,renderHeader: () => (
    <strong>
     <span>Start Date</span>
    </strong>
  ) },
  { field: 'endDate', type: 'string',width: 150, renderHeader: () => (
    <strong>
     <span>End Date</span>
    </strong>
  ) },
  { field: 'employerState', type: 'string', width: 200,renderHeader: () => (
    <strong>
     <span>Employer State</span>
    </strong>
  ) },
  
  
];
    
    return (

      <div className=" flex flex-col" style={{backgroundColor:'aliceBlueBlue',minHeight:'100vh'}}>
        {/* <div style={{backgroundColor:'white',display:'flex',padding:'12px',borderBottom:'1px solid white',fontSize:'24px'}}> */}
          <div style={{backgroundColor:'white',display:'flex',padding:'12px',color:'#006747'}}>
              <div style={{display:'flex',flexGrow:'1'}}>
              <img alt="Northwest Missouri State University" height="79px" src="https://www.nwmissouri.edu/layout/v2019/images/svg/logo-n.svg" width="74px"></img>
              <div style={{fontSize:'24px',fontWeight:'600',width:'100%',display:'flex',padding:'20px',alignItems:'center',color:'#006747'}}>NORTHWEST MISSOURI STATE UNIVERSITY</div>
            </div>
            <div style={{display:'flex',alignItems:'center'}}>
            {/* <div style={{display:'flex',alignItems:'center',marginRight:50,fontSize:18}}className='underline cursor-pointer' onClick={this.handleHome}>Home</div> */}
              {/* <div style={{display:'flex',alignItems:'center',marginRight:50,fontSize:18}}className='underline cursor-pointer' onClick={this.handleViewApplication}>View Application</div> */}
              <div style={{display:'flex',alignItems:'center',marginRight:150,fontSize:18}}className='underline cursor-pointer' onClick={this.handleDashboard}>Dashboard</div>
              <button style={{ background: '#006747',color: 'white',height: 35,width: 80,alignItems: 'center',borderRadius: 8,
               marginRight: 20}} onClick={this.handleLogout}>Logout</button>
            </div>
          </div>
      

          {apiLoading?<div style={{display:'flex',marginTop:200,justifyContent:'center'}}>
      <CircularProgress />
      </div>:
       <div style={{display:'contents'}}>
      <DataGrid style={{backgroundColor:'white'}}
        rows={this.state.dataList}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
        autoPageSize={true}
      />
      </div>}
       
         
          
        </div>
          );


  }
}

export default withRouter(AdminHomePage);
