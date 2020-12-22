package com.jpabook.jpashop.security;

import java.util.Arrays;
import java.util.Collection;
import java.util.Optional;

import com.jpabook.jpashop.domain.Account;
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
@Transactional
public class AccountSecService implements UserDetailsService {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Account createAccount(String email, String password) {
        Account account = new Account();
        account.setEmail(email);
        account.setPassword(passwordEncoder.encode(password));

        accountRepository.save(account);
        return account;
    }

    // loadUserByUsername 반드시 구현
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // TODO Auto-generated method stub
        Optional<Account> byUserEmail = accountRepository.findByEmail(username);
        Account account = byUserEmail.orElseThrow(() -> new UsernameNotFoundException(username));
        return new User(account.getEmail(), account.getPassword(), authorities());
    }
    
    private Collection<? extends GrantedAuthority> authorities(){
        return Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"));
    }

    


}
