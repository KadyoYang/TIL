package io.temp.board.repository;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import io.temp.board.domain.TestAccount;

@Repository
public class AccountRepository {
    @PersistenceContext EntityManager em;

    public void save(TestAccount account){
        if(account.getId() == null){
            em.persist(account);
        }else{
            em.merge(account);
        }
    }

    public TestAccount findOne(Long id){
        return em.find(TestAccount.class, id);
    }

    public List<TestAccount> findByEmail(String email){
        return em.createQuery("select a from TestAccount a where a.email = :email", TestAccount.class).setParameter("email", email).getResultList();
    }

    public TestAccount findOneByEmail(String email){
        return em.createQuery("select a from TestAccount a where a.email = :email", TestAccount.class).setParameter("email", email).getSingleResult();
    }

    public Optional<TestAccount> findOneAsOptionalByEmail(String email){
        return Optional.of(findOneByEmail(email));
    }

    public List<TestAccount> findAll(){
        return em.createQuery("select a from TestAccount a", TestAccount.class).getResultList();
    }
}
