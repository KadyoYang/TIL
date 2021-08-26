package com.jpabook.jpashop.service;

import com.jpabook.jpashop.repository.AccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AccountService {
    @Autowired AccountRepository accountRepository;
    
}
