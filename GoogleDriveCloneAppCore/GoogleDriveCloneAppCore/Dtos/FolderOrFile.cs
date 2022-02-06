using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleDriveCloneAppCore.Dtos
{
    public class FolderOrFile
    {
        public FolderOrFile(string fullPath, string path, string name, bool isFolder = true)
        {
            Path = path;
            FullPath = fullPath;
            Name = name;
            IsFolder = isFolder;
        }
        public string Path { get; set; }
        public string FullPath { get; set; }
        public string Name { get; set; }
        public bool IsFolder { get; set; }
    }

    public class FolderOrFileRename : FolderOrFile
    {
        public FolderOrFileRename(string fullPath, string path, string name, bool isFolder = true) :
            base(fullPath, path, name, isFolder)
        { }
        public string NewName { get; set; }
        public string OldFullPath { get; set; }
    }
}
