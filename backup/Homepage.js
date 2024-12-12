const fetchDeals = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/deals', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors' // Add this line
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const fiftyPercentDeals = data.filter(deal => 
      (deal.originalPrice - deal.discountedPrice) / deal.originalPrice >= 0.5
    );
    setDeals(fiftyPercentDeals);
    setFilteredDeals(fiftyPercentDeals);
  } catch (error) {
    console.error('Error fetching deals:', error);
    // Sample deals for testing
    const sampleDeals = [
      {
        id: "1",
        title: "Sample Electronics Deal",
        description: "50% off on latest gadgets",
        category: "electronics",
        originalPrice: 1000.0,
        discountedPrice: 500.0,
        storeUrl: "#"
      },
      {
        id: "2",
        title: "Fashion Sale",
        description: "Designer clothes at huge discount",
        category: "fashion",
        originalPrice: 200.0,
        discountedPrice: 80.0,
        storeUrl: "#"
      }
    ];
    setDeals(sampleDeals);
    setFilteredDeals(sampleDeals);
  }
};