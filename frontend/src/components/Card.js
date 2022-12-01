import React from "react";
import { withRouter } from "react-router";
import Button from '@material-ui/core/Button';

import axios from "axios";

const baseUrl = "http://localhost:8080/internManagement/getDataByApplication/";
class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCancelDailog: false
    };
  }

  // handleCardClick = (e) =>{
  //   e.preventDefault();
  //     const {
  //       history: { push } , projectData
  //     } = this.props;
  //     push({
  //       pathname: `/project/${projectData.projectId}`,
  //       projectData: projectData
  //     });
  // }

  handleCancel = (e) =>{
    e.stopPropagation();
    this.setState({openCancelDailog:true})

  }

  handleCancelClose = (e) =>{
    e.stopPropagation();
    this.setState({openCancelDailog:false})
  }

  handleDeleteApp = (appNumber) =>{
  
    let reqUrl = `http://localhost:8080/internManagement/deleteApplication/${appNumber}`;
    axios.delete(reqUrl).then((res) => {
          console.log(res.data);
          this.props.refreshdata();
    })

  }


  handleViewApplicationForm=()=>{
    const {
      history: { push } , data
    } = this.props;
    
    let url=baseUrl+ data.applicationNumber
    axios.get(url,
      {
          headers: {
              "Content-type": "multipart/form-data",
              "parameter":"value",
              "type":"subtype"
          },                    
      }).then((res) => {
      push({
        pathname: '/applicationForm',
        applicationData: res.data,
        isEdit:true
      });
  })
  
 
}




  render() {
    const {data,index} = this.props;
    const {openCancelDailog} = this.state;
    return (

          <div  style={{marginTop:30,minWidth:'800px',backgroundColor:'lavender'}} class="flex flex-col p-6 max-h-72  max-w-xs bg-white rounded-lg border border-gray-200 shadow-md mr-4 mb-4 cursor-pointer transition ease-in-out hover:bg-gray-100 duration-300"  >
          <div style={{display:'flex',alignItems:'center',marginBottom:'8px'}}>
            <div class="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Application Number : </div>
          <h5 class=" text-lg ml-2" onClick={this.handleCardClick}>APPNW0000{data.applicationNumber}</h5>
          </div>
          
          <div style={{display:'flex',alignItems:'center'}}>
                <div style={{fontSize:18,fontWeight:500}}>Application status : </div>
                {/* <div id='status' class="inline-flex items-center py-2 px-3 text-sm font-bold text-centerrounded-lg rounded-lg uppercase"> {projectData.state}</div> */}
                <div style={{marginTop:'4px',marginLeft:'8px',
                color:data.status==="Pending"?'cornflowerblue':data.status==="Approved"?'green':'red'}}class="inline-flex items-center font-bold text-centerrounded-lg rounded-lg uppercase"> {data.status}</div>
                </div>
{data.comments!==null&&data.comments!==""&&
<div style={{display:'flex',alignItems:'center',marginBottom:'8px'}}>
            <div class="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Instructor Comments : </div>
          <h5 class=" text-lg ml-2" onClick={this.handleCardClick}>{data.comments}</h5>
          </div>}
<div>
<Button
        variant="contained"
        color="primary"
        size="small"
        style={{ width: 100,marginTop:16 }}
        onClick={this.handleViewApplicationForm}
      >
        View
      </Button>
          <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ width: 100,marginTop:16,marginLeft:16 }}
        onClick={()=>this.handleDeleteApp(data.applicationNumber)}
      >
        Delete
      </Button>
</div>
          
                
          {/* <p id='card_desc' class="flex-1 mb-3 font-normal text-gray-700 dark:text-gray-400" onClick={this.handleCardClick}>{projectData.description}</p> */}
          
          {/* <FormDialog open={openCancelDailog} handleClose={this.handleCancelClose} handleDone={this.handleCancelDone} isCancel/> */}
          </div>

    );
  }
}

export default withRouter(Card);
