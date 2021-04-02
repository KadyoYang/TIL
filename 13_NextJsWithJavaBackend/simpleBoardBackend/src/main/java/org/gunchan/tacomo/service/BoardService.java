package org.gunchan.tacomo.service;

import java.util.List;

import com.querydsl.jpa.impl.JPAQueryFactory;

import org.gunchan.tacomo.model.TestPost;
import org.gunchan.tacomo.repository.TestPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BoardService {
    

    @Autowired TestPostRepository testPostRepository;

    public void addPost(String title){
        TestPost post = new TestPost();
        post.setTitle(title);

        testPostRepository.save(post);
    }

    public List<TestPost> getPostList(){
       return testPostRepository.findAll();
    }

}
