package com.nisatel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nisatel.model.ContactMessage;
import com.nisatel.service.EmailService;

@RestController
public class TestController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/test-mail")
    public String testMail() {
        try {
            ContactMessage testMessage = new ContactMessage();
            testMessage.setName("Testeur");
            testMessage.setEmail("test@example.com");
            testMessage.setPhone("0000000000");
            testMessage.setCompany("TestCompany");
            testMessage.setService("TestService");
            testMessage.setMessage("Ceci est un message de test.");

            emailService.sendContactNotification(testMessage);
            return "Email de test envoyé avec succès !";
        } catch (Exception e) {
            e.printStackTrace();
            return "Erreur lors de l'envoi du mail: " + e.getMessage();
        }
    }
}
