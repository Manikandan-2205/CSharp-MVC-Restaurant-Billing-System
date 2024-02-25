using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Restaurant.ViewModel
{
    public class OrderViewModel
    {
        public int OrderId { get; set; }
        public int PaymentTypeId { get; set; }
        public int CustomerId { get; set; }
        public int Itemid { get; set; }
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal FindTotal { get; set; }

        public IEnumerable<OrderDetailViewModel> ListOfOrderDetailViewModel { get; set; }
        public decimal Discount { get; internal set; }
    }   
}       
        
        
        