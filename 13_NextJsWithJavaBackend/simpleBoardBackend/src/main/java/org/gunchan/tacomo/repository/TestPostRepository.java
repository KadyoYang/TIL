package org.gunchan.tacomo.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.querydsl.jpa.impl.JPAQueryFactory;

import org.gunchan.tacomo.model.TestPost;
import org.springframework.stereotype.Repository;

@Repository
public class TestPostRepository {
    @PersistenceContext EntityManager em;

    public void save(TestPost post){
        if(post.getId() == null){
            em.persist(post);
        }else{
            em.merge(post);
        }
    }

    public List<TestPost> findAll(){
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);
        
        return em.createQuery("select a from TestPost a", TestPost.class).getResultList();
    }
}
