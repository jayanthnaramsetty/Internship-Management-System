import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from "@mui/material/Alert";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';


import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const studentInfoUrl = "http://localhost:8080/internManagement/addStudentDetail";
const updateStudentInfoUrl = "http://localhost:8080/internManagement/updateStudentDetail";
const current = new Date();
const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

class ApplicationMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep:  0,
      open:true,
      applicationNo:props.data&&props.data.Student!==undefined?props.data.Student.applicationNumber:"",
      applicationStatus:props.data&&props.data.ApplicationStatus!==undefined?props.data.ApplicationStatus:"",
      isEdit:props.isEdit!==undefined&& props.isEdit===true?true:false,
      isNew:props.isNew===true?true:false,
      showFacultyView:false,
      showAdminView:false,
      selectedFile:null,
      acceptTerms:false,
      fileNameDisplay:props.data&&props.data.Student!==undefined?props.data.Student.fileName:null,
      comments:'',

      firstName:props.data&&props.data.Student!==undefined?props.data.Student.firstName:"",
      lastName:props.data&&props.data.Student!==undefined?props.data.Student.lastName:"",
      gender:props.data&&props.data.Student!==undefined?props.data.Student.gender:"Male",
      studentId:props.data&&props.data.Student!==undefined?props.data.Student.studentId:"",
      emailId: props.data&&props.data.Student!==undefined?props.data.Student.emailId:"",
      phoneNumber:props.data&&props.data.Student!==undefined?props.data.Student.phoneNumber:"",
      streetAddress:props.data&&props.data.Student!==undefined?props.data.Student.streetAddress:"",
      city:props.data&&props.data.Student!==undefined?props.data.Student.city:"",
      state:props.data&&props.data.Student!==undefined?props.data.Student.state:"",
      zipcode:props.data&&props.data.Student!==undefined?props.data.Student.zipcode:"",
      semester:props.data&&props.data.Student!==undefined?props.data.Student.semester:"",
      department:props.data&&props.data.Student!==undefined?props.data.Student.department:"",
      graduateType:props.data&&props.data.Student!==undefined?props.data.Student.graduateType:"Under Graduate",
      shouldAlertDisplay: false,
      shouldErrorMessageDisplay: false,
      errorMessage:"",
      isEmailError:false,
      isNumberError:false,
      displayProgress:false,

      companyName:props.data&&props.data.Employer!==undefined?props.data.Employer.companyName:"",
      companyEmailId:props.data&&props.data.Employer!==undefined?props.data.Employer.emailId:"",
      companyPhoneNumber:props.data&&props.data.Employer!==undefined?props.data.Employer.phoneNumber:"",
      companyStreetAddress:props.data&&props.data.Employer!==undefined?props.data.Employer.streetAddress:"",
      companyCity:props.data&&props.data.Employer!==undefined?props.data.Employer.city:"",
      companyState:props.data&&props.data.Employer!==undefined?props.data.Employer.state:"",
      companyZipcode:props.data&&props.data.Employer!==undefined?props.data.Employer.zipcode:"",
      // internDuration:props.data&&props.data.Employer!==undefined?props.data.Employer.companyName:"",
      internRole:props.data&&props.data.Employer!==undefined?props.data.Employer.role:"",
      internStipend:props.data&&props.data.Employer!==undefined?props.data.Employer.stipend:"",
      companyAlertDisplay: false,
      companyErrorMessageDisplay: false,
      companyEmailError:false,
      companyNumberError:false,
      startDate:props.data&&props.data.Employer!==undefined?props.data.Employer.startDate:new Date('2022-10-05T21:11:54'),
      endDate:props.data&&props.data.Employer!==undefined?props.data.Employer.endDate:new Date('2022-10-05T21:11:54'),

      instructorName:props.data&&props.data.Student!==undefined?props.data.Student.instructorName:"",
      instructorEmailId:props.data&&props.data.Student!==undefined?props.data.Student.instructorEmailId:"",
      instructorAlertDisplay: false,
      instructorEmailError:false,
    };
  }


   getSteps() {
    return ['Student Details', 'Employer Details', 'Instructor Details'];
  }
  
   getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return this.handleStudentDetail();
      case 1:
        return this.handleEmployerDetail();
      case 2:
        return this.handleInstructorDetail();
      default:
        return 'Unknown stepIndex';
    }
  }

  handleInstructorDetail=()=>{
    const{instructorName,instructorEmailId,instructorAlertDisplay,instructorEmailError,displayProgress,isEdit}=this.state;

    return (
      <div className="flex flex-col space-y-5 max-w-md mx-auto my-16 " style={{minWidth:'600px',backgroundColor:'white',padding:'30px',borderRadius:10}}>
        <TextField
          required
          disabled= {!isEdit}
          id="outlined-username"
          value={instructorName}
          label="Instructor Name"
          autoComplete="off"
          onChange={(e) => this.handleInstructorNameChange(e)}
        />
        <TextField
        disabled= {!isEdit}
          error={instructorEmailError}
          required
          id="outlined-email"
          value={instructorEmailId}
          label="Email ID"
          onChange={(e) => this.handleInstructorEmailIdChange(e)}
          helperText={instructorEmailError ?"Invalid Email":''}
        />
        {instructorAlertDisplay &&
          <Alert severity="error">Field cannot be empty</Alert>
        }
        {displayProgress &&
         <CircularProgress style={{width:100,height:100,position:'absolute',top:330,left:830}}/>
        }
      </div>
    );
  }

  handleInstructorNameChange = (e) => {
    this.setState({ instructorName: e.target.value });
  };
  handleInstructorEmailIdChange = (e) => {
    this.setState({ instructorEmailId: e.target.value });
  };

  handleInstructorSubmit = () => {
    const { isEdit,firstName,lastName,gender,streetAddress,city,state,zipcode,semester, 
      emailId,phoneNumber,studentId,department,graduateType,instructorName,instructorEmailId,
      companyName,companyEmailId,companyPhoneNumber,companyStreetAddress,companyCity,startDate,endDate,
      companyState,companyZipcode,internDuration,internRole,internStipend,activeStep,applicationStatus,
      applicationNo,fileNameDisplay,selectedFile,isNew} = this.state;
    const {
      history: { push },
    } = this.props;
    if (
      instructorName === "" || instructorEmailId===""     
    ) {
      this.setState({ instructorAlertDisplay: true });
      return;
    }
    const isEmailError = this.checkEmailError(instructorEmailId);
    if(!isEmailError){
      this.setState({instructorEmailError: true});
    }else{
      this.setState({instructorEmailError: false});
    }
    if(!isEmailError){
      return;
    }

    const employerDetailJson={
      companyName:companyName,
      emailId:companyEmailId,
      phoneNumber:companyPhoneNumber,
      streetAddress:companyStreetAddress,
      city:companyCity,
      state:companyState,
      zipcode:companyZipcode,
      startDate:startDate,
    endDate:endDate,
      role:internRole,
      stipend:internStipend,
      studentId:studentId,
      applicationNumber:applicationNo
    }

    const studentDetailJson={
      username:localStorage.getItem("userName"),
      firstName:firstName,
      lastName:lastName,
      gender:gender,
      studentId:studentId,
      emailId:emailId,
      phoneNumber:phoneNumber,
      streetAddress: streetAddress,
      city:city,
      state:state,
      zipcode:zipcode,
      semester:semester,
      department:department,
      graduateType:graduateType,
      instructorName:instructorName,
      instructorEmailId:instructorEmailId,
      applicationNumber:applicationNo,
      fileName:fileNameDisplay
     }

     const finalJson = {
      student:studentDetailJson,
      employer:employerDetailJson
     }

     this.setState({
      displayProgress:true
     })
    if(!isNew){
      axios.put(updateStudentInfoUrl,finalJson).then((res) => {
        this.setState({
          activeStep:activeStep+1,
        })
       });
    }else{
      axios.post(studentInfoUrl,finalJson).then((res) => {
        this.setState({
          applicationNo:res.data.applicationNumber,
          activeStep:activeStep+1,
          instructorAlertDisplay:false
        })
        if(selectedFile!==null){
          const formData = new FormData();
          const applicationNumber=res.data.applicationNumber;
      formData.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      axios.post("http://localhost:8080/internManagement/fileUpload/"+applicationNumber, 
      formData,
      {
          headers: {
              "Content-type": "multipart/form-data",
          },                    
      });
        }
       });
    }
     
    
    // axios.post(employerInfoUrl,employerDetailJson).then((res) => {
      
    //    if(res.data.isSuccess){
    //     axios.post(studentInfoUrl,studentDetailJson).then((res) => {
    //       console.log(res);

    //       this.setState({
    //         applicationNo:res.data.applicationNumber,
    //         activeStep:activeStep+1,
    //         instructorAlertDisplay:false
    //       })
    //      });
    //    }
    //  });
  };


  handleEmployerDetail = () =>{
    const { companyAlertDisplay,companyErrorMessageDisplay, companyEmailError,companyNumberError,
      companyName,internDuration,internRole,companyStreetAddress,companyCity,companyState,companyZipcode, startDate,endDate,
      internStipend, companyEmailId,companyPhoneNumber,isEdit} =
      this.state;
    return (
      <div className="flex flex-col space-y-5 max-w-md mx-auto my-16 " style={{minWidth:'600px',backgroundColor:'white',padding:'30px',borderRadius:10}}>
        <TextField
          required
          disabled= {!isEdit}
          id="outlined-username"
          value={companyName}
          label="Company Name"
          autoComplete="off"
          onChange={(e) => this.handleCompanyNameChange(e)}
        />
        <TextField
        disabled= {!isEdit}
          error={companyEmailError}
          required
          id="outlined-email"
          value={companyEmailId}
          label="Email ID"
          onChange={(e) => this.handleCompanyEmailIdChange(e)}
          helperText={companyEmailError ?"Invalid Email":''}
        />
        <TextField
        disabled= {!isEdit}
          error={companyNumberError}
          required
          id="outlined-phone"
          value={companyPhoneNumber}
          label="Phone Number"
          onChange={(e) => this.handleCompanyPhoneChange(e)}
          helperText={companyNumberError?"Invalid Phone Number":''}
        />
         <TextField
          // required
          disabled= {!isEdit}
          id="outlined-username"
          value={companyStreetAddress}
          label="Street Address"
          autoComplete="off"
          onChange={(e) => this.handleCompanyStreetAddressChange(e)}
        />
        <TextField
          // required
          disabled= {!isEdit}
          id="outlined-username"
          value={companyCity}
          label="City/Town"
          autoComplete="off"
          onChange={(e) => this.handleCompanyCityChange(e)}
        />
        <TextField
          // required
          disabled= {!isEdit}
          id="outlined-username"
          value={companyState}
          label="State"
          autoComplete="off"
          onChange={(e) => this.handleCompanyStateChange(e)}
        />
        <TextField
          // required
          disabled= {!isEdit}
          id="outlined-username"
          value={companyZipcode}
          label="Zip Code"
          autoComplete="off"
          onChange={(e) => this.handleCompanyZipcodeChange(e)}
        />
        {/* <TextField
          required
          id="outlined-username"
          value={internDuration}
          label="Duration"
          autoComplete="off"
          onChange={(e) => this.handleInternDurationChange(e)}
        /> */}
        
       
        <TextField
          required
          disabled= {!isEdit}
          id="outlined-username"
          value={internRole}
          label="Role"
          autoComplete="off"
          onChange={(e) => this.handleRoleChange(e)}
        />
        <TextField
          // required
          disabled= {!isEdit}
          id="outlined-username"
          value={internStipend}
          label="Stipend Amount"
          autoComplete="off"
          onChange={(e) => this.handleInternStipendChange(e)}
        />
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
         {/* <Grid container justifyContent="space-around"> */}
         <KeyboardDatePicker
          disableToolbar
          disabled= {!isEdit}
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Start Date"
          value={startDate}
          onChange={this.handleStartDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
        disabled= {!isEdit}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="End Date"
          value={endDate}
          onChange={this.handleEndDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        {/* </Grid> */}
         </MuiPickersUtilsProvider>
        {companyAlertDisplay &&
          <Alert severity="error">Field cannot be empty</Alert>
        }
      </div>
    );
  }

  handleStartDateChange= (date) => {
    this.setState({ startDate: date });
  };
  handleEndDateChange = (date) => {
    this.setState({ endDate: date });
  };
  
  handleCompanyNameChange = (e) => {
    this.setState({ companyName: e.target.value });
  };
  handleCompanyEmailIdChange = (e) => {
    this.setState({ companyEmailId: e.target.value });
  };
  handleCompanyPhoneChange = (e) => {
    this.setState({ companyPhoneNumber: e.target.value });
  };
  handleCompanyStreetAddressChange = (e) => {
    this.setState({ companyStreetAddress: e.target.value });
  };
  handleCompanyCityChange = (e) => {
    this.setState({ companyCity: e.target.value });
  };
  handleCompanyStateChange = (e) => {
    this.setState({ companyState: e.target.value });
  };
  handleCompanyZipcodeChange = (e) => {
    this.setState({ companyZipcode: e.target.value });
  };
  handleInternDurationChange = (e) => {
    this.setState({ internDuration: e.target.value });
  };
  handleInternStipendChange = (e) => {
    this.setState({ internStipend: e.target.value });
  };
  handleRoleChange = (e) => {
    this.setState({ internRole: e.target.value });
  };
 
 

 

  handleEmployerSubmit = () => {
    const {companyName,companyEmailId,companyPhoneNumber,companyStreetAddress,companyCity,
      companyState,companyZipcode,internDuration,internRole,internStipend,activeStep,startDate,endDate,isEdit } = this.state;
    const {
      history: { push },
    } = this.props;

    if(isEdit){
      if (
        companyName === "" || companyEmailId===""||
        companyPhoneNumber === "" || 
        internRole === ""    ) {
        this.setState({ companyAlertDisplay: true });
        return;
      }
      const isEmailError = this.checkEmailError(companyEmailId);
      const isPhoneError = this.checkPhoneError(companyPhoneNumber);
      if(!isEmailError){
        this.setState({companyEmailError: true});
      }else{
        this.setState({companyEmailError: false});
      }
      if(!isPhoneError){
        this.setState({companyNumberError: true});
      }else{
        this.setState({companyNumberError: false});
      }
      if(!isEmailError){
        return;
      }
      this.setState({
        activeStep:activeStep+1,
        companyAlertDisplay:false
      })
    }else{
          const name = localStorage.getItem("userName");
           if(name==='admin'){
            this.setState({
              showAdminView:true,
              activeStep:activeStep+1,
              companyAlertDisplay:false
            })
           }else{
            this.setState({
              showFacultyView:true,
              activeStep:activeStep+1,
              companyAlertDisplay:false
            })
           }
      
    }
    
   
  };

  handleStudentDetail = () =>{
    const { shouldAlertDisplay,shouldErrorMessageDisplay,errorMessage, isEmailError,isNumberError,
      firstName,lastName,gender,streetAddress,city,state,zipcode,semester, 
      emailId,phoneNumber,studentId,department,graduateType,acceptTerms,isEdit} =
      this.state;
    return (
      <div className="flex flex-col space-y-5 max-w-md mx-auto  " style={{minWidth:'600px',padding:'30px',borderRadius:10}}>
        <TextField
          required
          id="outlined-username"
          value={firstName}
          label="First Name"
          autoComplete="off"
          disabled= {!isEdit}
          onChange={(e) => this.handleFirstNameChange(e)}
        />
        <TextField
          required
          id="outlined-username"
          value={lastName}
          label="Last Name"
          autoComplete="off"
          disabled= {!isEdit}
          onChange={(e) => this.handleLastNameChange(e)}
        />
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          label="Plan Type"
          disabled= {!isEdit}
          onChange={(e) => this.handleGenderChange(e)}
        >
          <MenuItem value='Male'>Male</MenuItem>
          <MenuItem value='Female'>Female</MenuItem>
        </Select>
      </FormControl>

        <TextField
          required
          id="outlined-username"
          value={studentId}
          label="Student ID"
          autoComplete="off"
          disabled= {!isEdit}
          onChange={(e) => this.handleStudentIdChange(e)}
        />
        <TextField
         disabled= {!isEdit}
          error={isEmailError}
          required
          id="outlined-email"
          value={emailId}
          label="Email ID"
          onChange={(e) => this.handleEmailIdChange(e)}
          helperText={isEmailError ?"Invalid Email":''}
        />
        <TextField
         disabled= {!isEdit}
          error={isNumberError}
          required
          id="outlined-phone"
          value={phoneNumber}
          label="Phone Number"
          onChange={(e) => this.handlePhoneNumberChange(e)}
          helperText={isNumberError?"Invalid Phone Number":''}
        />
         <TextField
          // required
          disabled= {!isEdit}
          id="outlined-username"
          value={streetAddress}
          label="Street Address"
          autoComplete="off"
          onChange={(e) => this.handleStreetAddressChange(e)}
        />
        <TextField
          // required
          disabled= {!isEdit}
          id="outlined-username"
          value={city}
          label="City/Town"
          autoComplete="off"
          onChange={(e) => this.handleCityChange(e)}
        />
        <TextField
           disabled= {!isEdit}
          id="outlined-username"
          value={state}
          label="State"
          autoComplete="off"
          onChange={(e) => this.handleStateChange(e)}
        />
        <TextField
          disabled= {!isEdit}
          id="outlined-username"
          value={zipcode}
          label="Zip Code"
          autoComplete="off"
          onChange={(e) => this.handleZipcodeChange(e)}
        />
        <TextField
           disabled= {!isEdit}
          id="outlined-username"
          value={semester}
          label="Semester"
          autoComplete="off"
          onChange={(e) => this.handleSemesterChange(e)}
        />
        <TextField
          required
          disabled= {!isEdit}
          id="outlined-username"
          value={department}
          label="Department"
          autoComplete="off"
          onChange={(e) => this.handleDepartmentChange(e)}
        />
         <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Graduate Type</InputLabel>
        <Select
         disabled= {!isEdit}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={graduateType}
          label="Graduate Type"
          onChange={(e) => this.handleGraduateChange(e)}
        >
          <MenuItem value='Under Graduate'>Under Graduate</MenuItem>
          <MenuItem value='Post Graduate'>Post Graduate</MenuItem>
        </Select>
      </FormControl>
       
      <div>
        {this.state.fileNameDisplay===null?<div>
          <div style={{marginBottom:8}}>Upload Offer Letter(Optional)</div>
        <div>
        <input type="file"  disabled= {!isEdit} onChange={this.onFileChange} />
        </div>
        </div>:<div>
        <div style={{marginBottom:8}}>Offer Letter:</div>
        <div>{this.state.fileNameDisplay}</div>
          </div>}
      </div>
     {isEdit && <FormControlLabel
        control={
          <Checkbox
            checked={acceptTerms}
            onChange={this.handleTerms}
            name="acceptTerms"
            color="primary"
          />
        }
        label="I accept terms and conditions"
      />}
      
        {shouldAlertDisplay &&
          <Alert severity="error">Field cannot be empty</Alert>
        }
         {shouldErrorMessageDisplay &&
          <Alert severity="error"> {errorMessage} </Alert>
        }
      </div>
    );
  }

  
  onFileChange = event => {
    
    this.setState({ selectedFile: event.target.files[0] });
  
  };

  handleTerms=()=>{
    const{acceptTerms} = this.state;
    if(acceptTerms){
      this.setState({
        acceptTerms:false
      });
    }
    else{
      this.setState({
        acceptTerms:true
      });
    }
    
  }

  handleFirstNameChange = (e) => {
    this.setState({ firstName: e.target.value });
  };
  handleLastNameChange = (e) => {
    this.setState({ lastName: e.target.value });
  };
  handleGenderChange = (e) => {
    this.setState({ gender: e.target.value });
  };
  handleStudentIdChange = (e) => {
    this.setState({ studentId: e.target.value });
  };
  handleEmailIdChange = (e) => {
    this.setState({ emailId: e.target.value });
  };
  handlePhoneNumberChange = (e) => {
    this.setState({ phoneNumber: e.target.value });
  };
  handleStreetAddressChange = (e) => {
    this.setState({ streetAddress: e.target.value });
  };
  
  handleCityChange = (e) => {
    this.setState({ city: e.target.value });
  };
  handleStateChange = (e) => {
    this.setState({ state: e.target.value });
  };

  handleZipcodeChange = (e) => {
    this.setState({ zipcode: e.target.value });
  };

  handleSemesterChange = (e) => {
    this.setState({ semester: e.target.value });
  };
  handleDepartmentChange = (e) => {
    this.setState({ department: e.target.value });
  };
  handleGraduateChange = (e) => {
    this.setState({ graduateType: e.target.value });
  };

  handleSubmit = () => {
    const { firstName,lastName,gender,streetAddress,city,state,zipcode,semester, 
      emailId,phoneNumber,studentId,department,graduateType,activeStep,acceptTerms,shouldErrorMessageDisplay,errorMessage,isEdit } = this.state;
    const {
      history: { push },
    } = this.props;

    if(isEdit){
      if (
        firstName === "" || lastName===""||
        emailId === "" || studentId===""||
        graduateType === "" || department=== "" || phoneNumber==="" 
      ) {
        this.setState({ shouldAlertDisplay: true });
        return;
      }
      const isEmailError = this.checkEmailError(emailId);
      const isPhoneError = this.checkPhoneError(phoneNumber);
      if(!isEmailError){
        this.setState({isEmailError: true});
      }else{
        this.setState({isEmailError: false});
      }
      if(!isPhoneError){
        this.setState({isNumberError: true});
      }else{
        this.setState({isNumberError: false});
      }
  
      if(!isEmailError){
        return;
      }
      if(!acceptTerms){
  this.setState({
    shouldErrorMessageDisplay:true,
    errorMessage:'Please accept terms & conditions'
  })
  return;
      }
  
      this.setState({
        activeStep:activeStep+1,
        shouldAlertDisplay:false,
        shouldErrorMessageDisplay:true
      })
    }
    else{
      this.setState({
        activeStep:activeStep+1,
        shouldAlertDisplay:false,
        shouldErrorMessageDisplay:true
      })
    }
    
   
  };

   handleNext = () => {
    const{activeStep}=this.state;
    this.setState({
      activeStep:activeStep+1
    })
  };

   handleBack = () => {
    const{activeStep}=this.state;
    this.setState({
      activeStep:activeStep-1,
      shouldErrorMessageDisplay:false,
      showFacultyView:false,
      showAdminView:false
      
    })
  };

   handleReset = () => {
    this.setState({
      activeStep:0
    })
  };

  handleComments=(e)=>{
this.setState({
  comments:e.target.value
})
  }

  updateComments=()=>{
    const{comments,applicationNo}=this.state;
    const json={
      comments:comments
    }
    axios.post("http://localhost:8080/internManagement/updateComments/"+applicationNo,json).then(res=>{
      const {
        history: { push },
      } = this.props;
      push("/staffHome");
    })
      
  }

  updateStatus=(statusMessage)=>{
    const{applicationNo}=this.state;
    const json={
      status:statusMessage
    }
    axios.post("http://localhost:8080/internManagement/updateStatus/"+applicationNo,json).then(res=>{
      const {
        history: { push },
      } = this.props;
      push("/staffHome");
    })
  }

  

  handleClose=()=>{
    this.setState({
      open:false
    })
  }
  checkEmailError =(email) =>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  checkPhoneError =(number) =>{
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(number).toLowerCase());
  }


  render() {
    const {activeStep,open,applicationNo,isEdit,isNew,showFacultyView,showAdminView,comments,applicationStatus} = this.state;
    const steps = this.getSteps();
    return (
      <div >
        <Stepper activeStep={activeStep} alternativeLabel style={{backgroundColor:'aliceblue'}}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel > {label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
  <div>
          {activeStep === steps.length ? (
             <div className='application'>
            {isNew?<Typography style={{fontSize:20}}>Your Application APPNW0000{applicationNo} is submitted successfully</Typography>:
            <Typography style={{fontSize:20}}>Your Application APPNW0000{applicationNo} is updated successfully</Typography>}
            
            </div>
          ) : (
            <div>
              <Typography>{this.getStepContent(activeStep)}</Typography>
              {showFacultyView&& applicationStatus==='Pending' &&
              <div style={{display:'flex',flexDirection:'column'}}>
                <div style={{display:'flex',justifyContent:'center'}}>
                <TextField style={{width:'30%'}}
          id="outlined-username"
          value={comments}
          label="Add Comments"
          autoComplete="off"
          onChange={(e) => this.handleComments(e)}
        /><div style={{display:'flex',alignItems:'center',marginLeft:8}}>
           <Button style={{backgroundColor:'lightsteelblue',height:30,width:80}} onClick={this.updateComments}>Update</Button>
        </div>
       
                </div>
               <div style={{display:'flex',justifyContent:'center',marginTop:24,marginBottom:24}}>
               <button type="button" class="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 " onClick={(e)=>this.updateStatus('Approved')}>Approve Application</button>
             <button type="button" class="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 " onClick={(e)=>this.updateStatus('Rejected')}>Reject Application</button>
               </div>
            
              </div>
              }
              <div style={{display:'flex',justifyContent:'center',marginBottom:50}}>
                <Button style={{marginRight:405}}
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  // className={classes.backButton}
                >
                  Back
                </Button>
                {!showFacultyView && !showAdminView?
                  <Button variant="contained" color="primary" 
                  onClick={activeStep === 0?this.handleSubmit:activeStep === 1?this.handleEmployerSubmit:this.handleInstructorSubmit}>
                  {activeStep === steps.length - 1 ?'Finish' : 'Next'}
                </Button>:
                <div>
               
                </div>
                }
              </div>
            </div>
          )}
        </div>


        

      </div>
    );
  }
}

export default withRouter(ApplicationMain);





