package com.InternManagement.entity;

import java.sql.Timestamp;

public class Application {
	
	 private int applicationNumber;
	 private String status;
	 private String comments;
	 private String studentId;
	 private String instructorName;
	 private String instructorMail;
	 private Timestamp appliedDate;
	 private String userName;
	 private Student student;
	 private Employer employer;
	public Student getStudent() {
		return student;
	}
	public void setStudent(Student student) {
		this.student = student;
	}
	public Employer getEmployer() {
		return employer;
	}
	public void setEmployer(Employer employer) {
		this.employer = employer;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public int getApplicationNumber() {
		return applicationNumber;
	}
	public void setApplicationNumber(int i) {
		this.applicationNumber = i;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public String getStudentId() {
		return studentId;
	}
	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}
	public String getInstructorName() {
		return instructorName;
	}
	public void setInstructorName(String instructorName) {
		this.instructorName = instructorName;
	}
	public String getInstructorMail() {
		return instructorMail;
	}
	public void setInstructorMail(String instructorMail) {
		this.instructorMail = instructorMail;
	}
	public Timestamp getAppliedDate() {
		return appliedDate;
	}
	public void setAppliedDate(Timestamp appliedDate) {
		this.appliedDate = appliedDate;
	}
	
	 
	
	
}
