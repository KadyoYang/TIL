package com.jpabook.jpashop.repository;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import com.jpabook.jpashop.domain.Account;


import org.springframework.stereotype.Repository;

@Repository
public class AccountRepository {
    //extends JpaRepository<User, Long> 기본 crud 생성할수도있음
    @PersistenceContext
    EntityManager em;

    
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
    
    public Optional<Account> findByEmail(String email){
        return Optional.of(
            em.createQuery("select u from Account u where u.email = :email", Account.class)
                .setParameter("email", email).getSingleResult()
        );
    }

    public List<Account> findAll(){
        return em.createQuery("select u from Account u", Account.class).getResultList();

    }
    
}
