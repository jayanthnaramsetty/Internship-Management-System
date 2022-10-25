package com.InternManagement.service;


import com.InternManagement.entity.AdminTable;
import com.InternManagement.entity.Application;
import com.InternManagement.entity.Dashboard;
import com.InternManagement.entity.Employer;
import com.InternManagement.entity.FacultyTable;
import com.InternManagement.entity.Student;
import com.InternManagement.entity.User;
import com.google.api.core.ApiFuture;
import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;

import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query.Direction;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.cloud.StorageClient;
import com.google.firebase.database.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Random;
import java.util.Set;
import java.util.TreeSet;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

import javax.imageio.spi.RegisterableService;


@Service
public class ApplicationServiceImpl implements ApplicationService{

    public static final String studentCollection="Student";
    
    public static final String employerCollection="Employer";
    
    public static final String applicationCollection="Application";

	private String DOWNLOAD_URL="\"https://firebasestorage.googleapis.com/v0/b/intern-management-system-2087b.appspot.com/o/%s?alt=media\"";
	
	@Autowired private JavaMailSender javaMailSender;
	
	@Value("${spring.mail.username}") private String sender;

	@Override
	public Map addNewStudent(Application application) throws InterruptedException, ExecutionException {
		Map valueMap=new HashMap<>();
		   LocalDateTime now = LocalDateTime.now();
		   application.getStudent().setAppliedDate(Timestamp.valueOf(now));
		   
		 Firestore dbFirestore = FirestoreClient.getFirestore();
		 boolean recExist= dbFirestore.collection(studentCollection).get().get().getDocuments().isEmpty();
		
	       int appNumber;
	       if(!recExist) {
	    	   List<QueryDocumentSnapshot> documents=  dbFirestore.collection(studentCollection).orderBy("applicationNumber",Direction.DESCENDING).get().get().getDocuments();
	    	   appNumber = Integer.valueOf(documents.get(0).get("applicationNumber").toString()) + 1;
	    	   valueMap.put("applicationNumber", appNumber);
	    	   application.getStudent().setApplicationNumber(appNumber);
	    	   application.getEmployer().setApplicationNumber(appNumber);
	    	   ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(studentCollection)
	                   .document(String.valueOf(application.getStudent().getApplicationNumber())).set( application.getStudent());
				
	       }else {
	    	   appNumber=00001;
	    	   application.getStudent().setApplicationNumber(appNumber);
	    	   application.getEmployer().setApplicationNumber(appNumber);
	    	   ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(studentCollection)
	                   .document(String.valueOf(application.getStudent().getApplicationNumber())).set( application.getStudent());
				valueMap.put("applicationNumber", appNumber);
				
	       }
	       
	       Application app=new Application();
	       app.setApplicationNumber( application.getStudent().getApplicationNumber());
	       app.setStatus("Pending");
	       app.setAppliedDate( application.getStudent().getAppliedDate());
	       app.setInstructorMail( application.getStudent().getInstructorEmailId());
	       app.setInstructorName( application.getStudent().getInstructorName());
	       app.setStudentId( application.getStudent().getStudentId());
	       app.setUserName( application.getStudent().getUsername());
	       
	       ApiFuture<WriteResult> appcollectionsApiFuture = dbFirestore.collection(applicationCollection)
                   .document(String.valueOf(app.getApplicationNumber())).set(app);
	       
		   ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(employerCollection)
                   .document(String.valueOf(application.getEmployer().getApplicationNumber())).set(application.getEmployer());
		   
		   sendMail(app);
	       
	       return valueMap;
	}


	private void sendMail(Application app) {
		
				try {

					// Creating a simple mail message
					SimpleMailMessage mailMessage
						= new SimpleMailMessage();
					String subject = "APPAPPNW0000"+app.getApplicationNumber() +"\t Submission Notification";
					String text =  " Application APPAPPNW0000"+app.getApplicationNumber() +"\t request has been submitted to you. Kindly take necessary action(Approve/Reject)";

					// Setting up necessary details
					mailMessage.setFrom(sender);
					mailMessage.setTo(app.getInstructorMail());
					mailMessage.setText(text);
					mailMessage.setSubject(subject);

					// Sending the mail
					javaMailSender.send(mailMessage);
					
				}

				// Catch block to handle the exceptions
				catch (Exception e) {
					System.out.println("Exceptionnn"+e);
					
				}
		
	}
	
	

	@Override
	public List<Application> getApplicationListByStudent(String username)
			throws InterruptedException, ExecutionException {
		List<Application> appList = new ArrayList<>();
		
		 Firestore dbFirestore = FirestoreClient.getFirestore();
		 List<QueryDocumentSnapshot> documents = dbFirestore.collection(applicationCollection).whereEqualTo("userName", username).get().get().getDocuments();
          if(!documents.isEmpty()) {
        	  
        	  for(QueryDocumentSnapshot doc: documents) {
        		  Application app=new Application();
        		  app.setApplicationNumber(Integer.valueOf(doc.get("applicationNumber").toString()));
        		  app.setStatus(doc.getString("status"));
        		  if(Objects.nonNull(doc.getString("comments"))) {
        			  app.setComments(doc.getString("comments"));
        		  }
        		  appList.add(app) ;
        	  }
          }      
		
			return appList;
	}

	@Override
	public Map getDataByApplication(int applicationNumber) throws InterruptedException, ExecutionException {
		
		Map result=new HashMap<>();
		 Firestore dbFirestore = FirestoreClient.getFirestore();
		 List<QueryDocumentSnapshot> studentdocuments = dbFirestore.collection(studentCollection).whereEqualTo("applicationNumber",applicationNumber).get().get().getDocuments();
         String studentId = null;
		 
		 if(!studentdocuments.isEmpty()) {
			 for(QueryDocumentSnapshot doc: studentdocuments) {
				  Student student=new Student();
				  studentId = doc.getString("studentId");
				  student.setFirstName(doc.getString("firstName"));
				  student.setLastName(doc.getString("lastName"));
				  student.setGender(doc.getString("gender"));
				  student.setEmailId(doc.getString("emailId"));
				  student.setPhoneNumber(doc.getString("phoneNumber"));
				  student.setStreetAddress(doc.getString("streetAddress"));
				  student.setCity(doc.getString("city"));
				  student.setState(doc.getString("state"));
				  student.setZipcode(doc.getString("zipcode"));
				  student.setSemester(doc.getString("semester"));
				  student.setDepartment(doc.getString("department"));
				  student.setGraduateType(doc.getString("graduateType"));
				  student.setInstructorName(doc.getString("instructorName"));
				  student.setInstructorEmailId(doc.getString("instructorEmailId"));
				  student.setStudentId(doc.getString("studentId"));
				  student.setApplicationNumber(applicationNumber);
				  student.setFileName(doc.getString("fileName"));
				  result.put("Student", student);
       	  }
		 }
		 List<QueryDocumentSnapshot> employerdocuments = dbFirestore.collection(employerCollection).whereEqualTo("studentId",studentId).get().get().getDocuments();
		 
		 if(!employerdocuments.isEmpty()) {
			 for(QueryDocumentSnapshot doc: employerdocuments) {
				  Employer employer = new Employer();
				  employer.setCompanyName(doc.getString("companyName"));
				  employer.setEmailId(doc.getString("emailId"));
				  employer.setPhoneNumber(doc.getString("phoneNumber"));
				  employer.setStreetAddress(doc.getString("streetAddress"));
				  employer.setCity(doc.getString("city"));
				  employer.setState(doc.getString("state"));
				  employer.setZipcode(doc.getString("zipcode"));
				  employer.setStartDate(doc.getString("startDate"));
				  employer.setEndDate(doc.getString("endDate"));
				  employer.setRole(doc.getString("role"));
				  employer.setStipend(doc.getString("stipend"));
				  employer.setApplicationNumber(applicationNumber);
				  result.put("Employer", employer);
       	  }
		 }
		 
		 Object status = dbFirestore.collection(applicationCollection).document(String.valueOf(applicationNumber)).get().get().get("status");
		 result.put("ApplicationStatus", status);
		 return result;
	}

	@Override
	public Map updateStudent(Application application) throws InterruptedException, ExecutionException {
		Map valueMap=new HashMap<>();
		LocalDateTime now = LocalDateTime.now();
		   application.getStudent().setAppliedDate(Timestamp.valueOf(now));
		 Firestore dbFirestore = FirestoreClient.getFirestore();
      dbFirestore.collection(studentCollection)
    		   .document(String.valueOf(application.getStudent().getApplicationNumber())).set(application.getStudent());
      dbFirestore.collection(employerCollection)
    		   .document(String.valueOf(application.getEmployer().getApplicationNumber())).set(application.getEmployer());
      
      application.setApplicationNumber( application.getStudent().getApplicationNumber());
      application.setStatus("Pending");
      application.setAppliedDate( application.getStudent().getAppliedDate());
      application.setInstructorMail( application.getStudent().getInstructorEmailId());
      application.setInstructorName( application.getStudent().getInstructorName());
      application.setStudentId( application.getStudent().getStudentId());
      application.setUserName( application.getStudent().getUsername());
        dbFirestore.collection(applicationCollection)
    		   .document(String.valueOf(application.getEmployer().getApplicationNumber())).set(application);
		 valueMap.put("isSuccess", true);
		 return valueMap;
	}

	@Override
	public Map upload(MultipartFile multipartFile,int applicationNumber) {
		Map valueMap=new HashMap<>();
		 try {
	            String fileName = multipartFile.getOriginalFilename();                        // to get original file name
//	            fileName = UUID.randomUUID().toString().concat(this.getExtension(fileName));  // to generated random string values for file name. 
	            File file = this.convertToFile(multipartFile, fileName); 
	            this.uploadFile(file, fileName,applicationNumber);  
	            valueMap.put("isSuccess", true);// to convert multipartFile to File
	            return valueMap;  
		 } catch (Exception e) {
	            e.printStackTrace();
	            valueMap.put("isSuccess", false);
	            return valueMap;
	        }
	}
	
	private String uploadFile(File file, String fileName,int applicationNumber) throws IOException {
        BlobId blobId = BlobId.of("intern-management-system-2087b.appspot.com", fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("media").build();
        Credentials credentials = GoogleCredentials.fromStream(new FileInputStream("D:\\\\Projects\\\\React Projects\\\\Intern Management\\\\backend\\\\src\\\\main\\\\resources\\\\serviceaccount.json"));
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        storage.create(blobInfo, Files.readAllBytes(file.toPath()));
        Firestore dbFirestore = FirestoreClient.getFirestore();
        dbFirestore.collection(studentCollection)
      		   .document(String.valueOf(applicationNumber)).update("fileName",fileName);
        return String.format(DOWNLOAD_URL, URLEncoder.encode(fileName, StandardCharsets.UTF_8));
    }

    private File convertToFile(MultipartFile multipartFile, String fileName) throws IOException {
        File tempFile = new File(fileName);
        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            fos.write(multipartFile.getBytes());
            fos.close();
        }
        return tempFile;
    }

    private String getExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }


	@Override
	public List<FacultyTable> getApplicationListByFaculty(String instructorName)
			throws InterruptedException, ExecutionException {
		List<FacultyTable> appList = new ArrayList<>();
		
		 Firestore dbFirestore = FirestoreClient.getFirestore();
		 List<QueryDocumentSnapshot> documents = dbFirestore.collection(applicationCollection).whereEqualTo("instructorName", instructorName).get().get().getDocuments();
         if(!documents.isEmpty()) {
       	  
       	  for(QueryDocumentSnapshot doc: documents) {
       		FacultyTable app=new FacultyTable();
       		  app.setApplicationNumber(Integer.valueOf(doc.get("applicationNumber").toString()));
       		  app.setId(doc.get("applicationNumber").toString());
       		  app.setStatus(doc.getString("status"));
       		  app.setStudentId(doc.getString("studentId"));
       		  
       		 List<QueryDocumentSnapshot> studentDocuments = dbFirestore.collection(studentCollection).whereEqualTo("applicationNumber", app.getApplicationNumber()).get().get().getDocuments();
       		 for(QueryDocumentSnapshot studentdoc: studentDocuments) {
       			 app.setFirstName(studentdoc.getString("firstName"));
       			app.setLastName(studentdoc.getString("lastName"));
       			app.setEmailId(studentdoc.getString("emailId"));
       			app.setDepartment(studentdoc.getString("department"));
       			app.setSemester(studentdoc.getString("semester"));
       			app.setState(studentdoc.getString("state"));
       		 }
       		appList.add(app) ;
       	  }
         }      
			return appList;
	}


	@Override
	public Map updateComments(String comments, int applicationNumber) {
		Map result=new HashMap();
		Firestore dbFirestore = FirestoreClient.getFirestore();
        dbFirestore.collection(applicationCollection)
      		   .document(String.valueOf(applicationNumber)).update("comments",comments);
        result.put("isSuccess", true);
        return result;
	}


	@Override
	public Map updateStatus(String status, int applicationNumber) throws InterruptedException, ExecutionException {
		Map result=new HashMap();
		Firestore dbFirestore = FirestoreClient.getFirestore();
        dbFirestore.collection(applicationCollection)
      		   .document(String.valueOf(applicationNumber)).update("status",status);
		 Object studentemailId = dbFirestore.collection(studentCollection).document(String.valueOf(applicationNumber)).get().get().get("emailId");
		 sendMailToStudent(status,applicationNumber,studentemailId);
		 result.put("isSuccess", true);
        return result;
	}
	
	private void sendMailToStudent(String status, int applicationNumber,Object studentemailId) {
		try {
			SimpleMailMessage mailMessage
				= new SimpleMailMessage();
			String subject = "APPAPPNW0000"+applicationNumber +"\t Notification";
			String text =  " Application APPAPPNW0000"+applicationNumber +"\t is "+status;
			mailMessage.setFrom(sender);
			mailMessage.setTo(String.valueOf(studentemailId));
			mailMessage.setText(text);
			mailMessage.setSubject(subject);
			javaMailSender.send(mailMessage);
			
		}
		catch (Exception e) {
			System.out.println("Exceptionnn"+e);
		}

}


	@Override
	public List<AdminTable> getAllApplicationList() throws InterruptedException, ExecutionException {
		List<AdminTable> resultList = new ArrayList();
		Firestore dbFirestore = FirestoreClient.getFirestore();
		 List<QueryDocumentSnapshot> studentDocuments = dbFirestore.collection(studentCollection).get().get().getDocuments();
   		 for(QueryDocumentSnapshot studentdoc: studentDocuments) {
   			 AdminTable adminTable=new AdminTable();
   			adminTable.setFirstName(studentdoc.getString("firstName"));
   			adminTable.setLastName(studentdoc.getString("lastName"));
   			adminTable.setEmailId(studentdoc.getString("emailId"));
   			adminTable.setDepartment(studentdoc.getString("department"));
   			adminTable.setSemester(studentdoc.getString("semester"));
   			adminTable.setState(studentdoc.getString("state"));
   			adminTable.setApplicationNumber(Integer.valueOf(studentdoc.get("applicationNumber").toString()));
   			adminTable.setId(studentdoc.get("applicationNumber").toString());
   			adminTable.setInstructorName(studentdoc.getString("instructorName"));
   			adminTable.setInstructorEmailId(studentdoc.getString("instructorEmailId"));
   			adminTable.setStudentId(studentdoc.getString("studentId"));
   			Object appStatus = dbFirestore.collection(applicationCollection).document(String.valueOf(adminTable.getApplicationNumber())).get().get().get("status");
   			adminTable.setStatus(String.valueOf(appStatus));
   			resultList.add(adminTable);
   		 }
   		 return resultList;
	}


	@Override
	public Dashboard getInternData() throws InterruptedException, ExecutionException {
		 Firestore dbFirestore = FirestoreClient.getFirestore();
		 Dashboard entity=new Dashboard();
		 List<QueryDocumentSnapshot> documents = dbFirestore.collection(applicationCollection).whereEqualTo("status", "Pending").get().get().getDocuments();
		 int pendingCount = documents.size();
		 int ApprovedCount= dbFirestore.collection(applicationCollection).whereEqualTo("status", "Approved").get().get().getDocuments().size();
		 int RejectedCount= dbFirestore.collection(applicationCollection).whereEqualTo("status", "Rejected").get().get().getDocuments().size();
         int total = pendingCount + ApprovedCount+RejectedCount;
         entity.setApproved(ApprovedCount);
         entity.setPending(pendingCount);
         entity.setRejected(RejectedCount);
         entity.setTotal(total);
         List<QueryDocumentSnapshot> appDocs = dbFirestore.collection(applicationCollection).get().get().getDocuments();
         Set<String> instructor = new TreeSet<>();
         List<Map> instructorList=new ArrayList<>();
         for(QueryDocumentSnapshot doc: appDocs) {
        	 instructor.add(doc.getString("instructorName"));
         }
         for(String ins:instructor) {
        	 Map insMap=new HashMap();
        	 int count= dbFirestore.collection(applicationCollection).whereEqualTo("instructorName", ins).get().get().getDocuments().size();
        	 insMap.put("label", ins);
        	 insMap.put("y", count);
        	 instructorList.add(insMap);
         }
         entity.setInstructorList(instructorList);
         return entity;
	}


	@Override
	public Dashboard getInternDataByInstructor(String instructorName) throws InterruptedException, ExecutionException {
		 Firestore dbFirestore = FirestoreClient.getFirestore();
		 Dashboard entity=new Dashboard();
		 List<QueryDocumentSnapshot> documents = dbFirestore.collection(applicationCollection).whereEqualTo("instructorName",instructorName).whereEqualTo("status", "Pending").get().get().getDocuments();
		 int pendingCount = documents.size();
		 int ApprovedCount= dbFirestore.collection(applicationCollection).whereEqualTo("instructorName",instructorName).whereEqualTo("status", "Approved").get().get().getDocuments().size();
		 int RejectedCount= dbFirestore.collection(applicationCollection).whereEqualTo("instructorName",instructorName).whereEqualTo("status", "Rejected").get().get().getDocuments().size();
         int total = pendingCount + ApprovedCount+RejectedCount;
         entity.setApproved(ApprovedCount);
         entity.setPending(pendingCount);
         entity.setRejected(RejectedCount);
         entity.setTotal(total);
         return entity;
	}

}