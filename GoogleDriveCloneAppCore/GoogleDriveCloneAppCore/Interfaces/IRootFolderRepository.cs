using GoogleDriveCloneAppCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleDriveCloneAppCore.Interfaces
{
    public interface IRootFolderRepository
    {
        void Add(RootFolder rootFolder);
        Task<RootFolder> GetRootFolder(int id);
        Task<RootFolder> GetRootFolderByUserId(int userId);
    }
}
