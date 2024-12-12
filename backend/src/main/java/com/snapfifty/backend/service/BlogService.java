package com.snapfifty.backend.service;

import com.snapfifty.backend.model.BlogPost;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BlogService {
    
    public List<BlogPost> getAllPosts() {
        List<BlogPost> posts = new ArrayList<>();
        
        // Sample blog posts
        BlogPost post1 = new BlogPost();
        post1.setId("1");
        post1.setTitle("Best Money-Saving Tips for 2024");
        post1.setSummary("Discover the most effective strategies to save money on your daily purchases...");
        post1.setAuthor("Sarah Johnson");
        post1.setPublishDate(LocalDateTime.now());
        post1.setCategory("Finance");
        post1.setReadTime("5 min read");
        posts.add(post1);
        
        BlogPost post2 = new BlogPost();
        post2.setId("2");
        post2.setTitle("How to Spot Fake Deals During Sales");
        post2.setSummary("Learn to identify genuine discounts from marketing tricks...");
        post2.setAuthor("Mike Smith");
        post2.setPublishDate(LocalDateTime.now().minusDays(2));
        post2.setCategory("Shopping Guide");
        post2.setReadTime("7 min read");
        posts.add(post2);
        
        return posts;
    }

    public BlogPost getPostById(String id) {
        // In a real app, this would fetch from a database
        return getAllPosts().stream()
                          .filter(post -> post.getId().equals(id))
                          .findFirst()
                          .orElse(null);
    }
}