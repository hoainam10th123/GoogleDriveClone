using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleDriveCloneAppCore.Helpers
{
    public class FileOrFolderParams: PaginationParams
    {
        public string Path { get; set; }
        public string Url { get; set; }
    }
}
