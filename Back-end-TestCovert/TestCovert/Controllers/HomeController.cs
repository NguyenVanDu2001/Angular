using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http.Cors;
using System.Web.Mvc;

namespace TestCovert.Controllers
{
  public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        [HttpGet]
        public JsonResult Base64Encode(string plainText)
        {
            try
            {
                var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
                return Json(System.Convert.ToBase64String(plainTextBytes), JsonRequestBehavior.AllowGet);
            }
            catch (Exception )
            {
                return Json(string.Empty, JsonRequestBehavior.AllowGet);
            }
        }

  }
 
}
