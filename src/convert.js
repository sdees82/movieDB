export const CalculateRevenue = (revenue) =>{
    
    const calculatedRevenue = Array.from(String(revenue));
    switch(calculatedRevenue.length){
        case 5: calculatedRevenue.splice(2, 0, ",");
                break;

        case 6: calculatedRevenue.splice(3, 0, ",");
                break;
        
        case 7: calculatedRevenue.splice(1, 0, ",");
                calculatedRevenue.splice(5, 0, ",");
                break;

        case 8: calculatedRevenue.splice(2, 0, ",");
                calculatedRevenue.splice(6, 0, ",");
                break;

        case 9: calculatedRevenue.splice(3, 0, ",");
                calculatedRevenue.splice(7, 0, ",");
                break;

        case 10: calculatedRevenue.splice(1, 0, ",");
                calculatedRevenue.splice(5, 0, ",");
                calculatedRevenue.splice(9, 0, ",");
                break;
      }
      return calculatedRevenue;
}