using GoogleDriveCloneAppCore.Dtos;
using GoogleDriveCloneAppCore.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleDriveCloneAppCore.Interfaces
{
    public interface IGoogleDriveService
    {
        Task<bool> DeleteFile(string filePath);
        Task<bool> DeleteFolder(string folderPath);
        Task<bool> RenameFolder(string source, string destination);
        Task<bool> RenameFile(string source, string destination);
        Task<PagedList<FolderOrFile>> GetFileAndFolders(FileOrFolderParams fileOrFolderParams);
        Task<PagedList<FolderOrFile>> GetFolders(FileOrFolderParams fileOrFolderParams);
        Task<bool> CreateDirectory(string fullPath);
        Task<bool> GetFileOrFolder(bool isFolder, string path);
        Task<bool> MoveFolderOrFile(bool isFolder, string source, string dest);
    }
}
