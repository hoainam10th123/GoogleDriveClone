using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleDriveCloneAppCore.Dtos
{
    public class MovingFileOrFolder
    {
        public string source { get; set; }
        public string dest { get; set; }
        public bool IsFolder { get; set; }
    }
}
