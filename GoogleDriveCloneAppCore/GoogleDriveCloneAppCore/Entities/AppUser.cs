using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleDriveCloneAppCore.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string DisplayName { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
        public RootFolder RootFolder { get; set; }
    }
}
