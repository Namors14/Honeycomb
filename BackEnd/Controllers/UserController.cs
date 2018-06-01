using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using BackEnd.App;
using Hangfire;

namespace BackEnd.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {


        private readonly ApplicationContext _context;
        private readonly UserManager<User> _userManager;

        public UserController(ApplicationContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public class DateModel
        {
            public string date { get; set; }
        }

        [Authorize(Roles ="user")]
        [HttpPost]
        [Route("SetStudyDate")]
        public async Task<IActionResult> SetStudyDate([FromBody]DateModel data)
        {
            var userId = HttpContext.User.Claims.First().Value;

            var user = await _userManager.FindByIdAsync(userId);
            user.StartStudy = Convert.ToDateTime(data.date);
            _context.SaveChanges();

            DateTime date_1 = user.StartStudy.Value.AddMonths(-1);
            string Date1 = "0 5 " + date_1.Day.ToString() + " " + date_1.Month.ToString() + " *";

            DateTime date_2 = user.StartStudy.Value.AddDays(-7);
            string Date2 = "0 5 " + date_2.Day.ToString() + " " + date_2.Month.ToString() + " *";

            DateTime date_3 = user.StartStudy.Value.AddDays(-1);
            string Date3 = "0 5 " + date_3.Day.ToString() + " " + date_3.Month.ToString() + " *";


            if (date_1.Day >= DateTime.Now.Day && date_1.Month >= DateTime.Now.Month && date_1.Year >= DateTime.Now.Year)
            {
                SendNotification(Date1, userId + "1");
            }

            if (date_2.Day >= DateTime.Now.Day && date_2.Month >= DateTime.Now.Month && date_2.Year >= DateTime.Now.Year)
            {
                SendNotification(Date2, userId + "2");
            }

            if (date_3.Day >= DateTime.Now.Day && date_3.Month >= DateTime.Now.Month && date_3.Year >= DateTime.Now.Year)
            {
                SendNotification(Date3, userId + "3");
            }

            return Ok(new
            {
                success = "ok"
            });

        }

        private void SendNotification(string interval, string id)
        {
            var userId = HttpContext.User.Claims.First().Value;
            var user = _context.Users.FirstOrDefault(user_data => user_data.Id == userId);
            EmailService emailService = new EmailService();
            RecurringJob.AddOrUpdate(id,
                () =>
                emailService.SendEmailAsync(user.Email, "The beginning of the studies", $"Your studies start on {user.StartStudy.Value.ToShortDateString()}")
                , interval);
        }

        
    }
}