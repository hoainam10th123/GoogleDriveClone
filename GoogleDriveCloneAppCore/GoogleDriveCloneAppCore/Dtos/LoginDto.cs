using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleDriveCloneAppCore.Dtos
{
    public class LoginDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [StringLength(25, MinimumLength = 6)]
        public string Password { get; set; }
    }
}
