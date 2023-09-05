package com.doacha.seesaw.model.service;

import com.doacha.seesaw.exception.NoContentException;
import com.doacha.seesaw.model.entity.Group;
import com.doacha.seesaw.model.entity.User;
import com.doacha.seesaw.model.entity.UserGroup;
import com.doacha.seesaw.repository.GroupRepository;
import com.doacha.seesaw.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class GroupService {

    @Autowired
    GroupRepository groupRepository;

    // 그룹 목록
    public Page<Group> getGroupList(Pageable pageable) {
        Page<Group> groupList = groupRepository.findAllOrderByGroupIdDesc(pageable);
        return groupList;
    }

    // 그룹 생성
    public Group createGroup(Group group){
        Group newGroup = groupRepository.save(group);
        return newGroup;
    }

    // 그룹 상세
    public Optional<Group> getGroupDetail(String groupId){
        Optional<Group> group = groupRepository.findById(groupId);
        if(!group.isPresent()) throw new NoContentException();

        return group;
    }



}
