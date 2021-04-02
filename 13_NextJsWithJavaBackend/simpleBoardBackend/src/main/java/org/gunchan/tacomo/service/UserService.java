package org.gunchan.tacomo.service;

import org.gunchan.tacomo.model.TestUser;
import org.gunchan.tacomo.repository.TestAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {

    @Autowired TestAccountRepository testAccountRepository;


    public boolean login(String email, String password){
        TestUser dbUser = testAccountRepository.findByEmail(email).get(0);
        if(dbUser.getPassword().contentEquals(password)) return true;
        else return false;
    }

    public void signup(String email, String password){
        if(testAccountRepository.findByEmail(email).isEmpty()){
            TestUser user = new TestUser();
            user.setEmail(email);
            user.setPassword(password);

            testAccountRepository.save(user);
        }else{
            // throw Exception
        }
    }
}
