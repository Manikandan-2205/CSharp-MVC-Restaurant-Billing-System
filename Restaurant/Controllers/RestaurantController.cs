using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Restaurant.Models;
using Restaurant.Repositories;
using Restaurant.ViewModel;

namespace Restaurant.Controllers
{
    public class RestaurantController : Controller
    {
        private RestaurantDBEntities objRestaurantDbEntities;
        public RestaurantController()
        {
            objRestaurantDbEntities = new RestaurantDBEntities();
        }
        // GET: Restaurnat
        public ActionResult Index()
        {
            CustomerRepository objCustomerRepository = new CustomerRepository();
            ItemRepository objItemRepository = new ItemRepository();
            PaymentTypeRepository objPaymentTypeRepository = new PaymentTypeRepository();

            var objMultipleModels = new Tuple<IEnumerable<SelectListItem>, IEnumerable<SelectListItem>, IEnumerable<SelectListItem>>
                (objCustomerRepository.GetAllCustomers(), objItemRepository.GetAllItems(), objPaymentTypeRepository.GetAllPaymentType());
            return View(objMultipleModels);
        }

        [HttpGet]
        public JsonResult getItemUnitPrice(int itemId)
        {
            decimal? UnitPrice = objRestaurantDbEntities.Items.SingleOrDefault(model => model.ItemId == itemId)?.ItemPrice;
            return Json(UnitPrice, JsonRequestBehavior.AllowGet);
        }
        
        [HttpPost]
        public JsonResult Index(OrderViewModel objOrderViewModel)
        {
            try
            {
                OrderRepository objOrderRepository = new OrderRepository();
                bool isOrderAdded = objOrderRepository.AddOrder(objOrderViewModel);

                if (isOrderAdded)
                {
                    return Json("Your order has been successfully placed.", JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json("Failed to add the order.", JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception in Index:", ex.Message);
                return Json("An unexpected error occurred while processing the order.", JsonRequestBehavior.AllowGet);
            }
        }
        //public JsonResult Index(OrderViewModel objOrderViewModel)
        //{
        //    OrderRepository objOrderRepository = new OrderRepository();
        //    objOrderRepository.AddOrder(objOrderViewModel);
        //    return Json("Your Order had been Successfully Placed.", JsonRequestBehavior.AllowGet);
        //}
        //public JsonResult Index(OrderViewModel objOrderViewModel)
        //{
        //    try
        //    {
        //        // Process objOrderViewModel, save to the database, and return a response.
        //        // Example: SaveOrder(objOrderViewModel);
        //        return Json(new { success = true, message = "Order saved successfully" });
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the exception for debugging purposes
        //        Console.WriteLine(ex.Message);
        //        return Json(new { success = false, message = "Error processing the order" });
        //    }
        //}

    }
}