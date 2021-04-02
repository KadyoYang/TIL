package org.gunchan.tacomo.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.gunchan.tacomo.model.TestUser;
import org.springframework.stereotype.Repository;

@Repository
public class TestAccountRepository {
    @PersistenceContext EntityManager em;

    public void save(TestUser user){
        if(user.getId() == null){
            em.persist(user);
        }else{
            em.merge(user);
        }
    }

    public TestUser findOne(Long id){
        return em.find(TestUser.class, id);
    }

    public List<TestUser> findByEmail(String email){
        return em.createQuery("select a from TestUser a where a.email = :email", TestUser.class)
        .setParameter("email", email).getResultList();
    }
}
