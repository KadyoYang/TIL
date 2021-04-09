package io.temp.board.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.temp.board.config.security.utils.TokenUtils;
import io.temp.board.controller.models.LoginUserParams;
import io.temp.board.controller.models.SignupUserParams;
import io.temp.board.domain.TestAccount;
import io.temp.board.domain.types.AccountRoleType;
import io.temp.board.repository.AccountRepository;

@Transactional
@Service
public class AccountService {
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    public boolean signup(SignupUserParams user){

        if(accountRepository.findByEmail(user.getEmail()).isEmpty()){
            TestAccount account = new TestAccount();
            account.setEmail(user.getEmail());
            account.setNickname(user.getNickname());
            account.setPassword(passwordEncoder.encode(user.getPassword()));
            account.setRoleType(AccountRoleType.ROLE_USER);
            accountRepository.save(account);
            return true;
        }else{
            return false;
        }
    }

    /** 
     * 로그인 성공 jwt string 
     * 로그인 실패 null
     */
    public String login(LoginUserParams user){
        TestAccount dbAccount = accountRepository.findOneByEmail(user.getEmail());
        if(passwordEncoder.matches(user.getPassword(), dbAccount.getPassword())){
            return TokenUtils.generateJwtToken(dbAccount);
        }else{
            return null;
        }
    }
}
