/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dev.rashoola.backend.service.impl;

import dev.rashoola.backend.domain.Participation;
import dev.rashoola.backend.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 *
 * @author rasul
 */
@RequiredArgsConstructor
@Service
public class MailServiceImpl implements MailService{
    
    @Autowired
    private JavaMailSender sender;

    @Override
    public void notifyUser(Participation participation) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(participation.getUser().getEmail());
        message.setSubject("Обавештење о распоређивању");
        
        String text = "Поштовани/а " + participation.getUser().getName() + ", \n\n"
                + "обавештавамо Вас да сте у оквиру догађаја " + participation.getEvent().getName() + " "
                + "који ће бити одржан " + participation.getEvent().getDate() + " на локацији " + participation.getEvent().getVenue().getName() +  ", " + participation.getEvent().getVenue().getAddress() + " "
                + "распоређени на јединицу под именом " + participation.getOrganizationUnit().getName() + ".\n\n"
                + "Срдачан поздрав, ФОН Догађаји";
        message.setText(text);
        message.setFrom("petartheartist@gmail.com"); // optional

        sender.send(message);
    }
    
}
