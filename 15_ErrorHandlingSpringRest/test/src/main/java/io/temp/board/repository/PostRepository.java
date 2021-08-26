package io.temp.board.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import io.temp.board.domain.TestPost;

@Repository
public class PostRepository {
    @PersistenceContext EntityManager em;

    public void save(TestPost post){
        if(post.getId() == null){
            em.persist(post);
        }else{
            em.merge(post);
        }
    }

    public TestPost findOne(Long id){
        return em.find(TestPost.class, id);
    }

    public List<TestPost> findAll(){
        return em.createQuery("select p from TestPost p", TestPost.class).getResultList();
    }
}
