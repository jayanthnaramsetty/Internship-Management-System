package com.InternManagement.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.web.multipart.MultipartFile;

import com.InternManagement.entity.AdminTable;
import com.InternManagement.entity.Application;
import com.InternManagement.entity.Dashboard;
import com.InternManagement.entity.Employer;
import com.InternManagement.entity.FacultyTable;
import com.InternManagement.entity.Student;
import com.InternManagement.entity.User;
import com.google.gson.JsonObject;

public interface ApplicationService {

	public Map addNewStudent(Application student) throws InterruptedException, ExecutionException;

	public List<Application> getApplicationListByStudent(String username) throws InterruptedException, ExecutionException;

	public Map getDataByApplication(int applicationNumber) throws InterruptedException, ExecutionException, FileNotFoundException, IOException;

	public Map updateStudent(Application application) throws InterruptedException, ExecutionException;

	public Map upload(MultipartFile multipartFile, int applicationNumber);

	public List<FacultyTable> getApplicationListByFaculty(String instructorName) throws InterruptedException, ExecutionException;

	public Map updateComments(String comments, int applicationNumber);

	public Map updateStatus(String status, int applicationNumber) throws InterruptedException, ExecutionException;

	public List<AdminTable> getAllApplicationList() throws InterruptedException, ExecutionException;

	public Dashboard getInternData() throws InterruptedException, ExecutionException;

	public Dashboard getInternDataByInstructor(String instructorName) throws InterruptedException, ExecutionException;
	
	 public Map upload1(MultipartFile multipartFile);
	 
	 public Map download1(String fileName) throws IOException;
	 
	 public Map deleteApplication(int applicationNumber) throws InterruptedException, ExecutionException;


	
}
