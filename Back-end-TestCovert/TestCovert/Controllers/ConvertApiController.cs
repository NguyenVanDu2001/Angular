using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;

namespace TestCovert.Controllers
{
  [EnableCors("*", "*", "*")]
  //[System.Web.Http.RoutePrefix("api/Convert")]
  public class ConvertApiController : ApiController
  {
    // GET: ConvertApi
    //  [EnableCors("https://localhost:4200", // Origin
    //          null,                     // Request headers
    //          "GET",                    // HTTP methods
    //          "bar",                    // Response headers
    //          SupportsCredentials = true  // Allow credentials
    //)]
    [System.Web.Http.HttpGet]
    [System.Web.Http.Route("api/ConvertApi/ConvertTypeIntoResult")]
    public HttpResponseMessage ConvertTypeIntoResult([FromUri] string input, TypeConvert ConvertTo , TypeConvert ConvertInto)
    {
      var res = new Responsive();
      try
      {
        string inpConvert = input;

        switch (ConvertTo)
        {
          case TypeConvert.Tint:
            inpConvert = (Int32.Parse(inpConvert)).ToString();
            break;
          case TypeConvert.TBase64:
            inpConvert = Base64Decode(inpConvert);
            break;
          case TypeConvert.Tfile:
            break;
          default:
            break;
        }
        res.Data = ConvertResult(inpConvert, ConvertInto);
      }
      catch (Exception)
      {
        res.Message = "Convert error";
        res.StatusCode = HttpStatusCode.OK;
        res.Data = string.Empty;
      }

      return Request.CreateResponse(HttpStatusCode.OK, res);
    }
    [System.Web.Http.HttpGet]
    [System.Web.Http.Route("api/ConvertApi/test")]
    public HttpResponseMessage test()
    {
      return Request.CreateResponse(HttpStatusCode.OK, "12");
    }

    private string ConvertResult(string inputConvert, TypeConvert convertResult)
    {
      string result = string.Empty;
      try
      {
        switch (convertResult)
        {
          case TypeConvert.Tint:
            result = (Int32.Parse(inputConvert)).ToString();
            break;
          case TypeConvert.Tstring:
            result = inputConvert;
            break;
          case TypeConvert.TBase64:
            result = Base64Encode(inputConvert);
            break;
          case TypeConvert.Tfile:
            result = string.Empty;
            break;
          default:
            break;
        }
      }
      catch (Exception)
      {
        throw;
      }
      return result;
    }
    private string Base64Encode(string plainText)
    {
      try
      {
        var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
        return System.Convert.ToBase64String(plainTextBytes);
      }
      catch (Exception)
      {
        throw;
      }
    }
    private string Base64Decode(string base64EncodedData)
    {
      try
      {
        var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
        return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
      }
      catch (Exception)
      {
        throw;
      }
    }
  }
  public class Responsive
  {
    public HttpStatusCode StatusCode { get; set; } = HttpStatusCode.OK;
    public string Data { get; set; }
    public string Message { get; set; } = "Convert success";

  }
  public class ConvertInput
  {
    public string input { get; set; }
    public TypeConvert ConvertTo { get; set; }
    public TypeConvert ConvertInto { get; set; }
  }
  public enum TypeConvert
  {
    Tint = 1,
    Tstring = 2,
    TBase64 = 3,
    Tfile = 4
  }
}
