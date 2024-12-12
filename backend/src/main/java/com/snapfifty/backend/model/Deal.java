package com.snapfifty.backend.model;

import lombok.Data;

@Data
public class Deal {
    private String id;
    private String title;
    private String description;
    private String category;
    private double originalPrice;
    private double discountedPrice;
    private String validUntil;
    private String storeUrl;
    private String imageUrl;
}