package com.template.repository;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.template.domain.SampleAccount;

import org.springframework.stereotype.Repository;

@Repository
public class SampleAccountRepository {
    @PersistenceContext EntityManager em;

    public void save(SampleAccount account) {
        if (account.getId() == null) {
            em.persist(account);
        } else {
            em.merge(account);
        }
    }

    public SampleAccount findOne(Long id) {
        return em.find(SampleAccount.class, id);
    }

    public List<SampleAccount> findAll() {
        return em.createQuery("select a from SampleAccount a", SampleAccount.class).getResultList();
    }

    public List<SampleAccount> findByEmail(String email) {
        return em.createQuery("select a from SampleAccount a where a.email = :email", SampleAccount.class)
                .setParameter("email", email).getResultList();
    }

    public SampleAccount findOneByEmail(String email) {
        return em.createQuery("select a from SampleAccount a where a.email = :email", SampleAccount.class)
                .setParameter("email", email).getSingleResult();
    }

    public Optional<SampleAccount> findOneByEmailAsOptional(String email) {
        return Optional.of(em.createQuery("select a from SampleAccount a where a.email = :email", SampleAccount.class)
                .setParameter("email", email).getSingleResult());
    }
}
