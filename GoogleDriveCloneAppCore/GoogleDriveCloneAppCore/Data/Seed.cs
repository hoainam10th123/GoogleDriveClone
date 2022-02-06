using GoogleDriveCloneAppCore.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleDriveCloneAppCore.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var roles = new List<AppRole>
            {
                new AppRole{Name = "admin"},
                new AppRole{Name = "user"}
            };

            if (!await roleManager.Roles.AnyAsync())
            {
                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }
            }

            //var users = new List<AppUser> {
            //    new AppUser { UserName = "hoainam10th", DisplayName = "Nguyễn Hoài Nam" },
            //    new AppUser{ UserName="ubuntu", DisplayName = "Ubuntu Nguyễn" },
            //    new AppUser{UserName="lisa", DisplayName = "Lisa" }
            //};

            //foreach (var user in users)
            //{
            //    //user.UserName = user.UserName.ToLower();
            //    await userManager.CreateAsync(user, "hoainam10th");
            //    await userManager.AddToRoleAsync(user, "user");
            //}

            var admin = new AppUser { UserName = "admin", DisplayName = "Admin" };
            await userManager.CreateAsync(admin, "hoainam10th");
            await userManager.AddToRolesAsync(admin, new[] { "admin", "user" });
        }
    }
}
