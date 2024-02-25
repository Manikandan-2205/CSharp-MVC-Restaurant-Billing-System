using Restaurant.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Restaurant.Repositories
{
    public class ItemRepository
    {
        private RestaurantDBEntities objRestaurantDbEntities;

        public ItemRepository()
        {
            objRestaurantDbEntities = new RestaurantDBEntities();
        }

        public IEnumerable<SelectListItem> GetAllItems()
        {
            var objSelectListItems = new List<SelectListItem>();

            // Querying the Items entity and converting it to SelectListItem
            objSelectListItems = (from obj in objRestaurantDbEntities.Items
                                  select new SelectListItem()
                                  {
                                      Text = obj.ItemName,
                                      Value = obj.ItemId.ToString(),
                                      Selected = true
                                  }).ToList();

            return objSelectListItems;
        }
    }
}
