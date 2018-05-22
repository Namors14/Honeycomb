using BackEnd.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.App
{
    public class CustomUserValidator : IUserValidator<User>
    {
        public Task<IdentityResult> ValidateAsync(UserManager<User> manager, User user)
        {
            List<IdentityError> errors = new List<IdentityError>();

            var valid_email = manager.Users.FirstOrDefault(m => m.Email == user.Email);
            if (valid_email != null)
            {
                errors.Add(new IdentityError
                {
                    Description = $"Email {user.Email} is already taken"
                });
            }

            var valid_UserName = manager.Users.FirstOrDefault(m => m.UserName == user.UserName);
            if (valid_UserName != null)
            {
                errors.Add(new IdentityError
                {
                    Description = $"Username {user.UserName} is already taken"
                });
            }
        
            return Task.FromResult(errors.Count == 0 ?
                IdentityResult.Success : IdentityResult.Failed(errors.ToArray()));
        }
    }
}
