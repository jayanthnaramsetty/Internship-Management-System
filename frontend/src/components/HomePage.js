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
    
}  