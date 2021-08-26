package com.jpabook.jpashop.repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.jpabook.jpashop.domain.Account;

import org.springframework.stereotype.Repository;

@Repository
public class AccountRepository{
    @PersistenceContext EntityManager em;

    public void save(Account account){
        if(account.getId() == null){
            em.persist(account);
        }else{
            em.merge(account);
        }
    }

    public Account findOne(Long id){
        return em.find(Account.class, id);
    }

    
}
