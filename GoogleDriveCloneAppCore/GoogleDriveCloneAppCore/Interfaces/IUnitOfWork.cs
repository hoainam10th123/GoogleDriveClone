using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleDriveCloneAppCore.Interfaces
{
    public interface IUnitOfWork
    {
        IRootFolderRepository RootFolderRepository { get; }
        ISharedToUserRepository SharedToUserRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}
