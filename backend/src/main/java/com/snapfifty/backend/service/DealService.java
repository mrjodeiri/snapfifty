package com.snapfifty.backend.service;

import com.snapfifty.backend.model.Deal;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;

@Service
public class DealService {
    
    public List<Deal> getAllDeals() {
        List<Deal> deals = new ArrayList<>();
        
        Deal deal1 = new Deal();
        deal1.setId("1");
        deal1.setTitle("Sample Electronics Deal");
        deal1.setDescription("50% off on latest gadgets");
        deal1.setCategory("electronics");
        deal1.setOriginalPrice(1000.0);
        deal1.setDiscountedPrice(500.0);
        deal1.setStoreUrl("#");
        deals.add(deal1);
        
        Deal deal2 = new Deal();
        deal2.setId("2");
        deal2.setTitle("Fashion Sale");
        deal2.setDescription("Designer clothes at huge discount");
        deal2.setCategory("fashion");
        deal2.setOriginalPrice(200.0);
        deal2.setDiscountedPrice(80.0);
        deal2.setStoreUrl("#");
        deals.add(deal2);
        
        return deals;
    }
}