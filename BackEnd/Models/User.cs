using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Models
{
    public class User: IdentityUser
    {
        public string Details { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string Password { get; set; }

        public DateTime? StartStudy{ get; set; }

        public byte[] UserPhoto { get; set; }
    }
}
