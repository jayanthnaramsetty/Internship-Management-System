import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from "react";
import Alert from "@mui/material/Alert";
import { withRouter } from "react-router";
import axios from "axios";

const eventBaseUrl = "http://localhost:8080/internManagement/addNewUser";

class FacultySignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName:"",
      lastName:"",
      username: "",
      email: "",
      phoneNumber:"",
      password: "",
      role:'Instructor',
      address:"",
      gender:"Male",
      shouldAlertDisplay: false,
      shouldErrorMessageDisplay: false,
      signupErrorMessage:"",
      isEmailError:false,
      isNumberError:false,
    };
  }

  handleFirstNameChange = (e) => {
    this.setState({ firstName: e.target.value });
  };
  handleLastNameChange = (e) => {
    this.setState({ lastName: e.target.value });
  };
  handleAddressChange = (e) => {
    this.setState({ address: e.target.value });
  };
  handleGenderChange = (e) => {
    this.setState({ gender: e.target.value });
  };
  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePhoneNumberChange = (e) => {
    this.setState({ phoneNumber: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleRoleChange = (e) => {
    this.setState({ role: e.target.value });
  };

  handleSubmit = () => {
    const { firstName,lastName,address,gender,username, email, password,role,phoneNumber } = this.state;
    const {
      history: { push },
    } = this.props;
    if (
      username === "" ||
      email === "" ||
      password === "" || role=== "" || phoneNumber==="" 
    ) {
      this.setState({ shouldAlertDisplay: true });
      return;
    }
    const isEmailError = this.checkEmailError(email);
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

    const reqJson={
     userName:username,
     password:password,
     email:email,
     phoneNumber:phoneNumber,
     userRole: role,
     firstName:firstName,
     lastName:lastName,
     address:address,
     gender:gender
    }
   
    axios.post(eventBaseUrl,reqJson).then((res) => {
      if(res.data.result==="false"){
       this.setState({
        signupErrorMessage:res.data.errorMessage,
        shouldErrorMessageDisplay:true
       }) 
      }else{
        alert("User registered successfully")
        push('/facultyLogin');
       }
    });
  };

  checkEmailError =(email) =>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  checkPhoneError =(number) =>{
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(number).toLowerCase());
  }

 


  render() {
    const { username,phoneNumber, email, password, shouldAlertDisplay,shouldErrorMessageDisplay,signupErrorMessage, 
      isEmailError,isNumberError,role,firstName,lastName,gender,address} =
      this.state;
      
    return (
      <div className="flex flex-col space-y-5 max-w-md mx-auto my-16 " style={{minWidth:'600px',backgroundColor:'white',padding:'30px',borderRadius:10}}>
        <div style={{display:'flex',justifyContent:'center'}}>
    <img style={{color:'cornflowerblue',width:'75px',height:'75px'}} src="data:image/png;base64,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"></img>

        </div>
  
        <h2 style={{color:'cornflowerblue',display:'flex',justifyContent:'center'}} className="text-4xl font-semibold uppercase">Faculty & Admin Signup</h2>
        <TextField
          required
          id="outlined-username"
          value={firstName}
          label="First Name"
          autoComplete="off"
          onChange={(e) => this.handleFirstNameChange(e)}
        />
        <TextField
          required
          id="outlined-username"
          value={lastName}
          label="Last Name"
          autoComplete="off"
          onChange={(e) => this.handleLastNameChange(e)}
        />
        <TextField
          required
          id="outlined-username"
          value={username}
          label="Username"
          autoComplete="off"
          onChange={(e) => this.handleUsernameChange(e)}
        />
        <TextField
          value={password}
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          onChange={(e) => this.handlePasswordChange(e)}
        />

<FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          label="Plan Type"
          onChange={(e) => this.handleGenderChange(e)}
        >
          <MenuItem value='Male'>Male</MenuItem>
          <MenuItem value='Female'>Female</MenuItem>
        </Select>
      </FormControl>
        <TextField
          error={isEmailError}
          required
          id="outlined-email"
          value={email}
          label="Email"
          onChange={(e) => this.handleEmailChange(e)}
          helperText={isEmailError ?"Invalid Email":''}
        />
        <TextField
          error={isNumberError}
          required
          id="outlined-phone"
          value={phoneNumber}
          label="Phone Number"
          onChange={(e) => this.handlePhoneNumberChange(e)}
          helperText={isNumberError?"Invalid Phone Number":''}
        />
         <TextField
          required
          id="outlined-username"
          value={address}
          label="Address"
          autoComplete="off"
          onChange={(e) => this.handleAddressChange(e)}
        />

  {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="Role"
          onChange={e=>this.handleRoleChange(e)}
        >
          <MenuItem value={'Student'}>Student</MenuItem>
          <MenuItem value={'Faculty'}>Faculty/Supervisor</MenuItem>
        </Select>
      </FormControl> */}
        
        <div className="flex items-center justify-between">
        <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 " onClick={this.handleSubmit}>Submit</button>
 
          <div className="flex">
            <p className="text-lg">Existing User?</p>
            <Link to="/facultyLogin" style={{color:'cornflowerblue'}} className="font-semibold text-lg px-1">
              Login
            </Link>
          </div>
        </div>
        {shouldAlertDisplay &&
          <Alert severity="error">Field cannot be empty</Alert>
        }
         {shouldErrorMessageDisplay &&
          <Alert severity="error"> {signupErrorMessage} </Alert>
        }
        
      </div>
    );
  }
}

export default withRouter(FacultySignupPage);
