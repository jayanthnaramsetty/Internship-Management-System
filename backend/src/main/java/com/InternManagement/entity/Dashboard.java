package com.InternManagement.entity;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

public class Dashboard {
	
	
	 private int pending;
	 private int approved;
	 private int rejected;
	 private int total;
	 private List<Map> instructorList;
	 
	public List<Map> getInstructorList() {
		return instructorList;
	}
	public void setInstructorList(List<Map> instructorList) {
		this.instructorList = instructorList;
	}
	public int getPending() {
		return pending;
	}
	public void setPending(int pending) {
		this.pending = pending;
	}
	public int getApproved() {
		return approved;
	}
	public void setApproved(int approved) {
		this.approved = approved;
	}
	public int getRejected() {
		return rejected;
	}
	public void setRejected(int rejected) {
		this.rejected = rejected;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	
	
	
	 
	
	
}
