import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
import Button from '@material-ui/core/Button';
import { DataGrid } from '@mui/x-data-grid';
import CanvasJSReact from './canvasjs.react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Skeleton } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const url = "http://localhost:8080/internManagement/getAllApplicationList";
const baseUrl = "http://localhost:8080/internManagement/getInternData";



class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName:  localStorage.getItem("userName"),
      insList:[],
      pendingCount:'',
      approvedCount:'',
      rejectedCount:'',
      total:'',
      isApiLoading:true
    };
  }


  componentWillMount() {
    
    axios.get(baseUrl).then((res) => {
      this.setState({
        insList:res.data.instructorList,
        pendingCount:res.data.pending,
      approvedCount:res.data.approved,
      rejectedCount:res.data.rejected,
      total:res.data.total,
      isApiLoading:false
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
    push('/applicationForm');

  }


  handleHome = () =>{
    const {userId} = this.state;
    const {
      history: { push },
    } = this.props;
    push('/adminHome');

  }

  handleLogout= () =>{
    const {userId} = this.state;
    const {
      history: { push },
    } = this.props;
    push('/');

  }


  render() {
    const {userId,userRole,projectDatas,insList,pendingCount,approvedCount,rejectedCount,total,isApiLoading} = this.state;
    const pendingCountPer = pendingCount/total*100;
    const approvedCountPer = approvedCount/total*100;
    const rejectedCountPer = rejectedCount/total*100;
    const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "Interns Details"
			},
      width:700,
      
			data: [{
				type: "pie",
				indexLabel: "{label}: {y}%",		
				startAngle: -90,
				dataPoints: [
					{ y: pendingCountPer, label: "Application Pending" },
					{ y: approvedCountPer, label: "Application Approved" },
					{ y: rejectedCountPer, label: "Application Rejected" },
				]
			}]
		}

    const rows = [
      { name: 'Total number of interns', count: total },
      { name: 'Total number of interns Pending', count: pendingCount },
      { name: 'Total number of interns Approved', count: approvedCount },
      { name: 'Total number of interns Rejected', count: rejectedCount }
    ];

    const instructoroptions = {
			animationEnabled: true,
			theme: "dark2", // "light1", "light2", "dark1", "dark2",
      // width:700,
			title: {
				text: "Instructor Details"
			},
			axisY: {
				title: "Number of Interns",
				// labelFormatter: this.addSymbols,
			// 	scaleBreaks: {
			// 	autoCalculate: true
			// }
			},
			axisX: {
				title: "Instructor Name",
				labelAngle: 0
			},
			data: [{
				type: "column",
				dataPoints: insList
			}]
		}

    
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
              <div style={{display:'flex',alignItems:'center',marginRight:150,fontSize:18}}className='underline cursor-pointer' onClick={this.handleHome}>Home</div>
              <button style={{ background: '#006747',color: 'white',height: 35,width: 80,alignItems: 'center',borderRadius: 8,
               marginRight: 20}} onClick={this.handleLogout}>Logout</button>
            </div>
          </div>

      {isApiLoading?<div style={{display:'flex',marginTop:200,justifyContent:'center'}}>
      <CircularProgress />
      </div>:
      <div>

      <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',marginTop:24}}>
          <div style={{width:700}}> <CanvasJSChart options = {options} 
          onRef={ref => this.chart = ref}
        /></div>
          <div >
          <TableContainer component={Paper} style={{minWidth:400}}>
          <Table  aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Intern Application</TableCell>
                <TableCell align="right">Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
          </div>
       </div>
       <div style={{marginTop:40}}>
       <CanvasJSChart options = {instructoroptions} 
				onRef={ref => this.chart = ref}
			/>
       </div>
      </div>}
      
     
          
        </div>
          );


  }
}

export default withRouter(AdminDashboard);
