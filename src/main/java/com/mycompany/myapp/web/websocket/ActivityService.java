package com.mycompany.myapp.web.websocket;

import static com.mycompany.myapp.config.WebsocketConfiguration.IP_ADDRESS;

import com.mycompany.myapp.web.websocket.dto.ActivityDTO;
import java.security.Principal;
import java.time.Instant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Controller
public class ActivityService implements ApplicationListener<SessionDisconnectEvent> {

    private static final Logger log = LoggerFactory.getLogger(ActivityService.class);

    private final SimpMessageSendingOperations messagingTemplate;

    public ActivityService(SimpMessageSendingOperations messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    //    @MessageMapping("/topic/activity")
    //    @SendTo("/topic/tracker")
    //    public ActivityDTO sendActivity(@Payload ActivityDTO activityDTO, StompHeaderAccessor stompHeaderAccessor, Principal principal) {
    //        activityDTO.setUserLogin(principal.getName());
    //        activityDTO.setSessionId(stompHeaderAccessor.getSessionId());
    //        activityDTO.setIpAddress(stompHeaderAccessor.getSessionAttributes().get(IP_ADDRESS).toString());
    //        activityDTO.setTime(Instant.now());
    //        log.debug("Sending user tracking data {}", activityDTO);
    //        return activityDTO;
    //    }

    @Scheduled(fixedRate = 1000)
    public void sendActivity() {
        ActivityDTO activityDTO = new ActivityDTO();

        activityDTO.setUserLogin("SomeLogin");
        activityDTO.setSessionId("Session id");
        activityDTO.setIpAddress("Вычислю тя по айпи");
        activityDTO.setTime(Instant.now());
        activityDTO.setPage("Some page");
        log.debug("Sending user tracking data {}", activityDTO);
        messagingTemplate.convertAndSend("/topic/tracker", activityDTO);
    }

    @Override
    public void onApplicationEvent(SessionDisconnectEvent event) {
        ActivityDTO activityDTO = new ActivityDTO();
        activityDTO.setSessionId(event.getSessionId());
        activityDTO.setPage("logout");
        messagingTemplate.convertAndSend("/topic/tracker", activityDTO);
    }
}
