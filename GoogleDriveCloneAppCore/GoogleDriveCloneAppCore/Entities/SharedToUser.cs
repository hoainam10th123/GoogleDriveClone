using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleDriveCloneAppCore.Entities
{
    public class SharedToUser
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string OwnerUsername { get; set; }
        public string SharedUsername { get; set; }
        public string FullPath { get; set; }
        public string Url { get; set; }
        public string ShortUrl { get; set; }
        public bool IsFolder { get; set; }
        public string Name { get; set; }
    }
}
