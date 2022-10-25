package com.InternManagement.service;


import com.InternManagement.entity.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import javax.imageio.spi.RegisterableService;


@Service
public class RegistrationServiceImpl implements RegistrationService{

    public static final String userCollection="User";

	@Override
	public Map<String, String> addNewUser(User user) throws InterruptedException, ExecutionException {
		Map<String,String> valueMap=new HashMap<>();
		 Firestore dbFirestore = FirestoreClient.getFirestore();
		 
		 DocumentReference documentReference = dbFirestore.collection(userCollection).document(user.getUserName());
       ApiFuture<DocumentSnapshot> future = documentReference.get();

       DocumentSnapshot document = future.get();
       if(document.exists()) {
    	   valueMap.put("result", "false");
    	   valueMap.put("errorMessage","User name is already exist");
    	   return valueMap;
       }else {
    	   ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(userCollection)
                   .document(user.getUserName()).set(user);
			valueMap.put("result", "true");
			//return collectionsApiFuture.get().getUpdateTime().toString();
			return valueMap;
       }
		 
	       
	}

	@Override
	public Map checkUser(User user) throws InterruptedException, ExecutionException {
		Map valueMap=new HashMap<>();
		 Firestore dbFirestore = FirestoreClient.getFirestore();
		 
		 DocumentReference documentReference = dbFirestore.collection(userCollection).document(user.getUserName());
      ApiFuture<DocumentSnapshot> future = documentReference.get();

      Object pass = future.get().get("password");
      Object userRole = future.get().get("userRole");
      if(user.getPassword().equals(pass)) {
   	   valueMap.put("isValidUser", true);
   	   valueMap.put("userRole", userRole);
      }else {
    	  valueMap.put("isValidUser", false);
      }
      return valueMap;
	}

}