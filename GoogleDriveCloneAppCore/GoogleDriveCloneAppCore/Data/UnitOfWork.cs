using GoogleDriveCloneAppCore.Interfaces;
using GoogleDriveCloneAppCore.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleDriveCloneAppCore.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        DataContext _context;
        //IMapper _mapper;

        public UnitOfWork(DataContext context)
        {
            _context = context;
        }

        public IRootFolderRepository RootFolderRepository => new RootFolderRepository(_context);
        public ISharedToUserRepository SharedToUserRepository => new SharedToUserRepository(_context);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}
