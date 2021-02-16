package com.template.service;

import java.util.List;

import com.template.domain.SampleAccount;
import com.template.domain.types.AccountRoleType;
import com.template.repository.SampleAccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional("transactionManager")
public class SampleAccountService {
    @Autowired SampleAccountRepository sampleAccountRepository;
    @Autowired PasswordEncoder passwordEncoder;

    public Long signup(String email, String password, String nickname) {
        SampleAccount account = new SampleAccount();
        account.setEmail(email);
        account.setPassword(passwordEncoder.encode(password));
        account.setNickname(nickname);
        account.setRoleType(AccountRoleType.ROLE_USER);
        
        validateDuplicateAccount(account);

        sampleAccountRepository.save(account);

        return account.getId();
    }

    public SampleAccount getAccountInfo(Long id) {
        return sampleAccountRepository.findOne(id);
    }

    public boolean changepassword(String email, String currentPassword, String newPassword){
        SampleAccount account = sampleAccountRepository.findOneByEmail(email);
        if(account==null) return false;
        if(passwordEncoder.matches(currentPassword, account.getPassword())){
            account.setPassword(passwordEncoder.encode(newPassword));
            return true;
        }
        return false;
    }


    public boolean simpleAuthentication(String email, String password){
        return passwordEncoder.matches(password, sampleAccountRepository.findOneByEmail(email).getPassword());
    }

    public void quit(String email, String password){
        SampleAccount account = sampleAccountRepository.findOneByEmail(email);
        account.setEmail("X");
        account.setPassword("X");
        account.setRoleType(AccountRoleType.ROLE_QUIT);
    }







    private void validateDuplicateAccount(SampleAccount account){
        List<SampleAccount> accounts = sampleAccountRepository.findByEmail(account.getEmail());
        if(!accounts.isEmpty()) throw new IllegalStateException("이미 존재하는 EMAIL(회원)입니다.");
    }
}
