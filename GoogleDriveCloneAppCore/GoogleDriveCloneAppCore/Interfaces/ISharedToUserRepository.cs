using GoogleDriveCloneAppCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleDriveCloneAppCore.Interfaces
{
    public interface ISharedToUserRepository
    {
        void Add(SharedToUser entity);
        Task<SharedToUser> GetSharedToUserById(int id);
        Task<SharedToUser> GetSharedToUserByUrl(string url, string username);
    }
}
