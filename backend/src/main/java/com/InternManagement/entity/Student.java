package com.InternManagement.entity;

import java.sql.Timestamp;

import org.springframework.web.multipart.MultipartFile;

public class Student {
	
	private String username;
	private String firstName;
	private String lastName;
	private String gender;
	private String studentId;
	private String emailId;
	private String phoneNumber;
	private String streetAddress;
	private String city;
	private String state;
	private String zipcode;
	private String semester;
	private String department;
	private String graduateType;
	private String instructorName;
	private String instructorEmailId;
	private String advisorName;
	private String advisorEmailId;
	private int applicationNumber;
	private Timestamp AppliedDate;
	private String fileName;
	
	
	public String getAdvisorName() {
		return advisorName;
	}
	public void setAdvisorName(String advisorName) {
		this.advisorName = advisorName;
	}
	public String getAdvisorEmailId() {
		return advisorEmailId;
	}
	public void setAdvisorEmailId(String advisorEmailId) {
		this.advisorEmailId = advisorEmailId;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public Timestamp getAppliedDate() {
		return AppliedDate;
	}
	public void setAppliedDate(Timestamp appliedDate) {
		AppliedDate = appliedDate;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
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
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getStudentId() {
		return studentId;
	}
	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getStreetAddress() {
		return streetAddress;
	}
	public void setStreetAddress(String streetAddress) {
		this.streetAddress = streetAddress;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getZipcode() {
		return zipcode;
	}
	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}
	public String getSemester() {
		return semester;
	}
	public void setSemester(String semester) {
		this.semester = semester;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getGraduateType() {
		return graduateType;
	}
	public void setGraduateType(String graduateType) {
		this.graduateType = graduateType;
	}
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
	public int getApplicationNumber() {
		return applicationNumber;
	}
	public void setApplicationNumber(int applicationNumber) {
		this.applicationNumber = applicationNumber;
	}
	
	
	
}
