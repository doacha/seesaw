package com.doacha.seesaw.model.service;

import com.doacha.seesaw.model.entity.Group;
import com.doacha.seesaw.repository.GroupRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class GroupService {

    @Autowired
    GroupRepository groupRepository;

    public Group createGroup(Group group){
        return groupRepository.save(group);
    }

}
