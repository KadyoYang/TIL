package io.temp.board.config.security;

import java.util.Arrays;
import java.util.Collection;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.temp.board.domain.TestAccount;
import io.temp.board.domain.types.AccountRoleType;
import io.temp.board.repository.AccountRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TestAccountUserDetailService implements UserDetailsService{
    @Autowired private AccountRepository accountRepository;

        // loadUserByUsername 반드시 구현
        @Transactional
        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            // TODO Auto-generated method stub
            Optional<TestAccount> byUserEmail = accountRepository.findOneAsOptionalByEmail(username);
            TestAccount account = byUserEmail.orElseThrow(() -> new UsernameNotFoundException(username));
            log.info("AccountUserDetailService");
            log.info(account.getEmail());
            log.info(account.getNickname());
            log.info(account.getRoleType().toString());
            log.info(account.getId()+"");
            account.setPassword(null);

            return new TestAccountUserDetail(account, authorities(account.getRoleType()));
        }
        
        private Collection<? extends GrantedAuthority> authorities(AccountRoleType role){
            return Arrays.asList(new SimpleGrantedAuthority(role.toString()));
        }
    
    
}
