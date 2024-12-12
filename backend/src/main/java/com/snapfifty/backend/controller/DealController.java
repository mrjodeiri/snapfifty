package com.snapfifty.backend.controller;

import com.snapfifty.backend.model.Deal;
import com.snapfifty.backend.service.DealService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deals")
public class DealController {

    private final DealService dealService;

    public DealController(DealService dealService) {
        this.dealService = dealService;
    }

    @GetMapping
    public ResponseEntity<List<Deal>> getAllDeals() {
        try {
            List<Deal> deals = dealService.getAllDeals();
            return ResponseEntity.ok(deals);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}