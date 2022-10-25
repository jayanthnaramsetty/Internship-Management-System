import "./App.css";
import "./index.css";
import { BrowserRouter, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import SignupPage from "./components/SignupPage";
import ApplicationForm from "./components/ApplicationForm";
import ViewApplication from "./components/ViewApplication";
import StaffHomePage from "./components/StaffHomePage";
import FacultyApplicationForm from "./components/FacultyApplicationForm";
import AdminHomePage from "./components/AdminHomePage";
import AdminDashboard from "./components/AdminDashboard";
import StaffDashboard from "./components/StaffDashboard";


function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen" >
        <Route path="/" component={LoginPage} exact></Route>
        <Route path="/signup" component={SignupPage}></Route>
        <Route path="/home" component={HomePage}></Route>
        <Route path="/applicationForm" component={ApplicationForm}></Route>
        <Route path="/viewApplication" component={ViewApplication}></Route>
        <Route path="/staffHome" component={StaffHomePage}></Route>
        <Route path="/facultyViewForm" component={FacultyApplicationForm}></Route>
        <Route path="/adminHome" component={AdminHomePage}></Route>
        <Route path="/adminDashboard" component={AdminDashboard}></Route>
        <Route path="/staffDashboard" component={StaffDashboard}></Route>
        

        
      </div>
    </BrowserRouter>
  );
}

export default App;
