package com.snapfifty.backend.controller;

import com.snapfifty.backend.model.BlogPost;
import com.snapfifty.backend.service.BlogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blog")
public class BlogController {

    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping
    public ResponseEntity<List<BlogPost>> getAllPosts() {
        return ResponseEntity.ok(blogService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getPost(@PathVariable String id) {
        BlogPost post = blogService.getPostById(id);
        if (post != null) {
            return ResponseEntity.ok(post);
        }
        return ResponseEntity.notFound().build();
    }
}