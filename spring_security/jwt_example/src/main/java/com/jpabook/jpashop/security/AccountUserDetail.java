package com.jpabook.jpashop.security;

import java.util.Collection;

import com.jpabook.jpashop.domain.Account;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.experimental.Delegate;

@AllArgsConstructor
@Getter
public class AccountUserDetail implements UserDetails {

    public AccountUserDetail(String email, String password, Collection<? extends GrantedAuthority> authorities){
        Account account = new Account();
        account.setEmail(email);
        account.setPassword(password);
        this.account = account;
        this.authorities = authorities;
    }



    // Account에서 사용하는 함수를 AccountUserDetail에 위임
    @Delegate
    private Account account;
    private Collection<? extends GrantedAuthority> authorities;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getUsername() {
        // TODO Auto-generated method stub
        return account.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public boolean isEnabled() {
        // TODO Auto-generated method stub
        return false;
    }

    
}
