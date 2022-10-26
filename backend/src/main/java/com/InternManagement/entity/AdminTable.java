package com.InternManagement.entity;

import java.sql.Timestamp;

public class AdminTable {
	
	private String id;
	 private int applicationNumber;
	 private String status;
	 private String instructorName;
	 private String instructorEmailId;
	 private String studentId;
	 private String department;
	 private String firstName;
	 private String lastName;
	 private String emailId;
	 private String state;
	 private String semester;
	public String getInstructorName() {
		return instructorName;
	}
	public void setInstructorName(String instructorName) {
		this.instructorName = instructorName;
	}
	public String getInstructorEmailId() {
		return instructorEmailId;
	}
	public void setInstructorEmailId(String instructorEmailId) {
		this.instructorEmailId = instructorEmailId;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getApplicationNumber() {
		return applicationNumber;
	}
	public void setApplicationNumber(int applicationNumber) {
		this.applicationNumber = applicationNumber;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getStudentId() {
		return studentId;
	}
	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getSemester() {
		return semester;
	}
	public void setSemester(String semester) {
		this.semester = semester;
	}
	
	
	 
	
	
}
