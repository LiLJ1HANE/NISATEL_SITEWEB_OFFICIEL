package com.nisatel.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.nisatel.model.ContactMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendContactNotification(ContactMessage contact) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("contact@nisatel.ma");
        message.setFrom("contact@nisatel.ma"); // ✅ Ajout important
        message.setSubject("Nouveau message de contact depuis le site");
        message.setText(
            "Nom : " + contact.getName() + "\n" +
            "Email : " + contact.getEmail() + "\n" +
            "Téléphone : " + contact.getPhone() + "\n" +
            "Entreprise : " + contact.getCompany() + "\n" +
            "Service : " + contact.getService() + "\n\n" +
            "Message :\n" + contact.getMessage()
        );

        try {
            mailSender.send(message);
            System.out.println("✅ Email envoyé avec succès !");
        } catch (Exception e) {
            System.out.println("❌ Échec de l'envoi d'email : " + e.getMessage());
            e.printStackTrace();
        }
    }
}
