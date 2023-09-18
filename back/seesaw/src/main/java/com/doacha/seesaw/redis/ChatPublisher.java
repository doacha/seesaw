package com.doacha.seesaw.redis;

import com.doacha.seesaw.model.dto.ChatMessage;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ChatPublisher {
	
    private final RedisTemplate<String, Object> redisTemplate;
    
    public void publish(ChannelTopic topic, ChatMessage message) {
    	redisTemplate.convertAndSend(topic.getTopic(), message);
    }

}
