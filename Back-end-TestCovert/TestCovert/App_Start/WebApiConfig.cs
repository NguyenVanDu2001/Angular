using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;

namespace TestCovert
{
  public static class WebApiConfig
  {
    public static void Register(HttpConfiguration config)
    {
      // Web API configuration and services

      // Web API routes
      config.MapHttpAttributeRoutes();

      config.Routes.MapHttpRoute(
          name: "DefaultApi",
          routeTemplate: "api/{controller}/{id}",
          defaults: new { id = RouteParameter.Optional }
      );
      config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/octet-stream"));
      //var cors = new EnableCorsAttribute("http://localhost:4200", "*", "*");
      //config.EnableCors(cors);

      //var jsonFormatter = config.Formatters.JsonFormatter;
      //jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
      //config.Formatters.Remove(config.Formatters.XmlFormatter);
      //jsonFormatter.SerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Utc;
    }
  }
}
