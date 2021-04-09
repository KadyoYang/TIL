package io.temp.board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.temp.board.controller.models.AddPostParams;
import io.temp.board.domain.TestPost;
import io.temp.board.repository.PostRepository;

@Transactional
@Service
public class PostService {
    @Autowired
    PostRepository postRepository;

    public List<TestPost> getPostList(){
        return postRepository.findAll();
    }

    public TestPost getOnePost(Long id){
        return postRepository.findOne(id);
    }

    public boolean addPost(AddPostParams post){
        TestPost testPost = new TestPost();
        testPost.setContent(post.getContent());
        testPost.setTitle(post.getTitle());
        postRepository.save(testPost);
        return true;
    }
}
