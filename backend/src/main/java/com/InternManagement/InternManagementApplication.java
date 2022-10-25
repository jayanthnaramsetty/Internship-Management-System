package com.InternManagement;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;



@SpringBootApplication
public class InternManagementApplication {

	public static void main(String[] args) {
		
		try {
			FileInputStream serviceAccount;
			serviceAccount = new FileInputStream("C:\\Users\\S545442\\Documents\\serviceaccount.json");
			FirebaseOptions options;
			try {
				options = new FirebaseOptions.Builder()
				         .setCredentials(GoogleCredentials.fromStream(serviceAccount))
				         .build();
				 FirebaseApp.initializeApp(options);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		SpringApplication.run(InternManagementApplication.class, args);
	}

}
