package com.jpabook.jpashop.security;

import java.util.Arrays;
import java.util.Collection;
import java.util.Optional;

import com.jpabook.jpashop.domain.Account;
import com.jpabook.jpashop.domain.AccountStatus;
import com.jpabook.jpashop.repository.AccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AccountUserDetailServiceImpl implements UserDetailsService {
    @Autowired
    private AccountRepository accountRepository;

    // loadUserByUsername 반드시 구현
    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // TODO Auto-generated method stub
        Optional<Account> byUserEmail = accountRepository.findByEmail(username);
        Account account = byUserEmail.orElseThrow(() -> new UsernameNotFoundException(username));
        return new AccountUserDetail(account.getEmail(), account.getPassword(), authorities(account.getStatus()));
    }
    
    private Collection<? extends GrantedAuthority> authorities(AccountStatus accountStatus){
        return Arrays.asList(new SimpleGrantedAuthority(accountStatus.toString()));
    }

    


}
