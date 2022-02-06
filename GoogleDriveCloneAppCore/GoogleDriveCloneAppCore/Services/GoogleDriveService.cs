using GoogleDriveCloneAppCore.Dtos;
using GoogleDriveCloneAppCore.Helpers;
using GoogleDriveCloneAppCore.Interfaces;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleDriveCloneAppCore.Services
{
    public class GoogleDriveService : IGoogleDriveService
    {
        private readonly ILogger<GoogleDriveService> _logger;
        public GoogleDriveService(ILogger<GoogleDriveService> logger)
        {
            _logger = logger;
        }

        public Task<PagedList<FolderOrFile>> GetFileAndFolders(FileOrFolderParams fileOrFolderParams)
        {
            //IQueryable<FolderOrFile> list = new AsyncEnumerable<FolderOrFile>(new List<FolderOrFile>() { });
            IQueryable<FolderOrFile> list = new FolderOrFile[] { }.AsQueryable();
            try
            {
                var dirs = Directory.GetDirectories(fileOrFolderParams.Path, "*", SearchOption.TopDirectoryOnly);
                foreach(var dir in dirs)
                {
                    var temp = fileOrFolderParams.Path + "\\";
                    var name = dir.Substring(temp.Length);         
                    list = list.Concat(new FolderOrFile[] { new FolderOrFile(dir, fileOrFolderParams.Path, name) });
                }

                string[] filePaths = Directory.GetFiles(fileOrFolderParams.Path, "*.*",SearchOption.TopDirectoryOnly);
                foreach(var file in filePaths)
                {
                    var temp = fileOrFolderParams.Path + "\\";
                    var name = file.Substring(temp.Length);
                    list = list.Concat(new FolderOrFile[] { new FolderOrFile(file, fileOrFolderParams.Path, name, false) });
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Has error in GetFileAndFolders");
            }
            return Task.FromResult(PagedList<FolderOrFile>.Create(list, fileOrFolderParams.PageNumber, fileOrFolderParams.PageSize));
        }

        public Task<PagedList<FolderOrFile>> GetFolders(FileOrFolderParams fileOrFolderParams)
        {
            IQueryable<FolderOrFile> list = new FolderOrFile[] { }.AsQueryable();
            try
            {
                var dirs = Directory.GetDirectories(fileOrFolderParams.Path, "*", SearchOption.TopDirectoryOnly);
                foreach (var dir in dirs)
                {
                    var temp = fileOrFolderParams.Path + "\\";
                    var name = dir.Substring(temp.Length);
                    list = list.Concat(new FolderOrFile[] { new FolderOrFile(dir, fileOrFolderParams.Path, name) });
                }                
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Has error in GetFolders");
            }
            return Task.FromResult(PagedList<FolderOrFile>.Create(list, fileOrFolderParams.PageNumber, fileOrFolderParams.PageSize));
        }

        public Task<bool> MoveFolderOrFile(bool isFolder, string source, string dest)
        {
            bool isRename;
            try
            {
                if (isFolder)
                    Directory.Move(source, dest);
                else
                    File.Move(source, dest, true);
                isRename = true;
            }
            catch (Exception e)
            {
                isRename = false;
                _logger.LogError(e, "Has error in MoveFolderOrFile");
            }
            return Task.FromResult(isRename);
        }

        public Task<bool> GetFileOrFolder(bool isFolder, string path)
        {
            bool isExsit;
            try
            {
                if (isFolder)
                {
                    isExsit = Directory.Exists(path);
                }
                else
                {
                    isExsit = File.Exists(path);
                }
            }catch(Exception e)
            {
                isExsit = false;
                _logger.LogError(e, "Has error in GetFileOrFolder");
            }
            return Task.FromResult(isExsit);
        }

        public Task<bool> DeleteFile(string filePath)
        {
            var isDel = false;
            if (File.Exists(filePath))
            {
                try
                {
                    // If file found, delete it    
                    File.Delete(filePath);
                    isDel = true;
                    Console.WriteLine(filePath + " File deleted.");                    
                }
                catch(Exception e)
                {
                    isDel = false;
                    _logger.LogError(e, "Has error in DeleteFile");
                }
            }
            return Task.FromResult(isDel);
        }

        public Task<bool> DeleteFolder(string folderPath)
        {
            var isDel = false;
            try 
            {
                Directory.Delete(folderPath, true);
                isDel = true;
            }
            catch(Exception e) {
                isDel = false;
                _logger.LogError(e, "Has error in DeleteFolder");
            }
            return Task.FromResult(isDel);
        }

        public Task<bool> RenameFolder(string source, string destination)
        {
            var isRename = false;
            try
            {
                Directory.Move(source, destination);
                isRename = true;
            }
            catch(Exception e)
            {
                isRename = false;
                _logger.LogError(e, "Has error in RenameFolder");
            }
            return Task.FromResult(isRename);
        }

        public Task<bool> RenameFile(string source, string destination)
        {
            bool isRename;
            try
            {
                File.Move(source, destination);
                isRename = true;
            }
            catch (Exception e)
            {
                isRename = false;
                _logger.LogError(e, "Has error in RenameFile");
            }
            return Task.FromResult(isRename);
        }

        public Task<bool> CreateDirectory(string fullPath)
        {
            bool isSuccess;
            try
            {
                Directory.CreateDirectory(fullPath);
                isSuccess = true;
                Console.WriteLine(fullPath + " Directory created.");
            }
            catch (Exception e)
            {
                isSuccess = false;
                _logger.LogError(e, "Has error in CreateDirectory");
            }          
            return Task.FromResult(isSuccess);
        }
    }
}
