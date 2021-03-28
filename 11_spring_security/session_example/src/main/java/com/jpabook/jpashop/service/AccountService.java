package com.jpabook.jpashop.service;

import com.jpabook.jpashop.domain.Account;
import com.jpabook.jpashop.domain.AccountStatus;
import com.jpabook.jpashop.repository.AccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class AccountService {
    
    @Autowired AccountRepository accountRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @Transactional
    public Account createAccount(String email, String password, String role) {
        log.info("멤버함수 createAccount() 시작");

        Account account = new Account();
        account.setEmail(email);
        account.setPassword(passwordEncoder.encode(password));
        account.setStatus(AccountStatus.valueOf(role));
        
        accountRepository.save(account);
        log.info("save 끝");
        return account;
    }

}
