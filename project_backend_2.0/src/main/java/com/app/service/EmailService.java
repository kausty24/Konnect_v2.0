package com.app.service;

import com.SpringBootEmail.Entity.EmailDetails;

//Interface
public interface EmailService {

 // Method
 // To send a simple email
 String sendSimpleMail(EmailDetails details);

 // Method
 // To send an email with attachment
 String sendMailWithAttachment(EmailDetails details);
 
 String sendHtmlMail(EmailDetails details);
}