package com.InternManagement.service;

import java.util.Map;
import java.util.concurrent.ExecutionException;

import com.InternManagement.entity.User;

public interface RegistrationService {

	public Map addNewUser(User user) throws InterruptedException, ExecutionException;

	public Map checkUser(User user) throws InterruptedException, ExecutionException;
}
