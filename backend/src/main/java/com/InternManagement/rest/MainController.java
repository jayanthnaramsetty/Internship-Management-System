package com.InternManagement.rest;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.InternManagement.entity.AdminTable;
import com.InternManagement.entity.Application;
import com.InternManagement.entity.Dashboard;
import com.InternManagement.entity.Employer;
import com.InternManagement.entity.FacultyTable;
import com.InternManagement.entity.Student;
import com.InternManagement.entity.User;
import com.InternManagement.service.ApplicationService;
import com.InternManagement.service.RegistrationService;
import com.google.gson.JsonObject;




@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequestMapping("/internManagement")
public class MainController {
	
	
	private RegistrationService registrationService;
	
	private ApplicationService applicationService;
	
	@Autowired
	public MainController(RegistrationService registrationService,ApplicationService applicationService) {
		
		this.registrationService=registrationService;
		this.applicationService=applicationService;
	}
	
	@PostMapping(value="/addNewUser")
	ResponseEntity<Map> saveUser(@RequestBody User user) throws InterruptedException, ExecutionException{
		
		Map<String,String> resultMap= registrationService.addNewUser(user);
		return  ResponseEntity.ok(resultMap);
		
	}

	@PostMapping(value = "/login")
	ResponseEntity<Map> checkUser(@RequestBody User user) throws InterruptedException, ExecutionException{
		Map<String,String> resultMap= registrationService.checkUser(user);
		return  ResponseEntity.ok(resultMap);
		
	}
	
	@PostMapping(value="/addStudentDetail")
	ResponseEntity<Map> addNewStudentDetail(@RequestBody Application application) throws InterruptedException, ExecutionException{
		Map resultMap= applicationService.addNewStudent(application);
		return ResponseEntity.ok(resultMap);
	}
	
//	@PostMapping(value="/addEmployerDetail")
//	ResponseEntity<Map> addEmployerDetail(@RequestBody Employer employer) throws InterruptedException, ExecutionException{
//		Map resultMap= applicationService.addEmployerDetail(employer);
//		return ResponseEntity.ok(resultMap);
//	}
	
	@PutMapping(value="/updateStudentDetail")
	ResponseEntity<Map> updateNewStudentDetail(@RequestBody Application appplication) throws InterruptedException, ExecutionException{
		Map resultMap= applicationService.updateStudent(appplication);
		return ResponseEntity.ok(resultMap);
	}
	
	@GetMapping(value = "/studentApplicationList/{username}")
	ResponseEntity<List<Application>> getApplicationListByStudent(@PathVariable(name="username")String username) throws InterruptedException, ExecutionException{
		List<Application> applicationList = applicationService.getApplicationListByStudent(username);
		return  ResponseEntity.ok(applicationList);
	}
	
	@GetMapping(value = "/facultyApplicationList/{instructorName}")
	ResponseEntity<List<FacultyTable>> getApplicationListByFaculty(@PathVariable(name="instructorName")String instructorName) throws InterruptedException, ExecutionException{
		List<FacultyTable> applicationList = applicationService.getApplicationListByFaculty(instructorName);
		return  ResponseEntity.ok(applicationList);
	}
	
	@GetMapping(value = "/getAllApplicationList")
	ResponseEntity<List<AdminTable>> getAllApplicationList() throws InterruptedException, ExecutionException{
		List<AdminTable> applicationList = applicationService.getAllApplicationList();
		return  ResponseEntity.ok(applicationList);
	}
	
	@GetMapping(value = "/getDataByApplication/{applicationNumber}")
	ResponseEntity<Map> getDataByApplication(@PathVariable(name="applicationNumber")int applicationNumber) throws InterruptedException, ExecutionException, FileNotFoundException, IOException{
		Map resultMap=  applicationService.getDataByApplication(applicationNumber);
		return  ResponseEntity.ok(resultMap);
	}
	
	@PostMapping("/fileUpload/{applicationNumber}")
	ResponseEntity<Map> upload(@RequestParam("file") MultipartFile multipartFile,@PathVariable(name="applicationNumber")int applicationNumber) {
        Map resultMap = applicationService.upload(multipartFile,applicationNumber);
        return  ResponseEntity.ok(resultMap);
    }
	
	 @PostMapping("/test")
	 ResponseEntity<Map> upload(@RequestParam("file") MultipartFile multipartFile) {
//	        logger.info("HIT -/upload | File Name : {}", multipartFile.getOriginalFilename());
		 Map resultMap = applicationService.upload1(multipartFile);
		 return  ResponseEntity.ok(resultMap);
	    }

	    @PostMapping("/download")
	    ResponseEntity<Map> download(@RequestBody Student student) throws IOException {
//	        logger.info("HIT -/download | File Name : {}", fileName);
	    	Map resultMap = applicationService.download1(student.getFileName());
	        return  ResponseEntity.ok(resultMap);
	    }
	@PostMapping("/updateComments/{applicationNumber}")
	ResponseEntity<Map> updateComments(@RequestBody Application app,@PathVariable(name="applicationNumber")int applicationNumber) {
        Map resultMap = applicationService.updateComments(app.getComments(),applicationNumber);
        return  ResponseEntity.ok(resultMap);
    }
	
	@PostMapping("/updateStatus/{applicationNumber}")
	ResponseEntity<Map> updateStatus(@RequestBody Application app,@PathVariable(name="applicationNumber")int applicationNumber) throws InterruptedException, ExecutionException {
        Map resultMap = applicationService.updateStatus(app.getStatus(),applicationNumber);
        return  ResponseEntity.ok(resultMap);
    }
	
	@GetMapping(value = "/getInternData")
	ResponseEntity <Dashboard> getInternData() throws InterruptedException, ExecutionException{
		Dashboard result=  applicationService.getInternData();
		return  ResponseEntity.ok(result);
	}
	
	@GetMapping(value = "/getInternDataByInstructor/{instructorName}")
	ResponseEntity <Dashboard> getInternDataByInstructor(@PathVariable(name="instructorName")String instructorName) throws InterruptedException, ExecutionException{
		Dashboard result=  applicationService.getInternDataByInstructor(instructorName);
		return  ResponseEntity.ok(result);
	}
	
	@DeleteMapping("/deleteApplication/{applicationNumber}")
	ResponseEntity<Map> deleteApplication(@PathVariable(name="applicationNumber")int applicationNumber) throws InterruptedException, ExecutionException {
        Map resultMap = applicationService.deleteApplication(applicationNumber);
        return  ResponseEntity.ok(resultMap);
    }
	

}
