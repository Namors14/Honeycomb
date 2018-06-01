using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using ReflectionIT.Mvc.Paging;

namespace BackEnd.Controllers
{

    [Produces("application/json")]
    [Route("api/Admin")]
    public class AdminController : Controller
    {
        private readonly ApplicationContext _context;

        public AdminController(ApplicationContext context)
        {
            _context = context;
        }

        public class PaginModel
        {
            public int results { get; set; }

            public int page { get; set; }

            public string field { get; set; }

            public string filter { get; set; }
        }

        [Authorize(Roles = "admin")]
        [HttpPost]
        [Route("GetUsers")]
        public async Task<IActionResult> GetUsers([FromBody]PaginModel pagin)
        {
            //var usersdata = _context.Users.OrderBy(m => m.UserName).Skip(pagin.results * (pagin.page - 1))
            //    .Select(user => new
            //    {
            //        name = user.UserName,
            //        email = user.Email,
            //        details = user.Details,
            //        country = user.Country,
            //        city = user.City,
            //        address = user.Address,
            //        startstudy = (user.StartStudy == null) ? null : user.StartStudy.Value.ToShortDateString()
            //    });

            var qry  = _context.Users.OrderBy(m => m.UserName)
                 .Select(user => new
                 {
                     name = user.UserName,
                     email = user.Email,
                     details = user.Details,
                     country = user.Country,
                     city = user.City,
                     address = user.Address,
                     startstudy = (user.StartStudy == null) ? null : user.StartStudy.Value.ToShortDateString()
                 });
            

            if (!string.IsNullOrWhiteSpace(pagin.filter))
            {
                qry = qry.Where(p => p.name.Contains(pagin.filter));
            }

            int count = qry.Count();

            var model = await PagingList.CreateAsync(
                                 qry, pagin.results, pagin.page, pagin.field, "name");

        //    model.RouteValue = new RouteValueDictionary {
        //{ "filter", pagin.filter}
        //    };

            return Ok(new
            {
                all = count,
                users = model
            });
        }
    }
}