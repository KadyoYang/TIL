package com.jpabook.jpashop.security;

import org.springframework.security.authentication.AccountExpiredException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AccountAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserDetailsService accountUserDetailsServiceImpl;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if(authentication == null)
            throw new InternalAuthenticationServiceException("Authentication is null");
        String username = authentication.getName();

        if(authentication.getCredentials() == null)
            throw new AuthenticationCredentialsNotFoundException("Credentials is null");
        String password = authentication.getCredentials().toString();

        UserDetails loadedUser = accountUserDetailsServiceImpl.loadUserByUsername(username);
        if(loadedUser == null)
            throw new InternalAuthenticationServiceException("accountSecService.loadUserByUsername() returned null, which is an interface contract violation");
        
        /* checker */
        if(!loadedUser.isAccountNonLocked()){
            throw new LockedException("User account is locked");
        }
        if(!loadedUser.isEnabled()){
            throw new DisabledException("User is disabled");
        }
        if(!loadedUser.isAccountNonExpired()){
            throw new AccountExpiredException("User account has expired");
        }
        /* 실질적 인증 */
        if(!passwordEncoder.matches(password, loadedUser.getPassword())){
            throw new BadCredentialsException("Password does not match stored value");
        }
        /* checker */
        if(!loadedUser.isCredentialsNonExpired()){
            throw new CredentialsExpiredException("User credentials have expired");
        }
        /* 인증완료 */
        UsernamePasswordAuthenticationToken result = new UsernamePasswordAuthenticationToken(loadedUser, null, loadedUser.getAuthorities());
        result.setDetails(authentication.getDetails());
        return result;

    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
        // return authentication.equals(UsernamePasswordAuthenticationToekn.class);
    }



    

}
