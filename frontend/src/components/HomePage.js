import React from "react";
import { withRouter } from "react-router";
import axios from "axios";


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId:  localStorage.getItem("userId"),
      userRole: localStorage.getItem("userRole"),
      projectDatas : []
    };
  }


  handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    const {
      history: { push },
    } = this.props;
    push("/");
  };


  handleNewApplication = () =>{
    const {userId} = this.state;
    const {
      history: { push },
    } = this.props;
    push('/applicationForm');

  }

  handleViewApplication = () =>{
    const {userId} = this.state;
    const {
      history: { push },
    } = this.props;
    push('/viewApplication');

  }

  handleHome = () =>{
    const {userId} = this.state;
    const {
      history: { push },
    } = this.props;
    push('/home');

  }

  handleLogout= () =>{
    const {userId} = this.state;
    const {
      history: { push },
    } = this.props;
    push('/');

  }

  

  render() {
    const {userId,userRole,projectDatas} = this.state;
    return (

<div className=" flex flex-col" style={{backgroundColor:'aliceBlueBlue',minHeight:'100vh'}}>
  {/* <div style={{backgroundColor:'white',display:'flex',padding:'12px',borderBottom:'1px solid white',fontSize:'24px'}}> */}
    <div style={{backgroundColor:'white',display:'flex',padding:'12px',color:'#006747'}}>
        <div style={{display:'flex',flexGrow:'1'}}>
        <img alt="Northwest Missouri State University" height="79px" src="https://www.nwmissouri.edu/layout/v2019/images/svg/logo-n.svg" width="74px"></img>
        <div style={{fontSize:'24px',fontWeight:'600',width:'100%',display:'flex',padding:'20px',alignItems:'center',color:'#006747'}}>NORTHWEST MISSOURI STATE UNIVERSITY</div>
      </div>
      <div style={{display:'flex',alignItems:'center'}}>
      <div style={{display:'flex',alignItems:'center',marginRight:50,fontSize:18}}className='underline cursor-pointer' onClick={this.handleHome}>Home</div>
        <div style={{display:'flex',alignItems:'center',marginRight:50,fontSize:18}}className='underline cursor-pointer' onClick={this.handleViewApplication}>View Application</div>
        <div style={{display:'flex',alignItems:'center',marginRight:150,fontSize:18}}className='underline cursor-pointer' onClick={this.handleNewApplication}>Application Form</div>
        <button style={{ background: '#006747',color: 'white',height: 35,width: 80,alignItems: 'center',borderRadius: 8,
         marginRight: 20}} onClick={this.handleLogout}>Logout</button>
      </div>
    </div>
 
  
  {/* </div> */}
  
     
      {/* <LeftNavigation isFirstTime={true} handleNewRequest={this.handleNewRequest} handleLogout={this.handleLogout}/> */}
      <div className="flex flex-col relative w-full" >
        <img alt="We’re here for you. <b>Day One.</b>" src="https://www.nwmissouri.edu/images/homepage/features/2022/Supportive-Environment-desktop.jpg"/>
      </div>
  </div>
    );


  }
}

export default withRouter(HomePage);
