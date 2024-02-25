using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Restaurant.ViewModel
{
    public class OrderDetailViewModel
    {
        public int OrderDetailId { get; set; }
        public int ItemId { get; set; }
        public decimal UnitPrice { get; set; }
        public object Quantity { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }

    }
}