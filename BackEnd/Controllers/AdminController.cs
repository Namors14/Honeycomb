using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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

            public string order { get; set; }
        }

        [Authorize(Roles = "admin")]
        [HttpPost]
        [Route("GetUsers")]
        public async Task<IActionResult> GetUsers([FromBody]PaginModel pagin)
        {
            var usersdata = _context.Users.OrderBy(m=>m.UserName).Skip(pagin.results*(pagin.page-1))
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

            return Ok(new
            {
                all = _context.Users.Count(),
                users = usersdata.Take(pagin.results)
            });
        }
    }
}