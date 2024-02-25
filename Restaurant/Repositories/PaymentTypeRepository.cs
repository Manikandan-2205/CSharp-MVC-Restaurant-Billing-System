using Restaurant.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Restaurant.Repositories
{
    public class PaymentTypeRepository
    {
        private RestaurantDBEntities objRestaurantDbEntities;

        public PaymentTypeRepository()
        {
            objRestaurantDbEntities = new RestaurantDBEntities();
        }

        public IEnumerable<SelectListItem> GetAllPaymentType()
        {
            var objSelectListItems = new List<SelectListItem>();
            objSelectListItems = (from obj in objRestaurantDbEntities.PaymentTypes
                                  select new SelectListItem()
                                  {
                                      Text = obj.PaymentTypeName,
                                      Value = obj.PaymentTypeId.ToString(),
                                      Selected = true
                                  }).ToList();

            return objSelectListItems;
        }      
    }
}