package io.temp.board.config.security;

import java.util.Collection;



import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import io.temp.board.domain.TestAccount;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Delegate;

@Getter
@Setter
public class TestAccountUserDetail implements UserDetails{
    

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public TestAccountUserDetail(TestAccount account, Collection<? extends GrantedAuthority> authorities){
        this.account = account;
        this.authorities = authorities;
    }


    // Account에서 사용하는 함수를 AccountUserDetail에 위임
    @Delegate
    private TestAccount account;

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


    // 여기는 실제 개발할때 구현하고
    // 일단 전부 true 리턴 이것땜시 테스트가 안됬다
    @Override
    public boolean isAccountNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isEnabled() {
        // TODO Auto-generated method stub
        return true;
    }

}
