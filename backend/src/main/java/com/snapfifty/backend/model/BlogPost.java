package com.snapfifty.backend.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BlogPost {
    private String id;
    private String title;
    private String summary;
    private String content;
    private String imageUrl;
    private String author;
    private LocalDateTime publishDate;
    private String category;
    private String readTime;  // e.g., "5 min read"
}